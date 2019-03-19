function initBranchATM () {
	
	$("#locate_branch_city").val('-1');
	$("#locate_branch_name").val('-1');
	$("#locate_atm_city").val('-1');
	$("#locate_atm_location").val('-1');
	
	$(".select_btn").click(function(){

		var anroidVersion = getAndroidVersion();
		if(anroidVersion <= 2.4 )
		{
			$( "button.jqmobiSelectRowButtonFound" ).parent().css( "margin-top", "7px" );
			$( "button.jqmobiSelectRowButton" ).parent().css( "margin-top", "7px" );
			$(".jqmobiSelectRowText").css({
										"white-space": "nowrap", 
										width: '70%', 
										"display": "block",
										"overflow": "hidden",
										"float": "left",
										"position": "absolute",
										"text-overflow": "ellipsis"
									});
		}
	});
	
	/*For Locate Branch		*/
	$("#locate_branch_state").change(function(){
		
        $("#locate_branch_city").html("<option value='-1'> Select City </option>");
        $("#locate_branch_name").html("<option value='-1'> Select Branch </option>");
        
		if ($(this).val() == "-1")
	    {
			$("#locate_branch_city").val("-1");
			$("#locate_branch_name").val("-1");
			$("#locate_branch_city").attr("disabled","disabled");
			$("#locate_branch_name").attr("disabled","disabled");
	    }
	    else
	    {
	    	$("#locate_branch_city").removeAttr('disabled');
	    	showMask();
			var stateId = $(this).val();
	    	
			var _url = "";
			_url = _serverBaseUrl+"BoiMobileBanking/locator/state-wise-city-list.htm?callback=?&state_id=" + stateId;
			console.log("_url : " + _url);
			var errLog = "Locate Branch: Unable to fetch City Name";
			setUpOpts(_url, viewCityListCallBack, errLog);
			
	    }
	    	
	});
	
	$("#locate_branch_city").change(function(){

		$("#locate_branch_name").html("<option value='-1'> Select Branch </option>");
		
		if ($(this).val() == "-1")
	    {
			$("#locate_branch_name").val("-1");
			$("#locate_branch_name").attr("disabled","disabled");
	    }
	    else
	    { 
	    	showMask();
	    	$("#locate_branch_name").removeAttr('disabled');
	    	
	    	var cityId = $(this).val();
	    	
			var _url = "";
			_url = _serverBaseUrl+"BoiMobileBanking/locator/city-wise-branch-list.htm?callback=?&city_id=" + cityId;
			console.log("_url : " + _url);
			var errLog = "Locate Branch: Unable to fetch Branch Name";
			setUpOpts(_url, viewBranchListCallBack, errLog);
	    	
	    }
	});
	
	$("#locate_branch_submit_btn").unbind('click').click(function(){	
    	
    	showMask();
    	var cityId = $("#locate_branch_city").val().trim();
    	var branchName = $("#locate_branch_name").val();
    	var stateId = $("#locate_branch_state").val().trim();

    	if( stateId == "-1" ){
    		hideMask();
    		alert("Please Select State");
    	
    	} else if(cityId == "-1"){
    		hideMask();
    		alert("Please Select City");
    		
    	} else if(branchName == "-1"){
    		hideMask();
    		alert("Please Select Branch");
    	} else {
    	
			var _url = "";
			_url = _serverBaseUrl+"BoiMobileBanking/locator/locate-branch.htm?callback=?&state_id=" +stateId+ "&city_id=" +cityId+ "&branch_name=" +branchName;
			console.log("_url : " + _url);
			var errLog = "Locate : Unable to fetch Bank Detail";
			setUpOpts(_url, viewBranchDetailCallBack, errLog);
    	}
	    	
	});
	
	/*For Locate ATM		*/
	
	$("#locate_atm_state").change(function(){
		
		$("#locate_atm_city").html("<option value='-1'> Select City </option>");
        $("#locate_atm_location").html("<option value='-1'> Select ATM </option>");
		
		if ($(this).val() == "-1")
	    {
			$("#locate_atm_city").val("-1");
			$("#locate_atm_location").val("-1");
			$("#locate_atm_city").attr("disabled","disabled");
			$("#locate_atm_location").attr("disabled","disabled");
	    }
	    else
	    { 
	    	$("#locate_atm_city").removeAttr('disabled');
	    	
	    	showMask();
	    	var stateId = $(this).val();
	    	
			var _url = "";
			_url = _serverBaseUrl+"BoiMobileBanking/locator/state-wise-city-list.htm?callback=?&state_id=" + stateId;
			console.log("_url : " + _url);
			var errLog = "Locate ATM: Unable to fetch City Name";
			setUpOpts(_url, viewCityATMListCallBack, errLog);
	    }
	    	
	});
	
	$("#locate_atm_city").change(function(){
		
		$("#locate_atm_location").html("<option value='-1'> Select ATM </option>");
		
		if ($(this).val() == "-1")
	    {
			$("#locate_atm_location").val("-1");
			$("#locate_atm_location").attr("disabled","disabled");
	    }
	    else
	    { 
	    	showMask();
	    	$("#locate_atm_location").removeAttr('disabled');
	    	var cityId = $(this).val();
	    	
			var _url = "";
			_url = _serverBaseUrl+"BoiMobileBanking/locator/city-wise-loaction-list.htm?callback=?&city_id=" + cityId;
			console.log("_url : " + _url);
			var errLog = "Locate ATM: Unable to fetch ATM Location";
			setUpOpts(_url, viewATMLocationListCallBack, errLog);
	    	
	    }
	});
	
	$("#locate_atm_submit_btn").unbind('click').click(function(){
		
    	showMask();
    	var city_id = $("#locate_atm_city").val().trim();
    	var locationName = $("#locate_atm_location").val();
    	var stateId = $("#locate_atm_state").val().trim();
    	
    	if(stateId == "-1"){
    		hideMask();
    		alert("Please Select State");
    		
    	} else if(city_id == "-1" ){
    		hideMask();
    		alert("Please Select City");
    		
    	} else if(locationName == "-1"){
    		hideMask();
    		alert("Please Select ATM");
    	} else {
    		
			var _url = "";
			_url = _serverBaseUrl+"BoiMobileBanking/locator/locate-atm.htm?callback=?&state_id=" +stateId+ "&city_id=" +city_id + "&location_name=" +locationName;
			console.log("_url : " + _url);
			var errLog = "Locate : Unable to fetch ATM Detail";
			setUpOpts(_url, viewATMDetailCallBack, errLog);
	    	
    	}
	});
	
}

