console.log("test success");
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
var serverPort = 8080;
var fs = require('fs');


MongoClient.connect(db_url, (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(serverPort, () => {
    console.log('listening on '+serverPort)
  })
})


app.get('/', function(req, res) {
  // res.sendFile('/Users/sudarshanjagtap/Documents/Sud/Document/BackendAndDemos/NodeWithMongo/web' + '/2.txt')
  var ip = (req.headers['x-forwarded-for'] ||
  req.connection.remoteAddress ||
  req.socket.remoteAddress ||
  req.connection.socket.remoteAddress).split(",")[0];

  scraper
  .get('https://www.nseindia.com/live_market/dynaContent/live_watch/option_chain/optionKeys.jsp?segmentLink=17&instrument=OPTIDX&symbol=BANKNIFTY&date=20MAR2019')
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
   
    var firstOBJ = {"CALL OI":first.OI,"CALL CHANGE OI":first["Chng in OI"],"CALL LTP":first.LTP,"STRIKE PRICE":first["Strike Price"],"PUT LTP":first.LTP_2,"PUT CHANGE OI":first["Chng in OI_2"],"PUT OI":first.OI_2}
    var secondOBJ = {"CALL OI":second.OI,"CALL CHANGE OI":second["Chng in OI"],"CALL LTP":second.LTP,"STRIKE PRICE":second["Strike Price"],"PUT LTP":second.LTP_2,"PUT CHANGE OI":second["Chng in OI_2"],"PUT OI":second.OI_2}
    var thirdOBJ = {"CALL OI":third.OI,"CALL CHANGE OI":third["Chng in OI"],"CALL LTP":third.LTP,"STRIKE PRICE":third["Strike Price"],"PUT LTP":third.LTP_2,"PUT CHANGE OI":third["Chng in OI_2"],"PUT OI":third.OI_2}
    var fourthOBJ = {"CALL OI":fourth.OI,"CALL CHANGE OI":fourth["Chng in OI"],"CALL LTP":fourth.LTP,"STRIKE PRICE":fourth["Strike Price"],"PUT LTP":fourth.LTP_2,"PUT CHANGE OI":fourth["Chng in OI_2"],"PUT OI":fourth.OI_2}
    var fifthOBJ = {"CALL OI":fifth.OI,"CALL CHANGE OI":fifth["Chng in OI"],"CALL LTP":fifth.LTP,"STRIKE PRICE":fifth["Strike Price"],"PUT LTP":fifth.LTP_2,"PUT CHANGE OI":fifth["Chng in OI_2"],"PUT OI":fifth.OI_2}
    
    var jsonData = [firstOBJ,secondOBJ,thirdOBJ,fourthOBJ,fifthOBJ];
    res.send(jsonData);
    
  
    // var spot = tableData[0][0][1].split(":")[1].split(" ")[2];
    // res.send({'SPOTValue': parseInt(spot),"optionchain":tableData}) 
    /*
       tableData === 
        [ 
          [ 
            { State: 'Minnesota', 'Capitol City': 'Saint Paul', 'Pop.': '3' },
            { State: 'New York', 'Capitol City': 'Albany', 'Pop.': 'Eight Million' } 
          ] 
        ]
    */
  });

 console.log(ip);
  // res.send({'response':'APPA ROCKS'}) 
})

// Allow cross origin resource sharing (CORS) within our application
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/Users/sudarshan/Documents/BackendAndDemos/NodeWithMongo/'); // Absolute path. Folder must exist, will not be created for you..
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) 
  }
})

var upload = multer({ storage: storage });

app.post('/upLoadProfileImage', upload.single('image'), function (req, res, next) {

    var imagePath = '/Users/sudarshan/Documents/BackendAndDemos/NodeWithMongo/'+req.file.filename

      db.collection("quotes").findAndModify(
        { Name: "sud" },     // query
        [],               // represents a sort order if multiple matches
        { $set: {image_url:imagePath} },   // update statement
        { new: true },    // options - new to return the modified document
        function(err,doc) {

        }
       );   
    res.send(imagePath)   
});

app.post('/addImage', (req, res) => {
    let base64String = req.body.image;
    let base64Image = base64String.split(';base64,').pop();
    let imgName = 'image_'+Date.now()+'.png';
    fs.writeFile('./public/images/'+imgName, base64Image, {encoding: 'base64'}, function(err) {
        console.log('File created');
        db.collection("quotes").findAndModify(
          { Name: "sud" },     // query
          [],               // represents a sort order if multiple matches
          { $set: {image_url:imgName} },   // update statement
          { new: true },    // options - new to return the modified document
          function(err,doc) {
            var fullImgPath = 'http://'+req.host+':'+serverPort+'/images/'+imgName;
            res.send({'imageURL':fullImgPath})  
          }
         );  
    });
});

app.post('/createProfile', (req, res) => {
  let username = req.body.name;
  let userpass = req.body.password;
  let city = req.body.city;
  let zipcode = req.body.zipcode;
  let dob = req.body.dob;
  let base64ImageString = req.body.image;
  let base64Image = base64ImageString.split(';base64,').pop();
  let imgName = 'image_'+Date.now()+'.png';
  fs.writeFile('./public/images/'+imgName, base64Image, {encoding: 'base64'}, function(err) {
      console.log('File created');

          var fullImgPath = 'http://'+req.host+':'+serverPort+'/images/'+imgName;
          // res.send({'imageURL':fullImgPath})  
          db.collection('userProfile').findOne({name:username},function(err,result){
            if (err){ 
              console.log('error')
              res.send({'status':'error'})
            }else if(!result){
              db.collection('userProfile').insert({name:username,userpass:userpass,city:city,zipcode:zipcode,dob:dob,image:fullImgPath} ,(err, result) => {
                if (err) return console.log(err)
                console.log('saved to database')
                res.send('success')
              })
            }else{
              res.send({'status':'fails'})
              console.log('fail to saved')
            }
          }) 
  });
});

app.post('/v2/getProfile', (req, res) => {
  let username = req.body.name;
  db.collection('userProfile').find({"name": req.body.name}).toArray(function(err,result){

    res.send(result)
  });
});



app.post('/addUser', (req, res) => {
  var userName = req.body.Name;
  var userPass = req.body.Password;
  db.collection('quotes').findOne({Name:userName,Password:userPass},function(err,result){
    if (err){ 
      console.log('error')
      res.send({'status':'error'})
    }else if(!result){
      db.collection('quotes').insert(req.body, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.send('success')
      })
    }else{
      res.send({'status':'fails'})
      console.log('fail to saved')
    }
  })
});

app.get('/getAllUser', (req, res) => {
  var cursor = db.collection('quotes').find()
  db.collection('quotes').find().toArray(function(err, results) {
    console.log(results)
    res.send(results)
  }) 
})

app.post('/verifyUser', (req, res) => {
  var userName = req.body.Name;
  var userPass = req.body.Password;
  db.collection('quotes').findOne({Name:userName,Password:userPass},function(err,result){
    if (err){       
      res.send({'status':'error'})
      console.log('error')
    }else if(!result){
      res.send({'status':'fails'})
      console.log('fail to verify, invalid creds')
    }else{
      res.send({'status':'success'})
      console.log('success to verify')
    }
  })
});


