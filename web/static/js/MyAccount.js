document.addEventListener('touchmove', function(e){
	e.preventDefault();
}, false);

var _userId = null;
var _serverBaseUrl = null;
var _isTablet = true;
var allAccounts = new Array();
var _isProd = true;
var accountNos = "";
var accountType = "";
var customerId = '';   
var totalRecords = '';
var pageStart = 1;
var pageEnd = 10;
var accountsArr = '';
var accountsArrBalInq = '';
var account_nos = null;
var _senderMobileNumber = "";

$(document).ready(function(){
	R2FA4AHAJSI.callSetUpPage();
});

function setUpPage(serverBaseUrl, userId, isTablet){
	$("#header").remove();
	$("#navbar").remove();
	$("#menu").remove();
	$("header").show();
	
	$("#pagination-prev-ministatement-button").unbind('click').bind('click', function() {
        showPrevRecords('mini_statement_accounts_content', accountsArr);
    });
    
    $("#pagination-next-ministatement-button").unbind('click').bind('click', function() {
        showNextRecords('mini_statement_accounts_content', accountsArr);
    });
    
    $("#pagination-prev-balanceenq-button").unbind('click').bind('click', function() {
        showPrevRecords('balance_inquiry_accounts_list_content', accountsArrBalInq);
    });
    
    $("#pagination-next-balanceenq-button").unbind('click').bind('click', function() {
        showNextRecords('balance_inquiry_accounts_list_content', accountsArrBalInq);
    });
    

	$("#page_header_back").on("tap",function() {
		if(isTablet == 'false' && $.ui.activeDiv.attributes.id.value == "account_menu")
			R2FA4AHAJSI.onBackKeyPressed();
		else
			$.ui.goBack();
	});
	
	showMask();
	console.log("Base Url for Mobile application = " + serverBaseUrl);
	_serverBaseUrl = serverBaseUrl;
	console.log("user Id = " + userId);
	_userId = userId;
	console.log("isTablet = " + isTablet);
	if(isTablet == 'true'){
		_isTablet = true;
	}
	if(!_isTablet){
		$("#error").css("line-height", "20px");
		$("#error").css("font-size", "13px");
	}
	 
	console.log("before fetching customerId serverBaseUrl = " + _serverBaseUrl);
	console.log("before fetching customerId userId = " + userId);
	 
	if(_userId != null && _userId != "" && _serverBaseUrl != null && _serverBaseUrl != "") {
		 console.log("customerId not available. fetching customerId");
		 var _url = _serverBaseUrl + "BoiMobileBanking/customer.htm?callback=?&user_id=" + _userId;
		 console.log("url : " + _url);
		 $.ajax({
			    type:"GET",
			    async:false,
			    cache: true,
			    url: _url,
			    dataType : 'jsonp', 
			    success:function(data) {

			    	InitailizeMyAccounts(data);
			    	console.log("account_nos = " + accountNos);
			    	console.log("customerId = " + customerId);
			    	setUpMyAccounts();
			    	$("#main_menu").show();
			    	$("#error_menu").hide();
			    	hideMask();
			    }, 
			    error : function() {
			    	console.log("error in getting customer id from my accounts");
			    	$("#main_menu").hide();
			    	$("#error_menu").show();
			    	hideMask();
			    }
		});
	 } else {
		 alert("error occured while configuring MyAccounts, please try to login again");
	 }
}

function showMask() {
	$.ui.showMask("Your details are being fetched. Please wait...");
	$("body").append('<div class="modalWindow"/>');
}

function hideMask() {
	$(".modalWindow").remove();
    $.ui.hideMask();
}

function clearHistory() {
	$.ui.clearHistory();
	$.ui.loadContent("#account_menu",true,false,"slide");
}

function account(accNumber, accType, custId) {
	this.accNumber=accNumber;
	this.accType=accType;
	this.custId=custId;
}

function InitailizeMyAccounts(data){

	var tempObject;
	totalRecords = data;
	account_nos = 'account_nos=';
	allAccounts = [];
	accountNos = "";
	accountType = "";
	accountsArrBalInq = "";
	accountsArr = "";
	
	// To construct array for balance inquiry
	accountsArrBalInq = getAccountsArrayForBalanceInquiry(totalRecords);
	
	for(singleRecord in totalRecords)
	{
		customerId = totalRecords[singleRecord].customerId + '&';
		
		for(curAcc in totalRecords[singleRecord].accounts)
		{
			tempObject = new account(totalRecords[singleRecord].accounts[curAcc].accountNo.trim(), totalRecords[singleRecord].accounts[curAcc].accountType.trim(), totalRecords[singleRecord].customerId);
			accountNos += account_nos + totalRecords[singleRecord].accounts[curAcc].accountNo + '&';			
			accountType += totalRecords[singleRecord].accounts[curAcc].accountType + '&';
			allAccounts.push(tempObject);
		}
	}
	
	_senderMobileNumber = data[0].customerMobileNumber;
	accountType = accountType.substr(0, accountType.length - 1);
	accountNos = accountNos.substr(0, accountNos.length - 1);
	customerId = customerId.substr(0, customerId.length - 1);
	
	// To construct array for Mini statement
	accountsArr = getAccountsArrayForMiniStatement(accountNos, accountType);
	$("#cust_id").val(customerId);
	$("#account_nos").val(accountNos);
	$("#account_type").val(accountType);
}

$(".inputAccount").each(function(i, el) {
    el.type = "text";
    el.onfocus = function(){this.type="number";};
    el.onblur = function(){this.type="text";};
});