function getStateList() {
	console.log("State List for page: "+$.ui.activeDiv.attributes.id.value);
	
	if ($(this).val() == "-1")
    {
		if($.ui.activeDiv.attributes.id.value == "locate_branch_detail_page")
	    {
			$("#locate_branch_city").val("-1");
			$("#locate_branch_name").val("-1");
			$("#locate_branch_city").attr("disabled","disabled");
			$("#locate_branch_name").attr("disabled","disabled");
	    
	    } else if($.ui.activeDiv.attributes.id.value == "locate_atm_detail_page"){

	    	$("#locate_atm_city").val("-1");
			$("#locate_atm_location").val("-1");
	    	$("#locate_atm_city").attr("disabled","disabled");
			$("#locate_atm_location").attr("disabled","disabled");
	    }
    }
    else {
		showMask();
		var _url = "";
		_url = _serverBaseUrl+"BoiMobileBanking/locator/state-list.htm?callback=?";
		console.log("_url : " + _url);
		var errLog = "Unable to fetch State Name";
		setUpOpts(_url, viewStateListCallBack, errLog);
    }
}

function setUpOpts(ajaxUrl, callback, errLog) {
	
	$.ajax({
		url: ajaxUrl,
		type: "GET",
		async: true,
		cache: false,
		dataType : 'jsonp',
		success: function(data) {
			console.log("success: " + data);
			callback(data);
		},
		error: function(request, status, errorThrown) {
			showError(errLog);
		}
	});
}

function showError( errLog){
    console.log(errLog);
	alert(errLog);
	hideMask();
}

function showMask()
{
	$.ui.showMask("Your details are being fetched. Please wait...");
	$("body").append('<div class="modalWindow"/>');
}

function hideMask() {
	$(".modalWindow").remove();
    $.ui.hideMask();
}

var viewStateListCallBack = function(data) {
	
	var html = "";
    html = "<option value='-1'> Select State </option>";

    if(data.length > 0) {	
		
		for(var i=0; i<data.length; i++)
			html+="<option value='"+ data[i].stateId +"'>"+ data[i].stateName +"</option>";
	}
    
    if($.ui.activeDiv.attributes.id.value == "locate_branch_detail_page")
    {
		$("#locate_branch_state").html(html);
    
    } else if($.ui.activeDiv.attributes.id.value == "locate_atm_detail_page"){
		$("#locate_atm_state").html(html);
    }
    
    hideMask();
}

var viewCityListCallBack = function(data) {
	var html = "";
    html = "<option value='-1'> Select City </option>";

    if(data.length > 0) {
		
		for(var i=0; i<data.length; i++)
			html+="<option value='"+ data[i].cityId +"'>"+ data[i].cityName +"</option>";
	}
    
   	$("#locate_branch_city").html(html);
    
    hideMask();
}

