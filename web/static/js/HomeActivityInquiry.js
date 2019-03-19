function setUpOpts(url, callback, errLog, params) {
	
	showMask();
	var opts={
		type:"GET",
		async: true,
		cache: false,
		dataType : 'jsonp',
		success: function(data) {
			hideMask();
			if(params && params != null){
				callback(data, params);
			} else {
				callback(data);
			}
		},
		error:function(data){
			hideMask();
			showError(errLog);
		},
		url: url
    };
	$.ajax(opts);
}

function showMask()
{
	$.ui.showMask("Your details are being fetched. Please wait...");
	$("body").append('<div class="modalWindow"/>');
}

function hideMask()
{
	$(".modalWindow").remove();
    $.ui.hideMask();
}

function showError( errLog){
    console.log(errLog);
}

function checkUserStatus(){
	var url = _serverBaseUrl + "BoiMobileBanking/customer/check-txn-pwd-status.htm?callback=?&user_id=" + _userId;
	var errLog = "Error occured while checking user Status";
	setUpOpts(url, checkUserStatusCallback, errLog);
}

var checkUserStatusCallback = function(data){
	if(data.responseFlag == "success"){
		renderChangeSecretsMenu(data);
		return true;
	} else if(data.responseFlag == "failure"){
		var url1 = _serverBaseUrl + "BoiMobileBanking/customer/enroll-customer.htm?callback=?&user_id=" + _userId;
		var errLog1 = "Error occured while enrolling user";
		setUpOpts(url1, enrollCustomerCallback, errLog1);
	}
};


var enrollCustomerCallback = function(data){
	if(data.responseFlag == "success"){
		//make changes to the change secrets menu
		renderChangeSecretsMenu(data);
	}
	else if(data.responseFlag == "failure"){
		console.log("Failed to enroll the Customer to the database");
		alert("Failed to enroll the Customer details into the database");
	}
};

function renderChangeSecretsMenu(data){
	
	hideMask();
	document.getElementById("change_secrets_mask").style.display="none";
	//make changes to the change secrets menu depending on the status of the txnPwdStatus
	var txnPwdStatus = data.transactionPasswordStatus;
	$("#change_secrets_menu").html("");
	var html = "<div class=\"change_secrets_item menu_border\" id=\"pinConfig\" onclick=\"changeStarToken();\">"+
					"<div class=\"change_secrets_label\">StarToken Pin</div>"+
				"</div>"+
				"<div class=\"change_secrets_item menu_border\" id=\"qaConfig\" onclick=\"changeSecretQuestion();\" style=\"border-bottom: 1px solid #00509D\">"+
					"<div class=\"change_secrets_label\">Secret Question &amp; Answer</div>"+
				"</div>";
	if(txnPwdStatus == "PENDING_ACTIVATION"){
		if(data.isTransactionPwdSetup == false){
			html+= "<div class=\"change_secrets_item\" id=\"setupTxnConfig\" onclick=\"showSetupTxnPwdScreen()\">"+
					"<div class=\"change_secrets_label\">Setup Transaction Password</div>"+
					"</div>";
		}
	}
	else if(txnPwdStatus == "ACTIVE"){
		html+= "<div class=\"change_secrets_item menu_border\" id=\"txnConfig\" onclick=\"changeTransactionPwd();\">"+
		"<div class=\"change_secrets_label\">Change Transaction Password</div>"+
		"</div>" +
		"<div class=\"change_secrets_item\" id=\"setupTxnConfig\" onclick=\"showForgotTxnPwdScreen();\">"+
		"<div class=\"change_secrets_label\">Forgot Transaction Password</div>"+
		"</div>";
	}
	else if(txnPwdStatus == "SUSPENDED"){
		html+= "<div class=\"change_secrets_item\" id=\"setupTxnConfig\" onclick=\"showForgotTxnPwdScreen();\">"+
		"<div class=\"change_secrets_label\">Forgot Transaction Password</div>"+
		"</div>";
	}
	$("#change_secrets_menu").html(html);
	document.getElementById("change_secrets_mask").style.display="block";
}

function saveUserLoginDetail()
{
	var _url = _serverBaseUrl + "BoiMobileBanking/customer/logUserSession.htm?callback=?&userId=" + _userId + "&zSessionId=" + zsid ;
	console.log("url : " + _url);
	$.ajax({
			type:"GET",
			async:false,
			cache: true,
			url: _url,
			dataType : 'jsonp',
			success:function(data) {
				if(data)
					console.log("User Login log saved successfully");
				else
					console.log("ZrSession Id is already exists in user log table for user "+ _userId +" and ZrSession Id is " + zsid);
			},
			error : function() {
				console.log("Error while saving User Login log ");
			}
	});
}

function checkIfUserEnrolled(){
	showMask();
	var url = _serverBaseUrl + "BoiMobileBanking/customer/check-txn-pwd-status.htm?callback=?&user_id=" + _userId;
	var errLog = "Error occured while checking user Status";
	setUpOpts(url, checkIfUserEnrolledCallback, errLog);
}

var checkIfUserEnrolledCallback = function(data){
	if(data.responseFlag == "success"){
		console.log("Customer details already exist in the database");
	} else if(data.responseFlag == "failure"){
		var url1 = _serverBaseUrl + "BoiMobileBanking/customer/enroll-customer.htm?callback=?&user_id=" + _userId;
		var errLog1 = "Error occured while enrolling user";
		setUpOpts(url1, enrollUserCallback, errLog1);
	}
};

var enrollUserCallback = function(data){
	hideMask();
	if(data.responseFlag == "success"){
		console.log("Successfully enrolled the Customer details into the database");
	}
	else if(data.responseFlag == "failure"){
		alert("Failed to enroll the Customer details into the database");
	}
};