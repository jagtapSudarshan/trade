console.log("Build started ");
const express = require('express')
// const bodyParser= require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
var multer = require('multer');
var split = require('split');

var path = require("path");
var uuid = require("uuid");

var scraper = require('table-scraper');

// app.use(bodyParser.urlencoded({extended: true,limit:1024*1024*20}))

app.use(express.static('public')); 
// app.use(express.static('images')); 
app.use(express.static(path.join(__dirname, 'public')));

// app.use(express.bodyParser({uploadDir:'/Users/sudarshan/Documents/BackEND/NodeWithMongo/'}));

// Allow cross origin resource sharing (CORS) within our application
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const db_url = "mongodb://root:uniken123$@ds117336.mlab.com:17336/nodetestmongodb";

var db
var serverPort = 4000;
var fs = require('fs');


MongoClient.connect(db_url, (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(serverPort, () => {
    console.log('listening on '+serverPort)
  })
})

app.get('/', function(req, res) {
  //  res.sendFile('/Users/sudarshanjagtap/Documents/Sud/Document/BackendAndDemos/NodeWithMongo/web' + '/index.html')
})

app.get('/optiondata', function(req, res) {

  var ip = (req.headers['x-forwarded-for'] ||
  req.connection.remoteAddress ||
  req.socket.remoteAddress ||
  req.connection.socket.remoteAddress).split(",")[0];

  scraper
  .get('https://www.nseindia.com/live_market/dynaContent/live_watch/option_chain/optionKeys.jsp?segmentLink=17&instrument=OPTIDX&symbol=BANKNIFTY&date=2MAY2019')
  .then(function(tableData) {
  
    var spotPrice = tableData[0][0][1].split(":")[1].split(" ")[2].split("\n")[0]
    var ATMSTRIKE = Math.round(spotPrice/100)*100;
    var spIndex;
    for(var i =0;i<tableData[2].length;i++){
      var sp = tableData[2][i]["Strike Price"];
      if(sp == ATMSTRIKE){
        spIndex = i;
      }      
    }

    var first = tableData[2][spIndex-2];
    var second = tableData[2][spIndex-1];
    var third = tableData[2][spIndex];
    var fourth = tableData[2][spIndex+1];
    var fifth = tableData[2][spIndex+2];
    var datenow = new Date();
    var time = getTime(5,30);
    var currenttime = time[0]+":"+time[1]+":"+time[2]
    var firstOBJ = {"TIME":currenttime,"CALL OI":first.OI,"CALL CHANGE OI":first["Chng in OI"],"CALL LTP":first.LTP,"STRIKE PRICE":first["Strike Price"],"PUT LTP":first.LTP_2,"PUT CHANGE OI":first["Chng in OI_2"],"PUT OI":first.OI_2}
    var secondOBJ = {"TIME":currenttime,"CALL OI":second.OI,"CALL CHANGE OI":second["Chng in OI"],"CALL LTP":second.LTP,"STRIKE PRICE":second["Strike Price"],"PUT LTP":second.LTP_2,"PUT CHANGE OI":second["Chng in OI_2"],"PUT OI":second.OI_2}
    var thirdOBJ = {"TIME":currenttime,"CALL OI":third.OI,"CALL CHANGE OI":third["Chng in OI"],"CALL LTP":third.LTP,"STRIKE PRICE":third["Strike Price"],"PUT LTP":third.LTP_2,"PUT CHANGE OI":third["Chng in OI_2"],"PUT OI":third.OI_2}
    var fourthOBJ = {"TIME":currenttime,"CALL OI":fourth.OI,"CALL CHANGE OI":fourth["Chng in OI"],"CALL LTP":fourth.LTP,"STRIKE PRICE":fourth["Strike Price"],"PUT LTP":fourth.LTP_2,"PUT CHANGE OI":fourth["Chng in OI_2"],"PUT OI":fourth.OI_2}
    var fifthOBJ = {"TIME":currenttime,"CALL OI":fifth.OI,"CALL CHANGE OI":fifth["Chng in OI"],"CALL LTP":fifth.LTP,"STRIKE PRICE":fifth["Strike Price"],"PUT LTP":fifth.LTP_2,"PUT CHANGE OI":fifth["Chng in OI_2"],"PUT OI":fifth.OI_2}
    var emptyOBJ = {"TIME":"--","CALL OI":"--","CALL CHANGE OI":"--","CALL LTP":"--","STRIKE PRICE":"--","PUT LTP":"--","PUT CHANGE OI":"--","PUT OI":"--"}
    
    var jsonData = [firstOBJ,secondOBJ,thirdOBJ,fourthOBJ,fifthOBJ,emptyOBJ];
    res.send(jsonData);
    
  });

 console.log(ip);
})

function getTime (addHour, addMin){
  addHour = (addHour?addHour:0);
  addMin = (addMin?addMin:0);
  var time = new Date(new Date().getTime());
  var AM = true;
  var ndble = 0;
  var hours, newHour, overHour, newMin, overMin;
  //change form 24 to 12 hour clock
  if(time.getHours() >= 13){
      hours = time.getHours() - 12;
      AM = (hours>=12?true:false);
  }else{
      hours = time.getHours();
      AM = (hours>=12?false:true);
  }
  //get the current minutes
  var minutes = time.getMinutes();
  // set minute
  if((minutes+addMin) >= 60 || (minutes+addMin)<0){
      overMin = (minutes+addMin)%60;
      overHour = Math.floor((minutes+addMin-Math.abs(overMin))/60);
      if(overMin<0){
          overMin = overMin+60;
          overHour = overHour-Math.floor(overMin/60);
      }
      newMin = String((overMin<10?'0':'')+overMin);
      addHour = addHour+overHour;
  }else{
      newMin = minutes+addMin;
      newMin = String((newMin<10?'0':'')+newMin);
  }
  //set hour
  if(( hours+addHour>=13 )||( hours+addHour<=0 )){
      overHour = (hours+addHour)%12;
      ndble = Math.floor(Math.abs((hours+addHour)/12));
      if(overHour<=0){
          newHour = overHour+12;
          if(overHour == 0){
              ndble++;
          }
      }else{
          if(overHour ==0 ){
              newHour = 12;
              ndble++;
          }else{
              ndble++;
              newHour = overHour;
          }
      }
      newHour = (newHour<10?'0':'')+String(newHour);
      AM = ((ndble+1)%2===0)?AM:!AM;
  }else{
      AM = (hours+addHour==12?!AM:AM);
      newHour = String((Number(hours)+addHour<10?'0':'')+(hours+addHour));
  }
  var am = (AM)?'AM':'PM';
  return new Array(newHour, newMin, am);
};