var viewBranchDetailCallBack = function(data) {
	var html="";
	if(data.length > 0)
	{
		var bankDetail = data[0];
		
		html += "<div class= \"transfer_detail_row\"> <span class=\"row_label\"> Bank Name: </span> <span class=\"locate_branch_row_value locate_branch_width-40\">"+ bankDetail.bankName +"</span> </div>";
	    html += "<div class= \"transfer_detail_row\"> <span class=\"row_label\"> Branch Name: </span> <span class=\"locate_branch_row_value locate_branch_width-40\">"+ bankDetail.branchName +"</span> </div>";
		html += "<div id=\"mail\" class= \"transfer_detail_row\"> <span class=\"row_label\"> Email: </span> <span class=\"locate_branch_row_value locate_branch_width-40 word-wrap\">"+ bankDetail.email +"</span> </div>";
		html += "<div class= \"transfer_detail_row contact_us\"> <span class=\"row_label\"> Contact Us: </span> <span class=\"locate_branch_row_value locate_branch_width-40 word-wrap\">"+ bankDetail.contact +"</span> </div>";
		html += "<div class= \"transfer_detail_row heigth-10\"> <span class=\"row_label\"> Address: </span> <span class=\"locate_branch_row_value locate_branch_width-40 locate-Address\">"+ bankDetail.address +"</span> </div>";
								
		html += "<div class= \"btn_outer_div\"><a href=\"javascript:clearHistoryBranch();\" id=\"locate_branch_btn\" class=\"fund_transfer_right_btn\"> Ok </a></div>";
		$("#bank_detail_div").html(html);
		$.ui.loadContent("#locate_bank_detail", true, false, "slide");
	} else {
		$('#locate_branch_state').val('-1');
		$('#locate_branch_city').val('-1');
		$('#locate_branch_name').val('-1');
		$("#locate_branch_city").attr("disabled","disabled");
		$("#locate_branch_name").attr("disabled","disabled");
		alert("Unable To find data");
	}
    
    hideMask();
}

var viewBranchListCallBack = function(data) {
	var html = "";
	html = "<option value='-1'> Select Branch </option>";
	
	if(data.length > 0) {
		
		for(var i=0; i<data.length; i++)
			html+="<option value='"+data[i].branchName+"' label='"+ data[i].branchName +"'>"+ data[i].branchName +"</option>";
	}
	
	$("#locate_branch_name").html(html);
	
	hideMask();
}

var viewCityATMListCallBack = function(data) {
	var html = "";
    html = "<option value='-1'>Select City</option>";

    if(data.length > 0) {
		
		for(var i=0; i<data.length; i++)
			html+="<option value='"+ data[i].cityId+"'>"+ data[i].cityName +"</option>";
	}
    
   	$("#locate_atm_city").html(html);
    
    hideMask();
}

var viewATMDetailCallBack = function(data) {
	var html="";
	if(data.length > 0)
	{
		var atmDetail = data[0];
	
		html += "<div class= \"transfer_detail_row\"> <span class=\"row_label\"> ATM Code : </span> <span class=\"locate_branch_row_value locate_branch_width-40\">"+ atmDetail.atmLocation +"</span> </div>";
	    html += "<div class= \"transfer_detail_row heigth-10\"> <span class=\"row_label\"> Address: </span> <span class=\"locate_branch_row_value locate_branch_width-40 locate-Address\">"+ atmDetail.atmAddress +"</span> </div>";
							
		html += "<div class= \"btn_outer_div\"><a href=\"javascript:clearHistoryATM();\" id=\"locate_atm_btn\" class=\"fund_transfer_right_btn\"> Ok </a></div>";
		$("#atm_detail-div").html(html);
		$.ui.loadContent("#locate_atm_detail", true, false, "slide");
    
	}
	else{
		$('#locate_atm_state').val('-1');
		$('#locate_atm_city').val('-1');
		$('#locate_atm_location').val('-1');
		$("#locate_atm_city").attr("disabled","disabled");
		$("#locate_atm_location").attr("disabled","disabled");
		alert("Unable To find data");
	}
    hideMask();
}

var viewATMLocationListCallBack = function(data) {
	var html = "";
	html = "<option value='-1'> Select ATM </option>";
	
	if(data.length > 0) {
		
		for(var i=0; i<data.length; i++)
			html+="<option value='"+data[i].location+"'>"+data[i].location+"</option>";
	}
	
	$("#locate_atm_location").html(html);
	
	hideMask();
}

function getAndroidVersion() {
	var ua = navigator.userAgent;
	if( ua.indexOf("Android") >= 0 )
	{
	  var androidversion = parseFloat(ua.slice(ua.indexOf("Android")+8)); 
	  return androidversion;
	}
}