//ASCII values of Numbers
var numberASCII=[48,49,50,51,52,53,54,55,56,57];

var imtAccountNos = "";
var imtAccountType = "";
var imtTransactionList = "";
var imtTransactionDetails = "";
var checkStatusToggle = "";

//Rule Matrix for thirdPartyFundTransfer
var thirdPartyTransferRuleMatrix=new Array();

thirdPartyTransferRuleMatrix['SBA']={'SBA':true,'CCA':true,'CAA':true,'ODA':true,'LAA':true,'TDA':false,'NRE':false};

thirdPartyTransferRuleMatrix['CCA']={'SBA':true,'CCA':true,'CAA':true,'ODA':true,'LAA':true,'TDA':false,'NRE':false};

thirdPartyTransferRuleMatrix['CAA']={'SBA':true,'CCA':true,'CAA':true,'ODA':true,'LAA':true,'TDA':false,'NRE':false};

thirdPartyTransferRuleMatrix['ODA']={'SBA':true,'CCA':true,'CAA':true,'ODA':true,'LAA':true,'TDA':false,'NRE':false};

thirdPartyTransferRuleMatrix['LAA']={'SBA':false,'CCA':false,'CAA':false,'ODA':false,'LAA':false,'TDA':false,'NRE':false};

thirdPartyTransferRuleMatrix['TDA']={'SBA':false,'CCA':false,'CAA':false,'ODA':false,'LAA':false,'TDA':false,'NRE':false};

thirdPartyTransferRuleMatrix['NRE']={'SBA':true,'CCA':true,'CAA':true,'ODA':true,'LAA':true,'TDA':true,'NRE':true};

//function to check if transaction is possible , based on account types
function isTransactonPossible(fromAccType,toAccType) {
	if(thirdPartyTransferRuleMatrix[fromAccType][toAccType]!==undefined) {
		return thirdPartyTransferRuleMatrix[fromAccType][toAccType];
	}
	return false;
}

//function to return distinct values in an array
function uniqueBy(arr, fn) {
	var unique = {};
	var distinct = [];
	arr.forEach(function (x) {
		var key = fn(x);
		if (!unique[key]) {
			distinct.push(key);
			unique[key] = true;
		}
	});
	return distinct;
}

function getAndroidVersion() {
	var ua = navigator.userAgent;
	if( ua.indexOf("Android") >= 0 )
	{
	  var androidversion = parseFloat(ua.slice(ua.indexOf("Android")+8)); 
	  return androidversion;
	}
}

function Map() {
	this.keys = new Array();
	this.data = new Object();
	
	this.put = function(key, value) {
	    if(this.data[key] == null){
	        this.keys.push(key);
	    }
	    this.data[key] = value;
	};
	
	this.get = function(key) {
	    return this.data[key];
	};
	
	this.remove = function(key) {
	    var index = this.keys.indexOf(key);
	    this.keys.splice(index, 1);
	    this.data[key] = null;
	};
}

var cacheMap = new Map();
var confirmFundTransferPage="";
//var enquiryPage = "";

function setUpMyAccounts(){
	
	if(!_isTablet){
		$(".note").css("line-height", "20px");
	}

	console.log("before binding in My Accounts serverBaseUrl = " + _serverBaseUrl);
	console.log(" before binding in My Accounts userId = " + _userId);
	
	if(_userId != null && _userId != "" && _serverBaseUrl != null && _serverBaseUrl != "") {
		
		$("#mpin").attr('type','password');

		//for amount and accountNumber input		
		$(".for_amount, .for_account_number").keypress(function(event) {
			var key = event.which;
			
			if(this.className.indexOf("for_amount")!==-1 ){
				
				if(numberASCII.indexOf(key)===-1 && key!==46 ) {
					event.preventDefault();
				}
			}
			else if (!(numberASCII.indexOf(key)>=0)) {
				event.preventDefault();
			}
		});
		
		$("#balanceInquiry").unbind('click').click(function(){
			
			showMask();
			var balInqAccountHtml = cacheMap.get("balInqAccountHtml");
			
			if(balInqAccountHtml && balInqAccountHtml != null && balInqAccountHtml != "") {
			
				console.log("balInqAccountHtml already available");
				$.ui.loadContent("#balance_inquiry_accounts_list", false, false, "slide");
			
			} else {
				
				/*var accounts  = accountNos.replace(/account_nos=/g,"").split("&");
				var html = "";
				
				console.log("Valid Account List For Balance Inquiry - " +accounts);
			    
				if(accounts.length <= 0) {
				    html = "<li class=\"li_content_background\" ><a class=\"li_content\">No Accounts Found.</a></li>";
				} else {
					
					for(var i=0; i<accounts.length; i++) {
						if( accounts[i] != null && accounts[i] != "" && accounts[i] != undefined)
							html += "<li><a href=\"javascript:showBalanceInquiry('" + accounts[i] + "');\"><span>Account Number</span><span class=\"span_right\">" + accounts[i] +  "</span></a></li>";
					}    
				}
				
			    $("#balance_inquiry_accounts_list_content").html(html);*/
				
				$("#pagination-prev-balanceenq-button").show();
				$("#pagination-next-balanceenq-button").show();
				
				showMiniStatements(accountsArrBalInq, 'balance_inquiry_accounts_list_content', 1, 10);
			    $.ui.loadContent("#balance_inquiry_accounts_list", false, false, "slide");
			    cacheMap.put("balInqAccountHtml", true);
			
			}
			
			hideMask();
		});
				
		$("#miniStatement").unbind('click').click(function(){

			showMask();			
			var miniStatementHtml = cacheMap.get("miniStatementHtml");
			
			if(miniStatementHtml && miniStatementHtml != null && miniStatementHtml != "") {
			
				console.log("miniStatementHtml already available");
				$.ui.loadContent("#mini_statement_accounts", false, false, "slide");
			
			} else {

				/*var accountNumbersList = getFromAccounts("miniStatement", accountNos, accountType);
				var accounts  = accountNumbersList.replace(/account_nos=/g,"").split("&");
				var html = "";
				
				console.log("Valid Account List For Mini- Statement - " +accounts);
			    
				if(accounts.length <= 0 || accountNumbersList.length <=0) {
				    html = "<li class=\"li_content_background\" ><a class=\"li_content\">No Accounts Found.</a></li>";
				} else {
					for(var i=0; i<accounts.length; i++) {
						if( accounts[i] != null && accounts[i] != "" && accounts[i] != undefined)
							html += "<li><a href=\"javascript:showMiniStatement('" + accounts[i] + "');\"><span>Account Number</span><span class=\"span_right\">" + accounts[i] +  "</span></a></li>";
					}    
				}
			    $("#mini_statement_accounts_content").html(html);*/
				
				$("#pagination-prev-ministatement-button").hide();
				$("#pagination-next-ministatement-button").show();

				showMiniStatements(accountsArr, 'mini_statement_accounts_content', 1, 10);
			    $.ui.loadContent("#mini_statement_accounts", false, false, "slide");
			    cacheMap.put("miniStatementHtml", true);
			}
			hideMask();
		});
				
				$("#selfFundTransfer").unbind('click').click(function(){
					clearSelfLinkDetails();
					showMask();
					confirmFundTransferPage = "SELF_LINK";
					var selfFundTransferHtml = cacheMap.get("selfFundTransferHtml");

					if(selfFundTransferHtml && selfFundTransferHtml != null && selfFundTransferHtml != ""){
						
						console.log("selfFundTransferHtml already available");
						$("#fund_self_link_account").html(selfFundTransferHtml);
						setUpSelfFundsTransferDropdowns();
						$.ui.loadContent("#fund_self_link_account",false,false,"slide");
					
					} else {
						
						var accountNumbersList = getFromAccounts("self-link",  accountNos, accountType);
						var accounts  = accountNumbersList.replace(/account_nos=/g,"").split("&");
						console.log("Account List for self inqiry : " + accounts);
						var html = "<option value='-1' selected='selected'> Source Account </option>";

						if(accounts.length >1)
						{
							for(var i=0; i<accounts.length; i++) {
								if( accounts[i] != null && accounts[i] != "" && accounts[i] != undefined)
									html += "<option value="+ accounts[i]+">"+ accounts[i] +"</option>";
							}
							$("#from_account").html(html);
							setUpSelfFundsTransferDropdowns();
							$.ui.loadContent("#fund_self_link_account",false,false,"slide");
							cacheMap.put("selfFundTransferHtml", $("#fund_self_link_account").html());
						}
						else
						{
							alert("As you have only one account, you cannot perform Self/Link Fund Transfer");
						}
					}
					hideMask();
				});
				
				$("#view_payee_third_party").unbind('click').click(function(){
					showMask();
					var viewRegisterdPayee = cacheMap.get("viewRegisterdPayee");
					if(viewRegisterdPayee && viewRegisterdPayee != null && viewRegisterdPayee != ""){
						console.log("viewRegisterdPayee already available");
						$("#view_payee_list_panel").html(viewRegisterdPayee);
						$.ui.loadContent("#view_payee_list_panel", false, false, "slide");
						hideMask();
					}
					else {
					  var _url = _serverBaseUrl+"BoiMobileBanking/third-party/payee-detail.htm?callback=?&user_id=" + _userId;
					  console.log("_url : " + _url);
					  var errLog = "Third Party Fund Transfer : Unable to fetch payee names";
					  setUpOpts(_url, viewPayeeThirdPartyCallBack, errLog);
					}
				});
				
				$("#payee_history_third_party").unbind('click').click(function(){
					showMask();
					var transactionHistory = cacheMap.get("transactionHistory");
					if(transactionHistory && transactionHistory != null && transactionHistory != ""){
						console.log("transactionHistory already available");
						$("#transaction_history_panel").html(transactionHistory);
						$.ui.loadContent("#transaction_history_panel", false, false, "slide");
						hideMask();
					}
					else{
						var _url = _serverBaseUrl+"BoiMobileBanking/third-party/last-five-transactions.htm?callback=?&user_id=" + _userId;
						console.log("_url : " + _url);
						var errLog = "Unable to fetch Last 5 Quick Banking Transactions";
						setUpOpts(_url, transactionHistoryThirdPartyCallBack, errLog);
					}
				});
				
				$("#pay_payee_third_party").unbind('click').click(function(){
					clearThirdPartyDetails();
					showMask();
					confirmFundTransferPage = "THIRD_PARTY";
					var thirdPartyFundTransferHtml = cacheMap.get("thirdPartyFundTransferHtml");
					
					var accountNumbers = '';
					var accountNumberList = '';
					var html = '';
					
					accountNumbers = getFromAccounts("third-party", $("#account_nos").val(), $("#account_type").val());
					accountNumberList  = accountNumbers.replace(/account_nos=/g,"").split("&");
                    
					console.log("Account List for third party fund transfer : " + accountNumberList);

                    html = "<option value=\"\" selected=\"selected\"> Source Account </option>";
					
					for(var i=0; i<accountNumberList.length; i++) { 
						if( accountNumberList[i] != '' && accountNumberList[i] != undefined)
							html += "<option value="+ accountNumberList[i]+">"+ accountNumberList[i]+"</option>";
					}
					
					$("#from_account_third_party").html(html);
					$.ui.loadContent("#fund_third_party_transfer", false, false, "slide");
					hideMask();
					cacheMap.put("thirdPartyFundTransferHtml", $("#fund_third_party_transfer").html());
				});
				
				$("#neftFundTransfer").unbind('click').click(function(){
					
					showMask();
					clearNeftDetails();
					
					var neftFundTransferHtml = cacheMap.get("neftFundTransferHtml");

					if(neftFundTransferHtml && neftFundTransferHtml != null && neftFundTransferHtml != ""){
						
						console.log("neftFundTransferHtml already available");
						$.ui.loadContent("#fund_neft_transfer", false, false, "slide");
						hideMask();

					} else {
						
						var accountNumbersList = getFromAccounts("neft",  accountNos, accountType);
						var accounts  = accountNumbersList.replace(/account_nos=/g,"").split("&");
						console.log("Account List for NEFT : " + accounts);

						var html = "<option value='Source Account' selected=\"selected\"> Source Account </option>";

						for(var i=0; i<accounts.length; i++) { 
							if( accounts[i] != null && accounts[i] != "" && accounts[i] != undefined)
								html += "<option value='"+ accounts[i] +"'>"+ accounts[i]+"</option>";
						}

						$("#from_account_neft").html(html);
						//fetch the beneficiaries for the user from IB DB.
						var beneficiaryURL = _serverBaseUrl+"BoiMobileBanking/beneficiary/neft-beneficiaries.htm?callback=?&user_id=" + _userId;
						setUpOpts(beneficiaryURL, neftBeneficiaryCallBack, "Failed to fetch beneficiaries for the user");
					}
					
				});
				
				$("#rtgsFundTransfer").unbind('click').click(function(){
					showMask();
					clearRtgsDetails();
					$("#from_account_rtgs").val("Source Account");

					var rtgsFundTransferHtml = cacheMap.get("rtgsFundTransferHtml");
					if(rtgsFundTransferHtml && rtgsFundTransferHtml != null && rtgsFundTransferHtml != ""){
						console.log("rtgsFundTransferHtml already available");
						$.ui.loadContent("#fund_rtgs_transfer", false, false, "slide");
						hideMask();
					} else {
						var _url = "";
						
						if(_isProd){
							_url = _serverBaseUrl+"BoiMobileBanking/customer/accounts/balance.htm?callback=?&" + $("#account_nos").val(); //for c24
						}else{
							_url = _serverBaseUrl+"BoiMobileBanking/customer/accounts.htm?callback=?&customer_id=" + $("#cust_id").val();
						}
						console.log("_url : " + _url);
						var errLog = "RTGS Fund Transfer : Unable to fetch customer account numbers";
						setUpOpts(_url, rtgsFundTransferCallBack, errLog);
					}
					
					showMask();
					var rtgsFundTransferBeneficiariesHtml = cacheMap.get("rtgsFundTransferBeneficiariesHtml");
					if(rtgsFundTransferBeneficiariesHtml && rtgsFundTransferBeneficiariesHtml != null && rtgsFundTransferBeneficiariesHtml != ""){
						console.log("rtgsFundTransferBeneficiariesHtml already available");
						$("#select_payee_name_rtgs").html(rtgsFundTransferBeneficiariesHtml);
						hideMask();
					} else {
						var _url2 = _serverBaseUrl+"BoiMobileBanking/beneficiary/beneficiary-rtgs.htm?callback=?&customer_id=" + $("#cust_id").val();
						console.log("_url2 : " + _url2);
						var errLog = "RTGS Fund Transfer : Unable to fetch beneficiary account numbers";
						setUpOpts(_url2, rtgsBeneficiaryCallBack, errLog);
					}
						
				});
				
				$("#confirm_neft_fund_transfer_btn").unbind('click').click(function(){
					var mPin = $('#mpin_neft').val().trim();
					if( mPin == "")
					{
						alert("Please Enter Transaction Password");
					}
					else
				    {
						showMask();
						var _url = _serverBaseUrl+"BoiMobileBanking/customer/validate-txn-pwd.htm?callback=?&user_id=" + encodeURIComponent(_userId) + "&txn_pwd=" + encodeURIComponent(mPin);
						setUpOpts(_url, txnPwdValidationCallback_NEFT, "Failed to validate Transaction Password.");
				    }
				});
				
				$("#confirm_fund_transfer_btn").unbind('click').click(function(){
					var mPin = $('#mpin').val().trim();
					if( mPin == "")
					{
						alert("Please Enter Transaction Password");
					}
					else
				    {
						showMask();
						var _url = _serverBaseUrl+"BoiMobileBanking/customer/validate-txn-pwd.htm?callback=?&user_id=" + encodeURIComponent(_userId) + "&txn_pwd=" + encodeURIComponent(mPin);
						setUpOpts(_url, txnPwdValidationCallback, "Failed to validate Transaction Password.");
				    }
				});
				
				$("#chequeBookRequest").unbind('click').click(function(){
					showMask();
					var chequeBookRequestHtml = cacheMap.get("chequeBookRequestHtml");
					if(chequeBookRequestHtml && chequeBookRequestHtml != null && chequeBookRequestHtml != ""){
						console.log("chequeBookRequestHtml already available");
						$.ui.loadContent("#cheque_book_request_page", false, false, "slide");
						hideMask();
					} else {
						var _url = _serverBaseUrl+"BoiMobileBanking/customer/accounts.htm?callback=?&customer_id=" + $("#cust_id").val();
						console.log("_url : " + _url);
						var errLog = " Cheque Book Request : Unable to fetch account numbers";
						setUpOpts(_url, chequeBookRequestCallBack, errLog);
					}
				});
				
			    $("#stopChequeRequest").unbind('click').click(function(){
			    	showMask();
					var stopChequeRequestHtml = cacheMap.get("stopChequeRequestHtml");
					if(stopChequeRequestHtml && stopChequeRequestHtml != null && stopChequeRequestHtml != ""){
						console.log("stopChequeRequestHtml already available");
						$.ui.loadContent("#stop_cheque_request_page", false, false, "slide");
						hideMask();
					} else {
						var _url = _serverBaseUrl+"BoiMobileBanking/customer/accounts.htm?callback=?&customer_id=" + $("#cust_id").val();
				    	console.log("_url : " + _url);
				    	var errLog = "Stop Cheque Request : Unable to fetch account numbers";
				    	setUpOpts(_url , stopChequeRequestCallBack, errLog);
					}
					
				});
			    
			    $("#chequeStatusInquiry").unbind('click').click(function(){
			    	showMask();
					var chequeStatusInquiryHtml = cacheMap.get("chequeStatusInquiryHtml");
					if(chequeStatusInquiryHtml && chequeStatusInquiryHtml != null && chequeStatusInquiryHtml != ""){
						console.log("chequeStatusInquiryHtml already available");
						$.ui.loadContent("#cheque_status_inquiry_page", false, false, "slide");
						hideMask();
					} else {
						var _url = _serverBaseUrl+"BoiMobileBanking/customer/accounts.htm?callback=?&customer_id=" + $("#cust_id").val();
				    	console.log("_url : " + _url);
				    	var errLog = "Cheque Status Inquiry : Unable to fetch account numbers";
				    	setUpOpts(_url , chequeStatusInquiryCallBack, errLog);
					}
					
				});
			    
			    $("#viewRequests").unbind('click').click(function(){
			    	showMask();
					var viewRequestsHtml = cacheMap.get("viewRequestsHtml");
					if(viewRequestsHtml && viewRequestsHtml != null && viewRequestsHtml != ""){
						console.log("viewRequestsHtml already available");
						$.ui.loadContent("#view_request_page", false, false, "slide");
						hideMask();
					} else {
						var _url = _serverBaseUrl+"BoiMobileBanking/customer/accounts.htm?callback=?&customer_id=" + $("#cust_id").val();
				    	console.log("_url : " + _url);
				    	var errLog = "View Requests : Unable to fetch account numbers";
				    	setUpOpts(_url , viewRequestsCallBack, errLog);
					}
					
				});
			    
			    $("#confirm_cheque_book_request_btn").unbind('click').click(function(){
			    	var _url = _serverBaseUrl+"BoiMobileBanking/customer/chequeBookRequest.htm?callback=?&" +
			    			"&m_pin=" + $("#cheque_request_mpin").val() + "&cheque_book_request_account_no=" + $("#selected_account_no").text()+
			    			"&cheque_book_request_no_leaves=" + $("#selected_cheque_leaves").text();
			    	console.log("_url : " + _url);
			    	var errLog = "Cheque book request failed";
			    	setUpOpts(_url , confirmChequeBookRequestCallBack, errLog);
			    });
			    
			    $("#cancel_cheque_request_btn").unbind('click').click(function(){
			    	$.ui.goBack();
			    });
			    
			    $("#cancel_confirm_cheque_book_request_btn").unbind('click').click(function(){
			    	$.ui.goBack();
			    });
			    
			    $("#confirm_stop_cheque_request_btn").unbind('click').click(function(){
			    	var _url = _serverBaseUrl+"BoiMobileBanking/customer/stopChequeRequest.htm?callback=?&" +
			    	"&m_pin=" + $("#stop_cheque_request_mpin").val() + "&stop_cheque_request_selected_account_no="+ $("#stop_cheque_request_selected_account_no").text() +
			    	"&stop_cheque_request_cheque_no=" + $("#stop_cheque_request_cheque_no").text();
			    	console.log("_url : " + _url);
			    	var errLog = "Stop Cheque request failed";
			    	setUpOpts(_url, confirmStopChequeRequestCallBack, errLog);
					
			    });
			    
			    $("#cancel_stop_cheque_request_btn").unbind('click').click(function(){
			    	$.ui.goBack();
			    });
			    
			    $("#cancel_confirm_stop_cheque_request_btn").unbind('click').click(function(){
			    	$.ui.goBack();
			    });
			    
			    $("#submit_cheque_inquiry_request_detail").unbind('click').click(function(){
			    	
			    	if ($("#cheque_status_inquiry_account_no").val() == "")
			    	{
			    		alert ("Please select account number");
			    	}
			    	else if ($("#cheque_status_ref_no").val() == "")
			    	{
			    		alert ("Please enter cheque number");
			    	}
			    	else
			    	{
			    		var _url = _serverBaseUrl+"BoiMobileBanking/customer/chequeStatusInquiry.htm?callback=?&" + 
			    		"&cheque_status_inquiry_account_no=" + $("#cheque_status_inquiry_account_no").val() +
			    		"&cheque_status_ref_no=" + $("#cheque_status_ref_no").val();
			    		console.log("_url : " + _url);
			    		var errLog = "Failed to fetch status of cheque.";
			    		setUpOpts(_url, submitChequeInquiryRequestDetailCallBack, errLog);
			    	}
			    });
			    
			    $("#cancel_cheque_inquiry_request_btn").unbind('click').click(function(){
			    	$.ui.goBack();
			    });
			    
			    $("#submit_view_request_detail").unbind('click').click(function(){
			    	if ($("#view_request_account_no").val() == "")
			    	{
			    		alert ("Please select account number");
			    	}
			    	else if ($("#view_request_cheque_ref_no").val() == "")
			    	{
			    		alert ("Please enter cheque reference id");
			    	}
			    	else
			    	{
			    		var _url = _serverBaseUrl+"BoiMobileBanking/customer/view-pending-requests.htm?callback=?&"+
			    				"&account_no=" + $("#view_request_account_no").val() + "&ref_no=" + $("#view_request_cheque_ref_no").val();
			    		console.log("_url : " + _url);
			    		var errLog = "Failed to fetch request details";
			    		setUpOpts(_url, submitViewRequestDetailCallBack, errLog);
			    	}
				});
			    
			    $("#cancel_view_request_btn").unbind('click').click(function(){
			    	$.ui.goBack();
			    });
			    
			    $("#cancel_confirm_view_request_btn").unbind('click').click(function(){
			    	$.ui.goBack();
			    });
				
				$('#edit_fund_transfer_btn').unbind('click').click(function () {
					$.ui.goBack();
				});
				
				$('#edit_neft_fund_transfer_btn').click(function () {
					$.ui.goBack();
				});
				
				$('#edit_imt_fund_transfer_btn').click(function () {
					$.ui.goBack();
				});
				
				
				$(".select_btn").click(function(){

					var anroidVersion = getAndroidVersion();
					if(anroidVersion <= 2.4 )
					{
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
				
				$('#submit_imt_transfer_detail').unbind('click').click(function (e) {
					
					var beneficiary_imt = $('#beneficiary_imt').val().trim();
					var transaction_amount_imt = $('#transaction_amount_imt').val().trim();
					var from_account_imt = $('#from_account_imt').val().trim();
					var imt_sender_code = $('#imt_sender_code').val().trim();
					var imt_mobile_number =$('#imt_mobile_number').val().trim(); 
					var imt_remark = $('#imt_payment_remark').val().trim();
					var isTermChecked = $('#isTermSelected').is(':checked');
					$('#mpin_imt').val("");
					
					if(beneficiary_imt == "" || beneficiary_imt == "-1")
					{
						alert("Please select a beneficiary");
					}
					else if(transaction_amount_imt  == "" || transaction_amount_imt  == "Payment Amount")
					{
						alert("Please Enter Payment Amount.");
					}
					else if(parseInt(transaction_amount_imt)%100 !== 0 || transaction_amount_imt > 10000 || transaction_amount_imt < 100 || ! /^\d+$/.test(transaction_amount_imt))
					{
						alert("Payment amount should be non decimal, multiple of 100 and maximum of Rs.10000");
					}
					else if(from_account_imt == "" || from_account_imt == "-1" || from_account_imt == "Source Account")
					{
						alert("Please select a source account");
					}
					else if(imt_sender_code.length!=4 || ! /^\d+$/.test(imt_sender_code)){
						alert("Withdrawl code should be 4 digit and number only.");
					}
					else if(imt_mobile_number.length<10 || imt_mobile_number.length>12){
						alert("Please Enter valid phone number of 10 to 12 digits.");
					}
					else if(!isTermChecked) {
						alert("Please accept terms and condition");
					}
					else{
						
						$('#confirmation_beneficiary_imt').text(beneficiary_imt.split("_")[1]);
						$('#confirmation_imt_beneficiary_mobile_number').text(beneficiary_imt.split("_")[0]);
						$('#confirmation_imt_customer_mobile_number').text(imt_mobile_number);
						$('#confirmation_from_account_imt').text(from_account_imt.split("_")[1]);
						$('#confirmation_transaction_amount_imt').text(transaction_amount_imt);
						$('#confirmation_imt_sender_code').text(imt_sender_code);
						$('#confirmation_imt_remark').text(imt_remark);
						
						document.getElementById("isTermSelected").checked = false;
						
						$.ui.loadContent("#confirmation_imt_transaction",false,false,"slide");
					}
					
				});
				$("#confirm_imt_fund_transfer_btn").unbind('click').click(function(){
					var mPin = $('#mpin_imt').val().trim();
					if( mPin == "")
					{
						alert("Please Enter Transaction Password");
					}
					else
				    {
						showMask();
						var _url = _serverBaseUrl+"BoiMobileBanking/customer/validate-txn-pwd.htm?callback=?&user_id=" + encodeURIComponent(_userId) + "&txn_pwd=" + encodeURIComponent(mPin);
						console.log(_url);
						setUpOpts(_url,txnPwdValidationCallback_IMT, "Failed to validate Transaction Password.");
				    }
				});
				$('#submit_neft_transfer_detail').unbind('click').click(function (e) {
					 
					var fromAccount = $('#from_account_neft').val();
					var toAccount = $("#beneficiary_neft").val();
					var amount = $('#transaction_amount_neft').val().trim();
					//var remark = $('#transaction_remark_neft').val().trim();
					$('#mpin_neft').val("");
					if(fromAccount == "" || fromAccount == "from_account_neft" || fromAccount == "Source Account")
					{
						alert("Please select a source account");
					}
					else if($("#beneficiary_neft").val() == "Select Beneficiary" || $("#beneficiary_neft").val() == "beneficiary_account_neft" 
						|| $("#beneficiary_neft").val() == ""){
						alert("Please select a Beneficiary");
					}
					else if(amount  == "" || amount  == "Enter Amount")
					{
						alert("Please Enter Amount");
					}
					else if(amount == "" || amount < 1)
					{
						alert("Transaction amount should be greater than 1");
					}
					else if(!(/(^[0-9]+$)|(^[0-9]+(.){1}([0-9]{1,2})$)/.test(amount)))
					{
						alert("Transaction amount should start and end with a digit and cannot contain more than 2 decimal places");
					}
					else if(amount > 50000)
					{
						alert("Transaction Amount cannot be more than 50000");
					}
					else
					{
						var beneficiaryValues = $("#beneficiary_neft").val();
						var beneficiaryDetails = beneficiaryValues.split("_");

						var fromAccount = $('#from_account_neft').val();
						var toAccount = beneficiaryDetails[6].trim();
						var amount = $('#transaction_amount_neft').val().trim();
						//var remark = $('#transaction_remark_neft').val().trim();
						var ifscCode = beneficiaryDetails[5].trim();
						var payeeName = beneficiaryDetails[3].trim();
						var bankCode = beneficiaryDetails[0].trim();
						var branchCode = beneficiaryDetails[1].trim()
						var accountType = beneficiaryDetails[2].trim();
						var branchAddress = beneficiaryDetails[4].trim();
						var branchName = beneficiaryDetails[7].trim();
						var city = beneficiaryDetails[8].trim();
						var state = beneficiaryDetails[9].trim();
						var bankName = beneficiaryDetails[10].trim();
						
						$('#confirmation_neft_from_account').text(fromAccount);
						$('#confirmation_neft_amount').text(amount);
						//$('#confirmation_neft_remark').text(remark);
						$('#confirmation_neft_to_account').text(toAccount);
						$('#confirmation_neft_payee_name').text(payeeName);
						$('#confirmation_neft_bank_code').text(bankCode);
						$('#confirmation_neft_branch_code').text(branchCode);
						$('#confirmation_neft_ifsc_code').text(ifscCode);
						$('#confirmation_neft_act_type').text(accountType);
						$('#confirmation_neft_branch_address').text(branchAddress);
						$('#confirmation_neft_branch_name').text(branchName);
						$('#confirmation_neft_branch_city').text(city);
						$('#confirmation_neft_bank_name').text(bankName);
						
						// Hide/Show Remark
						/*if(remark == "")
							$('#confirmation_neft_remark').parent().addClass('hide-option');
						else
							$('#confirmation_neft_remark').parent().removeClass('hide-option');
						*/
						$.ui.loadContent("#confirmation_neft_transaction",false,false,"slide");
					}
								
				});
				
				$('#cancel_neft_transfer_detail').unbind('click').click(function (e) {
					$.ui.goBack();
				});
				
				$('#submit_rtgs_transfer_detail').unbind('click').click(function (e) {
					 
					var fromAccount = $('#from_account_rtgs').val();
					var toAccount = $("#to_account_rtgs").val();
					var amount = $('#transaction_amount_rtgs').val().trim();
					var remark = $('#transaction_remark_rtgs').val().trim();
					
					if(fromAccount == "" || fromAccount == "from_account_rtgs" || fromAccount == "Source Account")
					{
						alert("Please select a source account");
					}	
					else if(toAccount == "" || toAccount == "to_account_rtgs")
					{
						alert("Please select a destination account");
					}
					else if(amount == "" || amount <= 0)
					{
						alert("Please enter a valid transaction amount");
					}
					else if(amount > 5000)
					{
						alert("Transaction Amount cannot be more than 5000");
					}
					else
					{
						$('#confirmation_from_account').text(fromAccount);
						$('#confirmation_to_account').text(toAccount);
						$('#confirmation_amount').text(amount);
						$('#confirmation_remark').text(remark);
						
						$.ui.loadContent("#confirmation_transaction",false,false,"slide");
					}
								
				});
				
				$('#cancel_rtgs_transfer_detail').unbind('click').click(function (e) {
					$.ui.goBack();
				});
				
				$('#submit_cheque_request_detail').unbind('click').click(function () {
					
					var account_no= $('#cheque_book_request_account_no').val();
					var no_leaves= $('#cheque_book_request_no_leaves').val();
					
					if (account_no == "" || account_no == "Select Account No"){
						alert("Please select account number");
					}
					else if (no_leaves == "Select No Of Leaves"){
						alert("Please select number of leaves");
					}
					else{
						$("#selected_account_no").html(account_no);
						$("#selected_cheque_leaves").html(no_leaves);
						
						$.ui.loadContent("#confirmation_cheque_book_request",false,false,"slide");
					}
				});
				

				$('#submit_stop_cheque_request_detail').unbind('click').click(function () {
					
					var account_no= $('#stop_cheque_request_account_no').val();
					var cheque_ref_no= $('#cheque_ref_no').val();
					
					if (account_no == "" || account_no == "Select Account No"){
						alert("Please select account number");
					}
					else if (cheque_ref_no == ""){
						alert("Please enter cheque reference number");
					}
					else{
						$('#stop_cheque_request_selected_account_no').html(account_no);
						$('#stop_cheque_request_cheque_no').html(cheque_ref_no);	
						$.ui.loadContent("#confirmation_stop_cheque_request",false,false,"slide");
					}
				});
				
				$('#ok_cheque_book_request_btn').unbind('click').click(function () {
					$('#cheque_request_mpin').val('');
				});
				
				$('#ok_stop_cheque_request_btn').unbind('click').click(function () {
					$('#cheque_ref_no').val('');
					$('#stop_cheque_request_mpin').val('');
				});
				
				$('#ok_stop_cheque_request_btn').unbind('click').click(function () {
					$('#cheque_status_ref_no').val('');
				});
			
			
			$("#select_payee_name_third_party").change(function(){
				if ($(this).val() == "Select Payee")
			    {
					clearThirdPartyDetails();
					$("#payee_name_third_party").removeAttr("readOnly");
					$("#to_account_third_party").removeAttr("readOnly",true);
			      
			    }
			    else
			    { 
			    	
			    	var name="";
			    	name=$(this).val();
			    	name = name.split("_");
			    	$('#register_payee').prop('checked',false);
			    	$("#payee_name_third_party").attr("readOnly",true);
			    	$("#payee_name_third_party").val(name[1].replace(/^\s+|\s+$/g,''));
			    	$("#to_account_third_party").attr("readOnly",true);
			    	$("#to_account_third_party").val(name[0].replace(/^\s+|\s+$/g,''));
				    $("#register_label").text("Payee Is Registered");
				    $('#register_payee').attr("disabled","true");
			    }
			});
			
			$("#select_payee_name_neft").change(function(){
				if ($(this).val() == "Select Payee")
			    {
			      
				  $("#payee_name_neft").removeAttr("readOnly");
			      $("#to_account_neft").removeAttr("readOnly",true);
			      
			    }
			    else
			    { 
			    	
			    	var name="";
			    	name=$(this).val();
			    	name = name.split("_");
			    	$("#payee_name_neft").attr("readOnly",true);
			    	$("#payee_name_neft").val(name[1].replace(/^\s+|\s+$/g,''));
			    	$("#to_account_neft").attr("readOnly",true);
			    	$("#to_account_neft").val(name[0].replace(/^\s+|\s+$/g,''));
			    }
			});
			
			$("#select_payee_name_rtgs").change(function(){
				if ($(this).val() == "Select Payee")
			    {
			      clearRtgsDetails();
				  $("#payee_name_rtgs").removeAttr("readOnly");
			      $("#to_account_rtgs").removeAttr("readOnly",true);
			      
			    }
			    else
			    { 
			    	
			    	var name="";
			    	name=$(this).val();
			    	name = name.split("_");
			    	$("#payee_name_rtgs").attr("readOnly",true);
			    	$("#payee_name_rtgs").val(name[1].replace(/^\s+|\s+$/g,''));
			    	$("#to_account_rtgs").attr("readOnly",true);
			    	$("#to_account_rtgs").val(name[0].replace(/^\s+|\s+$/g,''));
			    }
			});
			
			$("#submit_third_party_transfer_detail").unbind('click').click(function (e) {
				
				var fromAccount = $('#from_account_third_party').val();
				var toAccount = $("#to_account_third_party").val().trim();
				var amount = $('#transaction_amount_third_party').val();
				var payeeName = $('#payee_name_third_party').val().trim();
				var len = $("#from_account_third_party")[0].length;
				var validAccountFlag=false;
				
				$('#fund_transfer_verification').html('Third Party Transfer Verification');
				$("#mpin").val("");
				
				for(var i=0;i<len;i++){
					if($("#from_account_third_party")[0][i].innerHTML.replace(/^\s+|\s+$/g,'') === toAccount){
						validAccountFlag=true;
						break;
					}
				}
				
				if(fromAccount == "" || fromAccount == "from_account_third_party" )
				{
					alert("Please select a source account number");
				}
				else if(payeeName == "" || !(/^[A-Za-z\d\s]+$/.test(payeeName)))
				{
					alert("Please enter valid Payee name");
					$("#payee_name_third_party").val("");
				}
				else if(toAccount == "" || fromAccount === toAccount || validAccountFlag === true || toAccount.match(/\d+/) != toAccount)
				{
					alert("Please enter a valid destination account number");
				}
				else if(toAccount.length < 9 || toAccount.length > 19)
				{
					$("#to_account_third_party").val("");
					alert("Account number should vary from 9 to 19");
				}
				else if(amount == "" || amount < 1)
				{
					alert("Transaction amount should be greater than 1");
				}
				else if(!(/(^[0-9]+$)|(^[0-9]+(.){1}([0-9]{1,2})$)/.test(amount)))
				{
					alert("Transaction amount should start and end with a digit and cannot contain more than 2 decimal places");
				}
				else if(amount > 50000)
				{
					alert("Transaction Amount cannot be more than 50000.");
				}
				else if(_isProd){

					showMask();
					var _url = "";
					console.log("Customer Account Inquiry for account number :- "+toAccount);
					_url = _serverBaseUrl+"BoiMobileBanking/customer/customerAccountInquiry.htm?callback=?"+ "&account-no="+toAccount;
					console.log("_url : " + _url);
					var errLog = "Unable To validate destination account :- "+toAccount;
					setUpOpts(_url, customerAccountInquiryCallback, errLog);
				}
				else
				{
					
					$('#confirmation_from_account').text(fromAccount);
					$('#confirmation_to_account').text(toAccount);
					$('#confirmation_amount').text(amount);

					document.getElementById("to_account_third_party").style.display='none';
					document.getElementById("transaction_amount_third_party").style.display='none';
					document.getElementById("payee_name_third_party").style.display='none';
			
					document.getElementById("to_account_third_party").style.display='inline-block';
					document.getElementById("transaction_amount_third_party").style.display='inline-block';
					document.getElementById("payee_name_third_party").style.display='inline-block';
					$.ui.loadContent("#confirmation_transaction",false,false,"slide");
				
				}
			});
			
			$('#cancel_third_party_transfer_detail').unbind('click').click(function (e) {
				$.ui.goBack();
			});
			
			
			// For Beneficiary List
			
			$("#neft_view_beneficiary_menu").unbind('click').click(function(){
				showMask();
				var neftBeneficiaryListHtml = cacheMap.get("neftBeneficiaryListHtml");
				if(neftBeneficiaryListHtml && neftBeneficiaryListHtml != null && neftBeneficiaryListHtml != ""){
					console.log("neftBeneficiaryListHtml already available");
					$.ui.loadContent("#neft_beneficiary_list", false, false, "slide");
					hideMask();
				} else {
					var _url = "";
					if(_isProd){
						_url = _serverBaseUrl+"BoiMobileBanking/beneficiary/beneficiary-neft.htm?callback=?&customer_id=" + $("#cust_id").val(); //for c24
					}else{
						_url = _serverBaseUrl+"BoiMobileBanking/beneficiary/beneficiary-neft.htm?callback=?&customer_id=" + $("#cust_id").val();
					}
					console.log("NEFT Beneficiary List not available. fetching latest data");
					console.log("_url : " + _url);
					var errLog = "NEFT Beneficiary : Unable to fetch beneficiary List";
					setUpOpts(_url, viewNeftBeneficiaryListCallBack, errLog);
				}
			});
			
			$("#rtgs_view_beneficiary_menu").unbind('click').click(function(){
				showMask();
				var rtgsBeneficiaryListHtml = cacheMap.get("beneficiaryListHtml");
				if(rtgsBeneficiaryListHtml && rtgsBeneficiaryListHtml != null && rtgsBeneficiaryListHtml != ""){
					console.log("RTGS Beneficiary list already available");
					$.ui.loadContent("#rtgs_beneficiary_list", false, false, "slide");
					hideMask();
				} else {
					var _url = "";
					if(_isProd){
						_url = _serverBaseUrl+"BoiMobileBanking/beneficiary/beneficiary-rtgs.htm?callback=?&customer_id=" + $("#cust_id").val(); //for c24
					}else{
						_url = _serverBaseUrl+"BoiMobileBanking/beneficiary/beneficiary-rtgs.htm?callback=?&customer_id=" + $("#cust_id").val();
					}
					console.log("RTGS Beneficiary List not available. fetching latest data");
					console.log("_url : " + _url);
					var errLog = "RTGS Beneficiary : Unable to fetch beneficiary List";
					setUpOpts(_url, viewRtgsBeneficiaryListCallBack, errLog);
				}
			});
			
			// NEFT Add BeneFiciary
			$('#neft_personel_detail_next_btn').unbind('click').click(function () {
				 
				var neftBeneficiaryName = $('#neft_beneficiary_name').val();
				var neftBeneficiaryAddress = $("#neft_beneficiary_address").val();
				var neftPinCode = $('#neft_beneficiary_pin_code').val().trim();
				var neftPhoneNo = $('#neft_beneficiary_phone_no').val().trim();
				
				if(neftBeneficiaryName == "")
				{
					alert("Please Enter Beneficiary Name");
				}	
				else if(neftBeneficiaryAddress == "")
				{
					alert("Please Enter Beneficiary Address");
				}
				else if(neftPinCode == "" || neftPinCode.match(/\d+/) == null || neftPinCode.match(/[a-zA-Z]/) != null)
				{
					alert("Please Enter Pin Code");
					$('#neft_beneficiary_pin_code').val("");
				}
				else if(neftPhoneNo == "" || neftPhoneNo.match(/\d+/) == null || neftPhoneNo.match(/[a-zA-Z]/) != null)
				{
					alert("Please Enter Phone");
					$('#neft_beneficiary_phone_no').val("");
				}
				else
				{
					showMask();
					var beneficiaryBankNameListHtml = cacheMap.get("beneficiaryBankNameListHtml");
					if(beneficiaryBankNameListHtml && beneficiaryBankNameListHtml != null && beneficiaryBankNameListHtml != ""){
						console.log("Beneficiary Bank Name list already available");
						$.ui.loadContent("#neft_add_bank_detail_page",false,false,"slide");
						hideMask();
					} else {
						var _url = "";
						_url = _serverBaseUrl+"BoiMobileBanking/beneficiary/bank-name.htm?callback=?";
						console.log("Beneficiary Bank Name List not available. fetching latest data");
						console.log("_url : " + _url);
						var errLog = "NEFT Beneficiary Bank Name: Unable to fetch Bank Name";
						setUpOpts(_url, viewBankNameListCallBack, errLog);
					}
				}
							
			});
			
			$("#neft_select_bank_name").change(function(){
				if ($(this).val() == "Select Bank Name")
			    {
					$("#neft_beneficiary_state").attr("disabled", "disabled");
					$("#neft_beneficiary_city").attr("disabled","disabled");
					$("#neft_select_branch_name").attr("disabled","disabled");
					$('#neft_beneficiary_ifsc_code').val('');
			    }
			    else
			    { 
			    	
			    	showMask();
			    	var bankName = $(this).val();
			    	$("#neft_beneficiary_state").removeAttr("disabled", "disabled");
			    	
					var _url = "";
					_url = _serverBaseUrl+"BoiMobileBanking/beneficiary/bank-wise-state-list.htm?callback=?&bank_name=" + $(this).val();
					console.log("_url : " + _url);
					var errLog = "NEFT Add Beneficiary : Unable to fetch State Name";
					setUpOpts(_url, viewStateNameCallBack, errLog);
			    	
			    }
			});
			
			$("#neft_beneficiary_state").change(function(){
				if ($(this).val() == "Select State")
			    {
					$("#neft_beneficiary_city").attr("disabled","disabled");
					$("#neft_select_branch_name").attr("disabled","disabled");
					$('#neft_beneficiary_ifsc_code').val('');
			    }
			    else
			    { 
			    	showMask();

			    	var bankName = $("#neft_select_bank_name").val();
			    	var stateName = $(this).val();

			    	$("#neft_beneficiary_city").removeAttr("disabled", "disabled");
			    	
					var _url = "";
					_url = _serverBaseUrl+"BoiMobileBanking/beneficiary/state-wise-city-list.htm?callback=?&bank_name=" + bankName + "&state_name=" + stateName;
					console.log("_url : " + _url);
					var errLog = "NEFT Add Beneficiary : Unable to fetch City Name";
					setUpOpts(_url, viewCityListCallBack, errLog);
			    	
			    }
			});
			
			$("#neft_beneficiary_city").change(function(){
				if ($(this).val() == "Select City")
			    {
					$("#neft_select_branch_name").attr("disabled","disabled");
					$('#neft_beneficiary_ifsc_code').val('');
			    }
			    else
			    { 
			    	showMask();

			    	var bankName = $("#neft_select_bank_name").val();
			    	var stateName = $("#neft_beneficiary_state").val();
			    	var cityName = $(this).val();
			    	
					var _url = "";
					_url = _serverBaseUrl+"BoiMobileBanking/beneficiary/city-wise-branch-list.htm?callback=?&bank_name=" + bankName + "&state_name=" + stateName + "&city_name=" + cityName;
					console.log("_url : " + _url);
					var errLog = "NEFT Add Beneficiary : Unable to fetch City Name";
					setUpOpts(_url, viewBranchListCallBack, errLog);
			    	
			    }
			});
			
			$("#neft_select_branch_name").change(function(){
				if ($(this).val() == "Select Branch Name")
			    {
					$('#neft_beneficiary_ifsc_code').val('');
			    }
			    else
			    { 
			    	showMask();

			    	var bankName = $("#neft_select_bank_name").val();
			    	var stateName = $("#neft_beneficiary_state").val();
			    	var cityName = $("#neft_beneficiary_city").val();
			    	var branchName = $(this).val();
			    	
					var _url = "";
					_url = _serverBaseUrl+"BoiMobileBanking/beneficiary/ifsc-code.htm?callback=?&bank_name=" + bankName + "&state_name=" + stateName + "&city_name=" + cityName + "&branch_name=" + branchName;
					console.log("_url : " + _url);
					var errLog = "NEFT Add Beneficiary : Unable to fetch City Name";
					setUpOpts(_url, viewIfscCodeCallBack, errLog);
			    	
			    }
			});
			
			$('#neft_add_bank_detail_submit_btn').unbind('click').click(function () {
				 
				var neftBeneficiaryAccountNo = $('#neft_beneficiary_account_no').val();
				var neftReEnterAccountNo = $("#neft_beneficiary_re_enter_account_no").val();
				var neftBankName = $('#neft_select_bank_name').val().trim();
				var neftState = $('#neft_beneficiary_state').val().trim();
				var neftCity = $('#neft_beneficiary_city').val().trim();
				var neftBranchName = $('#neft_select_branch_name').val().trim();
				var neftIfscCode = $('#neft_beneficiary_ifsc_code').val().trim();

				if(neftBeneficiaryAccountNo == "" || neftBeneficiaryAccountNo.match(/\d+/) == null || neftBeneficiaryAccountNo.match(/[a-zA-Z]/) != null)
				{
					alert("Please Enter Proper AccountNo");
					$('#neft_beneficiary_account_no').val("");
				}	
				else if(neftReEnterAccountNo != neftBeneficiaryAccountNo)
				{
					alert("Re-Enter Account No. Not Matched");
					$('#neft_beneficiary_re_enter_account_no').val("");
				}
				else if(neftBankName == "Select Bank Name")
				{
					alert("Please Select Bank Name");
				}
				else if(neftState == "Select State")
				{
					alert("Please Select State");
				}
				else if(neftCity == "Select City")
				{
					alert("Please Select City");
				}
				else if(neftBranchName == "Select Branch Name")
				{
					alert("Please Select Branch Name");
				}
				else
				{
					$('#confirmation_beneficiary_name').text($('#neft_beneficiary_name').val());
					$('#confirmation_beneficiary_mobile_no').text($('#neft_beneficiary_phone_no').val());
					$('#confirmation_beneficiary_account_no').text(""+neftBeneficiaryAccountNo);
					$("#confirmation_beneficiary_bank_name").text(neftBankName);
					$('#confirmation_beneficiary_branch_name').text(neftBranchName);
					$('#confirmation_ifsc_code').text(neftIfscCode);
					$('#add_beneficiary_mpin').val("");
					
					confirmFundTransferPage = "NEFT_ADD_BENEFICIARY";
					$.ui.loadContent("#confirmation_add_beneficiary_page",false,false,"slide");
				}
							
			});
			
			// RTGS Add Beneficiary 
			$('#rtgs_personel_detail_next_btn').unbind('click').click(function () {
				 
				var rtgsBeneficiaryName = $('#rtgs_beneficiary_name').val();
				var rtgsBeneficiaryAddress = $("#rtgs_beneficiary_address").val();
				var rtgsPinCode = $('#rtgs_beneficiary_pin_code').val().trim();
				var rtgsPhoneNo = $('#rtgs_beneficiary_phone_no').val().trim();
				
				if(rtgsBeneficiaryName == "")
				{
					alert("Please Enter Beneficiary Name");
				}	
				else if(rtgsBeneficiaryAddress == "")
				{
					alert("Please Enter Beneficiary Address");
				}
				else if(rtgsPinCode == "" || rtgsPinCode.match(/\d+/) == null || rtgsPinCode.match(/[a-zA-Z]/) != null)
				{
					alert("Please Enter Pin Code");
					$('#rtgs_beneficiary_pin_code').val("");
				}
				else if(rtgsPhoneNo == "" || rtgsPhoneNo.match(/\d+/) == null || rtgsPhoneNo.match(/[a-zA-Z]/) != null)
				{
					alert("Please Enter Phone");
					$('#rtgs_beneficiary_phone_no').val("");
				}
				else
				{
					showMask();
					var beneficiaryBankNameListHtml = cacheMap.get("beneficiaryBankNameListHtml");
					if(beneficiaryBankNameListHtml && beneficiaryBankNameListHtml != null && beneficiaryBankNameListHtml != ""){
						console.log("Beneficiary Bank Name list already available");
						$.ui.loadContent("#rtgs_add_bank_detail_page",false,false,"slide");
						hideMask();
					} else {
						var _url = "";
						_url = _serverBaseUrl+"BoiMobileBanking/beneficiary/bank-name.htm?callback=?";
						console.log("Beneficiary Bank Name List not available. fetching latest data");
						console.log("_url : " + _url);
						var errLog = "RTGS Beneficiary Bank Name: Unable to fetch Bank Name";
						setUpOpts(_url, viewBankNameListCallBack, errLog);
					}
				}
							
			});
			
			$("#rtgs_select_bank_name").change(function(){
				if ($(this).val() == "Select Bank Name")
			    {
					$("#rtgs_beneficiary_state").attr("disabled", "disabled");
					$("#rtgs_beneficiary_city").attr("disabled","disabled");
					$("#rtgs_select_branch_name").attr("disabled","disabled");
					$('#rtgs_beneficiary_ifsc_code').val('');
			    }
			    else
			    { 
			    	
			    	showMask();
			    	var bankName = $(this).val();
			    	$("#rtgs_beneficiary_state").removeAttr("disabled", "disabled");
			    	
					var _url = "";
					_url = _serverBaseUrl+"BoiMobileBanking/beneficiary/bank-wise-state-list.htm?callback=?&bank_name=" + $(this).val();
					console.log("_url : " + _url);
					var errLog = "RTGS Add Beneficiary : Unable to fetch State Name";
					setUpOpts(_url, viewStateNameCallBack, errLog);
			    	
			    }
			});
			
			$("#rtgs_beneficiary_state").change(function(){
				if ($(this).val() == "Select State")
			    {
					$("#rtgs_beneficiary_city").attr("disabled","disabled");
					$("#rtgs_select_branch_name").attr("disabled","disabled");
					$('#rtgs_beneficiary_ifsc_code').val('');
			    }
			    else
			    { 
			    	showMask();

			    	var bankName = $("#rtgs_select_bank_name").val();
			    	var stateName = $(this).val();

			    	$("#rtgs_beneficiary_city").removeAttr("disabled", "disabled");
			    	
					var _url = "";
					_url = _serverBaseUrl+"BoiMobileBanking/beneficiary/state-wise-city-list.htm?callback=?&bank_name=" + bankName + "&state_name=" + stateName;
					console.log("_url : " + _url);
					var errLog = "RTGS Add Beneficiary : Unable to fetch City Name";
					setUpOpts(_url, viewCityListCallBack, errLog);
			    	
			    }
			});
			
			$("#rtgs_beneficiary_city").change(function(){
				if ($(this).val() == "Select City")
			    {
					$("#rtgs_select_branch_name").attr("disabled","disabled");
					$('#rtgs_beneficiary_ifsc_code').val('');
			    }
			    else
			    { 
			    	showMask();

			    	var bankName = $("#rtgs_select_bank_name").val();
			    	var stateName = $("#rtgs_beneficiary_state").val();
			    	var cityName = $(this).val();
			    	
					var _url = "";
					_url = _serverBaseUrl+"BoiMobileBanking/beneficiary/city-wise-branch-list.htm?callback=?&bank_name=" + bankName + "&state_name=" + stateName + "&city_name=" + cityName;
					console.log("_url : " + _url);
					var errLog = "RTGS Add Beneficiary : Unable to fetch City Name";
					setUpOpts(_url, viewBranchListCallBack, errLog);
			    	
			    }
			});
			
			$("#rtgs_select_branch_name").change(function(){
				if ($(this).val() == "Select Branch Name")
			    {
					$('#rtgs_beneficiary_ifsc_code').val('');
			    }
			    else
			    { 
			    	showMask();

			    	var bankName = $("#rtgs_select_bank_name").val();
			    	var stateName = $("#rtgs_beneficiary_state").val();
			    	var cityName = $("#rtgs_beneficiary_city").val();
			    	var branchName = $(this).val();
			    	
					var _url = "";
					_url = _serverBaseUrl+"BoiMobileBanking/beneficiary/ifsc-code.htm?callback=?&bank_name=" + bankName + "&state_name=" + stateName + "&city_name=" + cityName + "&branch_name=" + branchName;
					console.log("_url : " + _url);
					var errLog = "RTGS Add Beneficiary : Unable to fetch City Name";
					setUpOpts(_url, viewIfscCodeCallBack, errLog);
			    	
			    }
			});
			
			$('#submit_rtgs_beneficiary_bank_detail').unbind('click').click(function () {
				 
				var rtgsBeneficiaryAccountNo = $('#rtgs_beneficiary_account_no').val();
				var rtgsReEnterAccountNo = $("#rtgs_beneficiary_re_enter_account_no").val();
				var rtgsBankName = $('#rtgs_select_bank_name').val().trim();
				var rtgsState = $('#rtgs_beneficiary_state').val().trim();
				var rtgsCity = $('#rtgs_beneficiary_city').val().trim();
				var rtgsBranchName = $('#rtgs_select_branch_name').val().trim();
				var rtgsIfscCode = $('#rtgs_beneficiary_ifsc_code').val().trim();
				
				if(rtgsBeneficiaryAccountNo == "" || rtgsBeneficiaryAccountNo.match(/\d+/) == null || rtgsBeneficiaryAccountNo.match(/[a-zA-Z]/) != null)
				{
					alert("Please Enter Proper AccountNo");
					$('#rtgs_beneficiary_account_no').val("");
				}	
				else if(rtgsReEnterAccountNo != rtgsBeneficiaryAccountNo)
				{
					alert("Re-Enter Account No. Not Matched");
					$('#rtgs_beneficiary_re_enter_account_no').val("");
				}
				else if(rtgsBankName == "Select Bank Name")
				{
					alert("Please Select Bank Name");
				}
				else if(rtgsState == "Select State")
				{
					alert("Please Select State");
				}
				else if(rtgsCity == "Select City")
				{
					alert("Please Select City");
				}
				else if(rtgsBranchName == "Select Branch Name")
				{
					alert("Please Select Branch Name");
				}
				else
				{
					$('#confirmation_beneficiary_name').text($('#rtgs_beneficiary_name').val());
					$('#confirmation_beneficiary_mobile_no').text($('#rtgs_beneficiary_phone_no').val());
					$('#confirmation_beneficiary_account_no').text(rtgsBeneficiaryAccountNo);
					$("#confirmation_beneficiary_bank_name").text(rtgsBankName);
					$('#confirmation_beneficiary_branch_name').text(rtgsBranchName);
					$('#confirmation_ifsc_code').text(rtgsIfscCode);
					$('#add_beneficiary_mpin').val("");
					
					confirmFundTransferPage = "RTGS_ADD_BENEFICIARY";
					
					$.ui.loadContent("#confirmation_add_beneficiary_page",false,false,"slide");
				}
							
			});
			
			
			$('#to_account_third_party').on('focus', function(){
                if(getAndroidVersion() > 2.3 && getAndroidVersion() < 4.2)
                    this.type = 'number';
            });
            
            $('#to_account_third_party').on('blur', function(){
                if(getAndroidVersion() > 2.3 && getAndroidVersion() < 4.2)
                    this.type = 'text';
            });
            
            $('#transaction_amount').on('focus', function(){
            	
                if(getAndroidVersion() > 2.3 && getAndroidVersion() < 4.2) {
                	this.type = 'number';
                }
            });
            
            $('#transaction_amount').on('blur', function() {
                if(getAndroidVersion() > 2.3 && getAndroidVersion() < 4.2) {
                    this.type = 'text';
                }
            });
            
            $('#transaction_amount_third_party').on('focus', function(){
            	
                if(getAndroidVersion() > 2.3 && getAndroidVersion() < 4.2) {
                	this.type = 'number';
                }
            });
            
            $('#transaction_amount_third_party').on('blur', function() {
                if(getAndroidVersion() > 2.3 && getAndroidVersion() < 4.2) {
                    this.type = 'text';
                }
            });
            
            $('#transaction_amount_neft').on('focus', function(){
            	
                if(getAndroidVersion() > 2.3 && getAndroidVersion() < 4.2) {
                	this.type = 'number';
                }
            });
            
            $('#transaction_amount_neft').on('blur', function() {
                if(getAndroidVersion() > 2.3 && getAndroidVersion() < 4.2) {
                    this.type = 'text';
                }
            });
            
            $('#imt_sender_code').on('focus', function(){
                if(getAndroidVersion() > 2.3) {
                	this.type = 'number';
                }
            });
            
            $('#imt_sender_code').on('blur', function() {
                if(getAndroidVersion() > 2.3) {
                    this.type = 'text';
                }
            });
            
            $('#transaction_amount_imt').on('focus', function(){
                if(getAndroidVersion() > 2.3) {
                	this.type = 'number';
                }
            });
            
            $('#transaction_amount_imt').on('blur', function() {
                if(getAndroidVersion() > 2.3) {
                    this.type = 'text';
                }
            });
            
            $('#imt_mobile_number').on('focus', function(){
                if(getAndroidVersion() > 2.3 && getAndroidVersion() < 4.2) {
                	this.type = 'number';
                }
            });
            
            $('#imt_mobile_number').on('blur', function() {
                if(getAndroidVersion() > 2.3 && getAndroidVersion() < 4.2) {
                    this.type = 'text';
                }
            });
            
            $('#imt_transfer_status_amount').on('focus', function(){
                if(getAndroidVersion() > 2.3 && getAndroidVersion() < 4.2) {
                	this.type = 'number';
                }
            });
            
            $('#imt_transfer_status_amount').on('blur', function() {
                if(getAndroidVersion() > 2.3 && getAndroidVersion() < 4.2) {
                    this.type = 'text';
                }
            });
            
            $('#imt_status_bfry_mobile_number').on('focus', function(){
                if(getAndroidVersion() > 2.3 && getAndroidVersion() < 4.2) {
                	this.type = 'number';
                }
            });
            
            $('#imt_status_bfry_mobile_number').on('blur', function() {
                if(getAndroidVersion() > 2.3 && getAndroidVersion() < 4.2) {
                    this.type = 'text';
                }
            });
            
			$("#confirm_beneficiary_detail_btn").unbind('click').click(function(){
				var mPin = $('#add_beneficiary_mpin').val();
				if( mPin.trim() == "")
				{
					alert("Please Enter m-pin");
				}
				else
			    {
					showMask();
					
					var _url = "";
					
					if(confirmFundTransferPage == "RTGS_ADD_BENEFICIARY")
						_url = _serverBaseUrl+"BoiMobileBanking/beneficiary/add-rtgs-beneficiary-details.htm?callback=?" +
								"&customer_id=" + $("#cust_id").val() + "&beneficiary_name=" + $('#rtgs_beneficiary_name').val() +
								"&beneficiary_nick_name=" + $('#rtgs_beneficiary_name').val() + "&beneficiary_address=" + $("#rtgs_beneficiary_address").val() +
								"&beneficiary_city=" + $("#rtgs_beneficiary_city").val() + "&beneficiary_state=" + $("#rtgs_beneficiary_state").val() +
								"&beneficiary_country="+ $("#rtgs_beneficiary_country").val() + "&beneficiary_pin_code=" + $("#rtgs_beneficiary_pin_code").val() +
								"&beneficiary_phone_no="+ $("#rtgs_beneficiary_phone_no").val() + "&beneficiary_account_type=" + $("#rtgs_beneficiary_account_type").val() +
								"&beneficiary_account_no="+ $("#rtgs_beneficiary_account_no").val() + "&beneficiary_ifsc_code=" + $("#rtgs_beneficiary_ifsc_code").val() +
								"&bank_name="+ $("#rtgs_select_bank_name").val() + "&branch_name=" + $("#rtgs_select_branch_name").val() +
								"&beneficiary_type=RTGS";
					
					if(confirmFundTransferPage == "NEFT_ADD_BENEFICIARY")
						_url = _serverBaseUrl+"BoiMobileBanking/beneficiary/add-neft-beneficiary-details.htm?callback=?" +
								"&customer_id=" + $("#cust_id").val() + "&beneficiary_name=" + $('#neft_beneficiary_name').val() +
								"&beneficiary_nick_name=" + $('#neft_beneficiary_name').val() + "&beneficiary_address=" + $("#neft_beneficiary_address").val() +
								"&beneficiary_city=" + $("#neft_beneficiary_city").val() + "&beneficiary_state=" + $("#neft_beneficiary_state").val() +
								"&beneficiary_country="+ $("#neft_beneficiary_country").val() + "&beneficiary_pin_code=" + $("#neft_beneficiary_pin_code").val() +
								"&beneficiary_phone_no="+ $("#neft_beneficiary_phone_no").val() + "&beneficiary_account_type=" + $("#neft_beneficiary_account_type").val() +
								"&beneficiary_account_no="+ $("#neft_beneficiary_account_no").val() + "&beneficiary_ifsc_code=" + $("#neft_beneficiary_ifsc_code").val() +
								"&bank_name="+ $("#neft_select_bank_name").val() + "&branch_name=" + $("#neft_select_branch_name").val() +
								"&beneficiary_type=NEFT";	
	
					console.log("_url : " + _url);
					var errLog = "NEFT Add Beneficiary : Error In saving data";
					setUpOpts(_url, successAddBeneificaryCallBack, errLog);
			    }
			});
			
			$("#fund_transfer_anchor").unbind('click').click(function(){
				showMask();
				var url = _serverBaseUrl+"BoiMobileBanking/customer/check-txn-pwd-status.htm?callback=?&user_id=" + _userId;
				setUpOpts(url, checkTxnPwdStatusCallback, "Failed to fetch the Transaction Password Status");
			});
			
			$("#sync-account-button").unbind('click').click(function(){
				showMask();
				var _url = _serverBaseUrl + "BoiMobileBanking/customer.htm?callback=?&user_id=" + _userId + "&isAccountInfoReSyncRequested=true";
				console.log("Account sync url: "+_url);
				setUpOpts(_url, syncAccountCallback, "Failed to sync accounts");
			});
			
			$("#sync-beneficiary-button").unbind('click').click(function(){
				showMask();
				var _url = _serverBaseUrl+"BoiMobileBanking/beneficiary/neft-beneficiaries.htm?callback=?&user_id=" + _userId + "&isBeneficiaryInfoReSyncRequested=true";
				setUpOpts(_url, syncBeneficiaryCallBack, "Failed to sync beneficiaries");
			});
			
			$("#imtFundTransfer").unbind('click').click(function(){
				showMask();
				$.ui.loadContent("#IMT_menu", false, false, "slide");
				hideMask();
			});
			
			$("#imt_transfer_fund").unbind('click').click(function(){
				showMask();
				var _url = _serverBaseUrl +"BoiMobileBanking/beneficiary/imt/get-imt-beneficiary.htm?callback=?&userId="+_userId;
				console.log("Fetch imt beneficiary \n"+ _url);
				setUpOpts(_url, getBeneficiaryCallBack, "Failed to get beneficiaries");
				hideMask();
			});
			
			// Check Status
			$("#imt_check_status").unbind('click').click(function(){
				clearImtCheckStatus();
				showMask();
				$("#imt_status_account_no").html("<option value='-1' selected=\"selected\"> Source Account (Mandatory)</option>");
				var html = "<option value='-1' selected=\"selected\"> Source Customer ID (Mandatory) </option>";
				
				var allCustID = uniqueBy(allAccounts, function(x){return x.custId;});
				for(singleRecord in allCustID) {
					
					html += "<option value='"+ allCustID[singleRecord] +"'>"+ allCustID[singleRecord]+"</option>";
				}
				
				$("#imt_status_customer_id").html(html);
				
				$.ui.loadContent("#imt_transaction_status_page", false, false, "slide");
				hideMask();
			});
			
			//construct imt account drop down
			$("#imt_status_customer_id").change(function(){
				
				imtAccountNos = "";
				imtAccountType = "";
				var selectedCustID = $("#imt_status_customer_id").val();
				
				if(selectedCustID =='-1') {
					$("#imt_status_account_no").html("<option value='-1' selected=\"selected\"> Source Account (Mandatory)</option>");
				} else {
					
					for(singleRecord in allAccounts) {
						
						if(selectedCustID == allAccounts[singleRecord].custId) {
							
							imtAccountNos += account_nos + allAccounts[singleRecord].accNumber + "&";
							imtAccountType += allAccounts[singleRecord].accType + '&';
						}
					}
					
					imtAccountNos = imtAccountNos.substr(0, imtAccountNos.length -1 );
					imtAccountType = imtAccountType.substr(0, imtAccountType.length - 1);
					var accountNumbersList = getFromAccounts("neft",  imtAccountNos, imtAccountType);
					var accounts  = accountNumbersList.replace(/account_nos=/g,"").split("&");
					console.log("Account List for IMT transfer status: " + accounts);

					var html = "<option value='-1' selected=\"selected\"> Source Account </option>";

					for(var i=0; i<accounts.length; i++) { 
						if( accounts[i] != null && accounts[i] != "" && accounts[i] != undefined)
							html += "<option value='"+ accounts[i] +"'>"+ accounts[i]+"</option>";
					}
					
					$("#imt_status_account_no").html(html);
				}
			});
			
			$('#cancel_imt_transfer_detail').unbind('click').click(function (e) {
		    	$.ui.goBack();
			});
			
			$('#cancel_transfer_status_list_page').unbind('click').click(function (e) {
		    	$.ui.goBack();
			});
			
			$("#imt_manage_beneficiaries").unbind('click').click(function(){
				showMask();
				var _url = _serverBaseUrl +"BoiMobileBanking/beneficiary/imt/get-imt-beneficiary.htm?callback=?&userId="+_userId;
				setUpOpts(_url, getIMTBeneficiariesCallBack, "Failed to get beneficiaries");
			});
			
			$("#add_beneficiary").unbind('click').click(function(){
				showMask();
				clearIMTAddBeneficiaryPage();
				$.ui.loadContent("#imt_add_beneficiary_page", false, false, "slide");
				hideMask();
			});
			
			$('#cancel_imt_add_beneficiary').unbind('click').click(function (e) {
		    	$.ui.goBack();
			});
			
			$('#edit_imt_add_beneficiary_btn').unbind('click').click(function (e) {
		    	$.ui.goBack();
			});
			
			$('#submit_imt_add_beneficiary').unbind('click').click(function (e) {
				showMask();
				var beneficiaryName = $("#imt_beneficiary_name").val().trim();
				var beneficiaryMobileNumber = $("#imt_beneficiary_mobile_number").val().trim();
				var beneficiaryAddress = $("#imt_beneficiary_address").val().trim();
				var beneficiaryPinCode = $("#imt_beneficiary_pin_code").val().trim();
				var beneficiaryNickName = $("#imt_beneficiary_nick_name").val().trim();
				var senderMobileNumber = $("#imt_sender_mobile_number").val().trim();
				var branchName = $("#imt_beneficiary_branch_name").val().trim();
				$("#mpin_imt_add_beneficiary").val("");
				
				//validations for the add beneficiary page.
				if(beneficiaryName == null || beneficiaryName == "") {
					alert("Beneficiary name is a mandatory field.");
				}
				else if(!/^[A-Za-z0-9 ]{1,45}$/.test(beneficiaryName)) {
					alert("Please enter an appropriate Beneficiary name.");
				}
				else if(beneficiaryMobileNumber == null || beneficiaryMobileNumber == "") {
					alert("Beneficiary mobile number is a mandatory field.");
				}
				else if(beneficiaryMobileNumber.length>12 || beneficiaryMobileNumber.length<10 ) {
					alert("Beneficiary mobile number should be of 10 to 12 digit.");
				}
				else if(beneficiaryAddress == null || beneficiaryAddress == "") {
					alert("Beneficiary Address is mandatory field.");
				}
				else if(beneficiaryPinCode == null || beneficiaryPinCode == "") {
					alert("Beneficiary Pin code is a mandatory field.");
				}
				else if(senderMobileNumber == null || senderMobileNumber == "") {
					alert("Sender Mobile Number is a mandatory field.");
				}
				else if(senderMobileNumber.length>12 || senderMobileNumber.length<10 ) {
					alert("Sender Mobile Number should be of 10 to 12 digit.");
				}
				else if(branchName == null || branchName == "") {
					alert("Please Enter Branch Name");
				}
				else {
					$("#confirmation_imt_add_beneficiary_name").text(beneficiaryName);
					$("#confirmation_imt_add_beneficiary_mobile_number").text(beneficiaryMobileNumber);
					$("#confirmation_imt_add_beneficiary_address").text(beneficiaryAddress);
					$("#confirmation_imt_add_beneficiary_pin_code").text(beneficiaryPinCode);
					$("#confirmation_imt_add_beneficiary_nick_name").text(beneficiaryNickName);
					$("#confirmation_imt_add_sender_mobile_number").text(senderMobileNumber);
					$("#confirmation_imt_add_branch_name").text(branchName);
					
					$.ui.loadContent("#confirmation_add_beneficiary", false, false, "slide");
				}
				
				hideMask();
			});
			
			$("#confirm_add_imt_beneficiary_btn").unbind('click').click(function(){
				var mPin = $('#mpin_imt_add_beneficiary').val().trim();
				if( mPin == "")
				{
					alert("Please Enter Transaction Password");
				}
				else
			    {
					showMask();
					var _url = _serverBaseUrl+"BoiMobileBanking/customer/validate-txn-pwd.htm?callback=?&user_id=" + encodeURIComponent(_userId) + "&txn_pwd=" + encodeURIComponent(mPin);
					setUpOpts(_url, txnPwdValidationForIMTAddBeneficiaryCallback, "Failed to validate Transaction Password.");
			    }
			});
			
			$('#cancel_imt_transfer_status').unbind('click').click(function (e) {
		    	$.ui.goBack();
			});
			
			// Submit imt transfer status filter 
			$('#submit_imt_transfer_status').unbind('click').click(function (e) {
				checkStatusToggle = "";
				var selectedCustID = $("#imt_status_customer_id").val();
				var imt_status_account_no= $("#imt_status_account_no").val();
				var imt_status_bfry_mobile_number = $("#imt_status_bfry_mobile_number").val();
				var imt_transfer_status_amount = $("#imt_transfer_status_amount").val();
				
				if(selectedCustID =='-1') {
					alert("Please Select Customer ID");
				} else if(imt_status_account_no == '-1') {
					alert("Please Select Account Number");
				} else if(imt_status_bfry_mobile_number.length>12) {
					alert("Please enter valid phone number.");
				} else if(imt_status_bfry_mobile_number.length<0) {
					alert("Please enter valid phone number.");
				} else {
					
					showMask();
					if(imt_status_account_no=="-1" || imt_status_account_no=="" || imt_status_account_no=="Source Account" ) {
						imt_status_account_no='';
					}
					var _url = _serverBaseUrl+"BoiMobileBanking/fundtransfer/imt-transactionlist.htm?callback=?&customerId=" + encodeURIComponent(selectedCustID) + 
					   "&accountId=" + encodeURIComponent(imt_status_account_no) + "&beneficiaryMobileNumber=" + encodeURIComponent(imt_status_bfry_mobile_number) +
					   "&transactionAmount=" + encodeURIComponent(imt_transfer_status_amount);
					imtTransactionList = "";
					setUpOpts(_url, getImtTransactionListCallBack, "Failed to fetch transaction list.");
				}
			});
			
			$("#imt_sync_beneficiaries").unbind('click').click(function() {
				var _url = _serverBaseUrl+"BoiMobileBanking/beneficiary/imt/sync-beneficiaries.htm?callback=?&userId=" + _userId 
				+ "&senderMobNumber=" + _senderMobileNumber;
				showMask();
				setUpOpts(_url, syncIMTBeneficiariesCallback, "Failed to sync beneficiaries.");
			});
			
		  }
		}

		function bindToggleClickEvent() {
			
			$('.toggle_status_div').click(function(){

				showMask();
				var id = $(this).attr("id");
				var loc = id.replace("transaction","");

				if($("#" + id).find(".first").is(".first")) {
					if($("#"+id +" .transfer_list_detail_toggel").hasClass("hide-option"))
						$("#" + id + " .transfer_list_detail_toggel").removeClass("hide-option");
					else
						$("#" + id + " .transfer_list_detail_toggel").addClass("hide-option");
				}
				else {
					console.log("Check Status call parameters : " + "Emitter ticket =" + imtTransactionList[loc].emitterTicket + "Trace number =" + imtTransactionList[loc].bankTransactionId
							+ "Customer account number=" + imtTransactionList[loc].accountId);
					var _url = _serverBaseUrl+"BoiMobileBanking/fundtransfer/imtCheckStatus.htm?callback=?&emitterTicket=" + encodeURIComponent(imtTransactionList[loc].emitterTicket) + 
					   "&initiatorAccount=" + encodeURIComponent(imtTransactionList[loc].accountId) + "&bankTransactionId=" + encodeURIComponent(imtTransactionList[loc].bankTransactionId);
					console.log("Location :" + loc);
					setUpOpts(_url, imtCheckStatusCallBack, "Failed to fetch IMT transaction status", loc);
				}
				hideMask();
			});
		}
		
		function cancelImt() {
			
			$('#edit_imt_transfer').unbind('click').click(function (e) {
		    	$.ui.goBack();
			});
			
			$('.cancel_imt_transaction').unbind('click').click(function(e){
				var id = $(this).attr("id");
				var loc = id.replace("cancel_imt","");
				var expiryDate = $("#transaction" +loc+ " #expiry_date").text().replace("Exp Date :","").trim();
				
				$("#confirmation_beneficiary_mobile").text(imtTransactionList[loc].beneficiaryMobileNumber);
				$("#confirmation_account_number").text(imtTransactionList[loc].accountId);
				$("#confirmation_txn_amount").text(imtTransactionList[loc].transactionAmount);
				$("#confirmation_transaction_date").text(imtTransactionList[loc].transactionDateTime);
				$("#confirmation_emitter_ticket").text(imtTransactionList[loc].emitterTicket);
				$("#confirmation_transaction_expiry_date").text(expiryDate.toString());
				$("#confirmation_trace_number").text(imtTransactionList[loc].bankTransactionId);
				$("#list_location").text("#transaction"+loc);
				$.ui.loadContent("#imt_transaction_cancellation", false, false, "slide");
			});
			
			$("#confirm_imt_transfer").unbind("click").click(function(){
				var mPin = $('#mpin_cancel_imt').val().trim();
				if( mPin == "")
				{
					alert("Please Enter Transaction Password");
				}
				else
			    {
					showMask();
					var _url = _serverBaseUrl+"BoiMobileBanking/customer/validate-txn-pwd.htm?callback=?&user_id=" + encodeURIComponent(_userId) + "&txn_pwd=" + encodeURIComponent(mPin);
					setUpOpts(_url, txnPwdValidationForCancelIMTCallback, "Failed to validate Transaction Password.");
			    }
			});
		}
		
		function showMiniStatement(accountNo){
			showMask();
			var transactionsHtml = cacheMap.get("transactionsHtml_" + accountNo);
			if(transactionsHtml && transactionsHtml != null && transactionsHtml != ""){
				console.log("transactionsHtml already available");
				$("#transactions").html(transactionsHtml);
				$.ui.loadContent("#mini_statement", false, false, "slide");
				hideMask();
			} else {
				var _url = "";
				if(_isProd){
					_url = _serverBaseUrl+"BoiMobileBanking/customer/transactions.htm?callback=?&account_no=" + accountNo; //for C24
				}else{
					_url = _serverBaseUrl+"BoiMobileBanking/customer/transactionsFromLocal.htm?callback=?&account_no=" + accountNo;
				}
				
				console.log("_url : " + _url);
				var errLog = "Mini Statement : Failed to fetch mini statement";
				setUpOpts(_url, showMiniStatementCallBack, errLog, accountNo);
			}
		}
		
		function setUpSelfFundsTransferDropdowns() {
			$("#from_account").change(function () {
				 
				fromAccountList = [];
				var fromAccount = $('#from_account').val();
				var accType = getTypeOfAccountByAccNumber(allAccounts, fromAccount);
				var creditAccountsList = getToAccounts("self-link", allAccounts, accType, fromAccount);
				
				if(fromAccount != "" && fromAccount != "Source Account") {
					
					$("#to_account").removeAttr("disabled");
					var html = "<option value='-1' selected='selected'>Destination Account</option>";
					for(var i=0; i<creditAccountsList.length; i++) { 
						html += "<option value="+ creditAccountsList[i]+">"+ creditAccountsList[i]+"</option>";
					}
					$("#to_account").html(html);
					creditAccountsList = [];
				}
			});
			
			$('#to_account').change(function(){
				
				if($('#to_account').val() != "")
				{
					$('#transaction_amount').removeAttr("disabled");
				}
			});
			
			$('#submit_transfer_detail').unbind('click').click(function (e) {
				
				$('#fund_transfer_verification').html('Self/Linked Transfer Verification');
				$('#submit_transfer_detail').trigger("blur");
				$('#submit_transfer_detail').trigger('focus');
				var fromAccount = $('#from_account').val();
				var toAccount = $("#to_account").val();
				var amount = $('#transaction_amount').val();
				//var remark = $('#transaction_remark').val();
				
				$("#mpin").val("");
				if(fromAccount == "" || fromAccount == "-1" || !(/[0-9]+/.test(fromAccount)))
				{
					alert("Please select a source account number");
				}	
				else if(toAccount == "" || toAccount == "-1" || !(/[0-9]+/.test(toAccount)))
				{
					alert("Please select a destination account number");
				}
				else if(amount == "" || amount < 1)
				{
					alert("Transaction amount should be greater than 1");
				}
				else if(!(/(^[0-9]+$)|(^[0-9]+(.){1}([0-9]{1,2})$)/.test(amount)))
				{
					alert("Transaction amount should start and end with a digit and cannot contain more than 2 decimal places");
				}
				else if(amount > 50000)
				{
					alert("Transaction Amount cannot be more than 50000");
				}
				else
				{
					$('#confirmation_from_account').text(fromAccount);
					$('#confirmation_to_account').text(toAccount);
					$('#confirmation_amount').text(amount);

					$.ui.loadContent("#confirmation_transaction", false, false, "slide");
				}
							
			});
		    
		    $('#cancel_transfer_detail').unbind('click').click(function (e) {
		    	$.ui.goBack();
			});
		    
		}
		
		 
	    function setPlaceHolder(){
	    	
	    	if($(this).attr('id').val() == ""){
	    		$(this).attr('placeholder',$(this).attr('placeholder'));
	    	}

		};
		
function getRegisterdPayee(){
		
	var _url = _serverBaseUrl+"BoiMobileBanking/third-party/payee-detail.htm?callback=?&user_id=" + _userId;
	console.log("_url : " + _url);
	var errLog = "Third Party Fund Transfer : Unable to fetch payee names";
	setUpOpts(_url, getRegisterdPayeeCallBack, errLog);
}

function clearThirdPartyDetails()
{
	var from_account_third_party_HTML = $("#from_account_third_party").html();
	$("#from_account_third_party").html("");
	$("#from_account_third_party").html(from_account_third_party_HTML);
	document.getElementById('from_account_third_party').selectedIndex=0;
	$("#payee_name_third_party").val("");
	$("#to_account_third_party").val("");
	$("#transaction_amount_third_party").val("");
	//$("#transaction_remark_third_party").val("");
	$('#register_payee').removeAttr("disabled");
    $("#register_label").text("Register Payee");
    $('#register_payee').prop('checked',false);
}


function clearNeftDetails()
{
	var anroidVersion = getAndroidVersion();
	if(anroidVersion <= 2.4 )
	{
		var from_account_neft_HTML = $("#from_account_neft").html();
		var beneficiary_neft_HTML = $("#beneficiary_neft").html();
		$("#from_account_neft").html("");
		$("#beneficiary_neft").html("");
		$("#from_account_neft").html(from_account_neft_HTML);
		$("#beneficiary_neft").html(beneficiary_neft_HTML);
		document.getElementById('from_account_neft').selectedIndex=0;
		document.getElementById('beneficiary_neft').selectedIndex=0;
	} else {
		$("#from_account_neft").val("Source Account");
		$("#beneficiary_neft").val("Select Beneficiary");
	}
	
	$("#transaction_amount_neft").val("");
	//$("#transaction_remark_neft").val("");
}

function clearRtgsDetails()
{
	$("#payee_name_rtgs").val("");
	$("#to_account_rtgs").val("");
	$("#transaction_amount_rtgs").val("");
	$("#transaction_remark_rtgs").val("");
}

function clearSelfLinkDetails()
{
	fromAccountList = [];
	var fromAccount = $('#from_account').val();
	var accType = getTypeOfAccountByAccNumber(allAccounts, fromAccount);
	var creditAccountsList = getToAccounts("self-link", allAccounts, accType, fromAccount);
	var html = "<option value='-1' selected='selected'>Destination Account</option>";
	
	if(fromAccount != "" && fromAccount != "source_account") {
		$("#to_account").removeAttr("disabled");
		for(var i=0; i<creditAccountsList.length; i++) { 
			html += "<option value="+ creditAccountsList[i]+">"+ creditAccountsList[i]+"</option>";
		}
	}
	
	$("#to_account").html(html);
	creditAccountsList = [];
	
	$('#to_account').attr('disabled','true');
	$('#transaction_amount').val("");
	//$('#transaction_remark').val("");
}

function clearImtCheckStatus() {
	$("#imt_status_bfry_mobile_number").val("");
	$("#imt_transfer_status_amount").val("");
	$("#imt_status_customer_id").val("Source Customer ID (Mandatory)");
	$("#imt_status_account_no").val("Source Account (Mandatory)");
}

function setUpOpts(url, callback, errLog, params) {
	var opts={
					type:"GET",
					async: true,
					cache: false,
					dataType : 'jsonp',
					success: function(data) {
						if(params && params != null){
							callback(data, params);
						} else {
							callback(data);
						}
						
					},
					error:function(data){
						showError(errLog);
					},
					url: url
		    	};
				$.ajax(opts);
}

var balanceEnquiryCallBack = function(data, accountNo){
    var accounts = data;
	var html = "";
	if(accounts.length <= 0) {
		html = "<li class=\"li_content_background\" ><a class=\"li_content\">No Accounts Found.</a></li>";
	} else {
	    for(var i=0; i<accounts.length; i++) { 
		    html += "<li class='li_content_background'>" +
		    		"<a class='li_content'>" +
		    		"<span>" + accounts[i].accountNo + "</span>" +
		    				"<span class='span_right'>" +
		    					"<img src='static/images/rupee.png' title='INR' alt='INR'> " + accounts[i].balance +
		    				"</span>" +
		    		"</a>" +
		    		"</li>";
		    html += "<hr class='hr_margin' />";
		}
	}
	$("#balance_enquiry_accounts_content").html(html);
	$.ui.loadContent("#balance_enquiry_accounts", false, false, "slide");
	hideMask();
	cacheMap.put("balInqHtml_" + accountNo, html);
};

var ministatementCallBack = function( data){
    
	var accounts = data;
    var html = "";
    if(accounts.length <= 0) {
	    html = "<li class=\"li_content_background\" ><a class=\"li_content\">No Accounts Found.</a></li>";
	} else {
		for(var i=0; i<accounts.length; i++) { 
		    html += "<li><a href=\"javascript:showMiniStatement('" + accounts[i].accountNo + "');\"><span>Account Number</span><span class=\"span_right\">" + accounts[i].accountNo +  "</span></a></li>";
		}    
	}
    $("#mini_statement_accounts_content").html(html);
    $.ui.loadContent("#mini_statement_accounts", false, false, "slide");
    hideMask();
    cacheMap.put("miniStatementHtml", true);
	
};

var selfFundTransferCallBack = function( data){
    var accounts = data;
	var html = "<option value=\"\" selected=\"selected\"> Source Account </option>";
	if(accounts.length >1)
	{
		for(var i=0; i<accounts.length; i++) { 
		    html += "<option value="+ accounts[i].accountNo+">"+ accounts[i].accountNo+"</option>";
		}
		$("#from_account").html(html);
		setUpSelfFundsTransferDropdowns();
		$.ui.loadContent("#fund_self_link_account",false,false,"slide");
		cacheMap.put("selfFundTransferHtml", $("#fund_self_link_account").html());
	}
	else
	{
		alert("As you have only one account, you cannot perform Self/Link Fund Transfer");
	}
	hideMask();
};

var viewPayeeThirdPartyCallBack= function( data){
    var payee = data;
    var html = "<li class=\"li_transaction_content_background\"><a class=\"li_content\" ><span>Payee Name</span><span class=\"span_right\">Account</span></a></li>'"+
		   	   "<li class=\"li_transaction_content_background\"><a class=\"li_content\" ><span>Date</span><span class=\"span_right\"></span></a></li>'";
    	html+= "<hr class=\"clear-both\"/>";
    if(payee.length <= 0) 
		html = "<div class=\"li_content_background\">"+
		 		   "<div class=\"mini_statement_main_content\">"+
		 		   "<span class=\"empty_list_message_format\">No Registered Payee.</span>"+
		 		   "</div>"+
		 		   "</div>";
		
	 else { 
	 for(var i = 0; i < payee.length; i++) { 
		
		html+="<li class=\"li_transaction_content_background\"><a class=\"li_content\" ><span>" + payee[i].payeeName + "</span><span class=\"span_right\">"+ payee[i].toAccountNo +"</span></a></li>'"+
	 	      "<li class=\"li_transaction_content_background\"><a class=\"li_content\" ><span>" + payee[i].createdDate +"</span></a></li>'";
	    html+="<hr class=\"clear-both\"/>";
	 }
	}
	$("#view_payee_list_content").html(html);
	$.ui.loadContent("#view_payee_list_panel", false, false, "slide");
	hideMask();
	cacheMap.put("viewRegisterdPayee", $("#view_payee_list_panel").html());
};

var transactionHistoryThirdPartyCallBack = function(data){
	console.log("ajax call success");
	var  payee = data;
	var html = "<li class=\"li_transaction_content_background\"><a class=\"li_content\" ><span>From Account </span><span class=\"span_right\"> Amount </span></a></li>'"+
 	   		   "<li class=\"li_transaction_content_background\"><a class=\"li_content\" ><span>To Account </span><span class=\"span_right\">Date</span></a></li>'";
		html+="<hr class=\"clear-both\"/>";
	if(payee.length <= 0) 
		html = "<div class=\"li_content_background\">"+
		 		"<div class=\"mini_statement_main_content\">"+
			 	"<span class=\"empty_list_message_format\">No Transactions Made.</span>"+
			 	"</div>"+
			 	"</div>";
	 else { 
	 for(var i = 0; i < payee.length; i++) { 
		 html+="<li class=\"li_transaction_content_background\"><a class=\"li_content\" ><span>" + payee[i].fromAccount + "</span><span class=\"span_right\"><img src=\"static/images/rupee.png\" title=\"INR\" alt=\"INR\"/> " + payee[i].transactionAmount + "</span></a></li>'"+
		 	   "<li class=\"li_transaction_content_background\"><a class=\"li_content\" ><span>" + payee[i].toAccount +"</span><span class=\"span_right\">"+ payee[i].transactionDate +"</span></a></li>'";
		 html+="<hr class=\"clear-both\"/>";
	 }
	} 
	$("#transaction_history_content").html(html);
	$.ui.loadContent("#transaction_history_panel", false, false, "slide");
	hideMask();
	cacheMap.put("transactionHistory", $("#transaction_history_panel").html());	
};

var thirdPartyFundTransferCallBack= function( data){
    var accounts = data;
	var html = "<option value=\"\" selected=\"selected\"> Source Account </option>";
	for(var i=0; i<accounts.length; i++) { 
		html += "<option value="+ accounts[i].accountNo+">"+ accounts[i].accountNo+"</option>";
	}
	$("#from_account_third_party").html(html);
	$.ui.loadContent("#fund_third_party_transfer", false, false, "slide");
	hideMask();
	cacheMap.put("thirdPartyFundTransferHtml", $("#fund_third_party_transfer").html());
};

var neftFundTransferCallBack= function( data){
    var accounts = data;
	var html = "<option value='Source Account' selected=\"selected\"> Source Account </option>";
	for(var i=0; i<accounts.length; i++) { 
		html += "<option value="+ accounts[i].accountNo+">"+ accounts[i].accountNo+"</option>";
	}
	$("#from_account_neft").html(html);
	$.ui.loadContent("#fund_neft_transfer", false, false, "slide");
	hideMask();
	cacheMap.put("neftFundTransferHtml", true);
};

var neftBeneficiaryCallBack = function( data){
    var beneficiaries = data;
    console.log("Beneficiary Data: " +beneficiaries);
    console.log("Beneficiary length: " +beneficiaries.length);
	var html = "<option value='Select Beneficiary' selected=\"selected\">Select Beneficiary</option>";
	hideMask();
	if(beneficiaries.length > 0) {
		
		for(var i=0; i<beneficiaries.length; i++) { 
			html += "<option value='"+ beneficiaries[i].bankCode + "_" + beneficiaries[i].branchCode + "_" + beneficiaries[i].accountType + "_" 
					+ beneficiaries[i].payeeName + "_" + beneficiaries[i].branchAddress + "_" + beneficiaries[i].consumerCode + "_" 
					+ beneficiaries[i].accountNo + "_" + beneficiaries[i].branchName + "_" + beneficiaries[i].city + "_" + beneficiaries[i].state + "_" 
					+ beneficiaries[i].bankName + "'>"+ beneficiaries[i].payeeName+ " - " + beneficiaries[i].accountNo +"</option>";
		}
		$("#beneficiary_neft").html(html);
		console.log("Beneficiary Account List : " +html);
		cacheMap.put("neftFundTransferBeneficiariesHtml", html);
		$.ui.loadContent("#fund_neft_transfer", false, false, "slide");
		cacheMap.put("neftFundTransferHtml", true);
	}
	else {
		
		alert("As you do not have any beneficiary account added, you cannot perform NEFT Fund Transfer");
	}
};

var rtgsFundTransferCallBack = function( data){
	var accounts = data;
	var html = "<option value='Source Account' selected=\"selected\"> Source Account </option>";
	for(var i=0; i<accounts.length; i++) { 
		html += "<option value="+ accounts[i].accountNo+">"+ accounts[i].accountNo+"</option>";
	}
	$("#from_account_rtgs").html(html);
	$.ui.loadContent("#fund_rtgs_transfer", false, false, "slide");
	hideMask();
	cacheMap.put("rtgsFundTransferHtml", true);
};

var rtgsBeneficiaryCallBack  = function( data){
    var beneficiaries = data;
	var html = "<option value='Select Payee' selected=\"selected\"> Select Payee </option>";
	for(var i=0; i<beneficiaries.length; i++) { 
		html += "<option value="+ beneficiaries[i].accountNo.replace(/^\s+|\s+$/g,'') + "_" +beneficiaries[i].name + "'>"+ beneficiaries[i].name+"</option>";
	}
	$("#select_payee_name_rtgs").html(html);
	hideMask();
	cacheMap.put("rtgsFundTransferBeneficiariesHtml", html);
};

var confirmFundTransferCallBack_IMT = function( data){
	
	console.log("data -------------------- " + data.toString());
	
	var fundTransfer = data;
	var fromAccount = $("#confirmation_from_account_imt").text();
	var Beneficiary = $('#beneficiary_imt').val().split("_")[1].trim();
	var amount = parseFloat($("#transaction_amount_imt").val().trim());
	
	console.log("result -------------------- " + fundTransfer.fundTransferSuccessful);
	console.log("response code -------------------- " + fundTransfer.responseMessage);
	
	
	hideMask();
	if (fundTransfer.fundTransferSuccessful == true || _isProd == false )
	{
	    
	    var html="";
	    html += "<div class= \"transfer_detail_row\"> <span class=\"row_label\"> From Account: </span> <span id=\"success_from_account\" class=\"row_value\">"+ fromAccount +"</span> </div>";
		html += "<div class= \"transfer_detail_row\"> <span class=\"row_label\"> Beneficiary: </span> <span id=\"success_to_beneficiary\" class=\"row_value\">"+ Beneficiary +"</span> </div>";
		html += "<div class= \"transfer_detail_row\"> <span class=\"row_label\"> Amount: </span> <span id=\"success_amount\" class=\"row_value\">"+ amount +"</span> </div>";
		
		/*if(remark != "")
			html += "<div class= \"transfer_detail_row\"> <span class=\"row_label\"> Remarks: </span> <span id=\"success_remark\" class=\"row_value\">"+ remark +"</span> </div>";
		*/
		if(!fundTransfer.uniqueTransNumber == "")
		{
			html += "<div class= \"transfer_detail_row\"> <span class=\"row_label\"> UTR Number: </span> <span id=\"success_remark\" class=\"row_value\">"+ fundTransfer.uniqueTransNumber +"</span> </div>";
		}
		
		html += "<div class= \"btn_outer_div\"><a href=\"javascript:clearHistory();\" id=\"successfull_transfer_btn\" class=\"fund_transfer_right_btn\"> OK </a></div>";
		$("#successful_transfer_detail").html(html);
		$.ui.loadContent("#successfull_transfer", true, false, "slide");
		$("#mpin").val("");
		confirmFundTransferPage = "";
		cacheMap = new Map();
	}
	else
	{
		alert(fundTransfer.responseMessage);
		$("#mpin").val("");
	}
};

var confirmFundTransferCallBack_NEFT = function( data){
	
	console.log("data -------------------- " + data.toString());
	
	var fundTransfer = data;
	var fromAccount = $("#confirmation_neft_from_account").text();
	var toAccount = $("#confirmation_neft_to_account").text();
	var amount = parseFloat($("#confirmation_neft_amount").text().trim());
	//var remark = $("#confirmation_neft_remark").text();
	
	console.log("result -------------------- " + fundTransfer.fundTransferSuccessful);
	console.log("response code -------------------- " + fundTransfer.responseMessage);
	
	
	hideMask();
	if (fundTransfer.fundTransferSuccessful == true || _isProd == false )
	{
	    
	    var html="";
	    html += "<div class= \"transfer_detail_row\"> <span class=\"row_label\"> From Account: </span> <span id=\"success_from_account\" class=\"row_value\">"+ fromAccount +"</span> </div>";
		html += "<div class= \"transfer_detail_row\"> <span class=\"row_label\"> To Account: </span> <span id=\"success_to_account\" class=\"row_value\">"+ toAccount +"</span> </div>";
		html += "<div class= \"transfer_detail_row\"> <span class=\"row_label\"> Amount: </span> <span id=\"success_amount\" class=\"row_value\">"+ amount +"</span> </div>";
		
		/*if(remark != "")
			html += "<div class= \"transfer_detail_row\"> <span class=\"row_label\"> Remarks: </span> <span id=\"success_remark\" class=\"row_value\">"+ remark +"</span> </div>";
		*/
		if(!fundTransfer.uniqueTransNumber == "")
		{
			html += "<div class= \"transfer_detail_row\"> <span class=\"row_label\"> UTR Number: </span> <span id=\"success_remark\" class=\"row_value\">"+ fundTransfer.uniqueTransNumber +"</span> </div>";
		}
		
		html += "<div class= \"btn_outer_div\"><a href=\"javascript:clearHistory();\" id=\"successfull_transfer_btn\" class=\"fund_transfer_right_btn\"> OK </a></div>";
		$("#successful_transfer_detail").html(html);
		$.ui.loadContent("#successfull_transfer", true, false, "slide");
		$("#mpin").val("");
		confirmFundTransferPage = "";
		cacheMap = new Map();
	}
	else
	{
		alert(fundTransfer.responseMessage);
		$("#mpin").val("");
	}
};

var confirmFundTransferCallBack = function( data){
	console.log("data -------------------- " + data.toString());

	var fundTransfer = data;
	var fromAccount = $("#confirmation_from_account").text();
	var toAccount = $("#confirmation_to_account").text();
	var amount = parseFloat($("#confirmation_amount").text().trim());
	//var remark = $("#confirmation_remark").text();

	console.log("result -------------------- " + fundTransfer.fundTransferSuccessful);
	console.log("response code -------------------- " + fundTransfer.responseCode);
	
	hideMask();
	
	if (fundTransfer.fundTransferSuccessful == true || _isProd == false )
	{
	    
	    var html="";
	    html += "<div class= \"transfer_detail_row\"> <span class=\"row_label\"> From Account: </span> <span id=\"success_from_account\" class=\"row_value\">"+ fromAccount +"</span> </div>";
		html += "<div class= \"transfer_detail_row\"> <span class=\"row_label\"> To Account: </span> <span id=\"success_to_account\" class=\"row_value\">"+ toAccount +"</span> </div>";
		html += "<div class= \"transfer_detail_row\"> <span class=\"row_label\"> Amount: </span> <span id=\"success_amount\" class=\"row_value\">"+ amount +"</span> </div>";
		
		/*if(remark != "")
			html += "<div class= \"transfer_detail_row\"> <span class=\"row_label\"> Remarks: </span> <span id=\"success_remark\" class=\"row_value\">"+ remark +"</span> </div>";
			*/					
		html += "<div class= \"btn_outer_div\"><a href=\"javascript:clearHistory();\" id=\"successfull_transfer_btn\" class=\"fund_transfer_right_btn\"> Ok </a></div>";
		$("#successful_transfer_detail").html(html);
		$.ui.loadContent("#successfull_transfer", true, false, "slide");
		$("#mpin").val("");
		confirmFundTransferPage = "";
		cacheMap = new Map();
	}
	else
	{
		alert(fundTransfer.responseMessage);
		$("#mpin").val("");
	}
	
};

var chequeBookRequestCallBack = function( data){
    var accounts = data;
	var html = "<option value=\"\" selected=\"selected\"> Select Account No </option>";
	for(var i=0; i<accounts.length; i++) { 
		html += "<option value="+ accounts[i].accountNo+">"+ accounts[i].accountNo+"</option>";
	}
	$("#cheque_book_request_account_no").html(html);
	$.ui.loadContent("#cheque_book_request_page", false, false, "slide");
	hideMask();
	cacheMap.put("chequeBookRequestHtml", true);
};

var stopChequeRequestCallBack = function( data){
    var accounts = data;
	var html = "<option value=\"\" selected=\"selected\"> Select Account No </option>";
	for(var i=0; i<accounts.length; i++) { 
		html += "<option value="+ accounts[i].accountNo+">"+ accounts[i].accountNo+"</option>";
	}
	$("#stop_cheque_request_account_no").html(html);
	$.ui.loadContent("#stop_cheque_request_page", false, false, "slide");
	hideMask();
	cacheMap.put("stopChequeRequestHtml", true);
};

var chequeStatusInquiryCallBack = function( data){
    var accounts = data;
	var html = "<option value=\"\" selected=\"selected\"> Select Account No </option>";
	for(var i=0; i<accounts.length; i++) { 
		html += "<option value="+ accounts[i].accountNo+">"+ accounts[i].accountNo+"</option>";
	}
	$("#cheque_status_inquiry_account_no").html(html);
	$.ui.loadContent("#cheque_status_inquiry_page", false, false, "slide");
	hideMask();
	cacheMap.put("chequeStatusInquiryHtml", true);
};

var viewRequestsCallBack = function( data){
    var accounts = data;
	var html = "<option value=\"\" selected=\"selected\"> Select Account No </option>";
	for(var i=0; i<accounts.length; i++) { 
		html += "<option value="+ accounts[i].accountNo+">"+ accounts[i].accountNo+"</option>";
	}
	$("#view_request_account_no").html(html);
	$.ui.loadContent("#view_request_page", false, false, "slide");
	hideMask();
	cacheMap.put("viewRequestsHtml", true);
};

var confirmChequeBookRequestCallBack = function( data){
    var chequeBook = data;
	if (chequeBook.referenceId == null)
	{
	    alert("Invalid m-Pin");
	    $("#cheque_request_mpin").val("");
	}
	else
	{
	    var html = "";
	    html += "<div class=\"request_sub_content\">";
	    html += "<label class=\"label_content\"> Request Ref Id: </label>";
	    html += "<span class=\"width_45\" id=\"cheque_book_request_ref_id\">"+chequeBook.referenceId +"</span>";
	    html += "</div>";
	    html += "<div class=\"request_sub_content\">";
	    html += "<label class=\"label_content\"> Status: </label>";
	    html += "<span class=\"width_45\" id=\"cheque_book_request_status\">"+chequeBook.requestStatus +"</span>";
	    html += "</div>";
	    html += "<div class=\"request_sub_content\">";
	    html += "<label class=\"label_content\"> Status Date: </label>";
	    html += "<span class=\"width_45\" id=\"cheque_book_request_date\">"+chequeBook.statusDate +"</span>";
	    html += "</div>";
	    $("#successfull_cheque_book_details").html(html);
	    $.ui.loadContent("#successfull_cheque_book_request_page", true, false, "slide");
	    $("#cheque_request_mpin").val("");
	}
	hideMask();
};

var confirmStopChequeRequestCallBack = function( data){
    var stopChequeData = data;
	if (stopChequeData.referenceId == null)
	{
	    alert("Invalid m-Pin");
	    $("#stop_cheque_request_mpin").val("");
	}
	else
	{
	    var html = "";
	    html += "<div class=\"request_sub_content\">";
	    html += "<label class=\"label_content\"> Request Ref Id: </label>";
	    html += "<span class=\"width_45\" id=\"stop_cheque_request_ref_id\">"+stopChequeData.referenceId +"</span>";
	    html += "</div>";
	    html += "<div class=\"request_sub_content\">";
	    html += "<label class=\"label_content\"> Status: </label>";
	    html += "<span class=\"width_45\" id=\"stop_cheque_request_status\">"+stopChequeData.requestStatus +"</span>";
	    html += "</div>";
	    html += "<div class=\"request_sub_content\">";
	    html += "<label class=\"label_content\"> Status Date: </label>";
	    html += "<span class=\"width_45\" id=\"stop_cheque_request_date\">"+stopChequeData.statusDate +"</span>";
	    html += "</div>";
	    $("#successfull_stop_cheque_details").html(html);
	    $.ui.loadContent("#successfull_stop_cheque_request_page", true, false, "slide");
	    $("#stop_cheque_request_mpin").val("");
	}
	hideMask();
};

var submitChequeInquiryRequestDetailCallBack = function( data){
    var chequeInquiryData = data;
	var html = "";
	html += "<div class=\"request_sub_content\">";
	html += "<label class=\"label_content\"> Request Ref Id: </label>";
	html += "<span class=\"width_45\" id=\"stop_cheque_request_ref_id\">"+chequeInquiryData.referenceId +"</span>";
	html += "</div>";
	html += "<div class=\"request_sub_content\">";
	html += "<label class=\"label_content\"> Status: </label>";
	html += "<span class=\"width_45\" id=\"stop_cheque_request_status\">"+chequeInquiryData.requestStatus +"</span>";
	html += "</div>";
	html += "<div class=\"request_sub_content\">";
	html += "<label class=\"label_content\"> Status Date: </label>";
	html += "<span class=\"width_45\" id=\"stop_cheque_request_date\">"+chequeInquiryData.statusDate +"</span>";
	html += "</div>";
	$("#successfull_cheque_status_inquiry_details").html(html);
	$.ui.loadContent("#confirmation_cheque_inquiry_request", true, false, "slide");
	hideMask();
};

var submitViewRequestDetailCallBack = function( data){
    var pendingData = data;
	var html = "";
							
	html += "<div class=\"request_sub_content\">";
	html += "<label class=\"label_content\"> Account No: </label>";
	html += "<span class=\"width_45\" id=\"pending_request_acc_no\">"+pendingData.accountNo +"</span>";
	html += "</div>";
	html += "<div class=\"request_sub_content\">";
	html += "<label class=\"label_content\"> Request Ref Id: </label>";
	html += "<span class=\"width_45\" id=\"pending_request_ref_id\">"+pendingData.referenceId +"</span>";
	html += "</div>";
	html += "<div class=\"request_sub_content\">";
	html += "<label class=\"label_content\"> Status: </label>";
	html += "<span class=\"width_45\" id=\"pending_request_status\">"+pendingData.requestStatus +"</span>";
	html += "</div>";
	html += "<div class=\"request_sub_content\">";
	html += "<label class=\"label_content\"> Status Date: </label>";
	html += "<span class=\"width_45\" id=\"pending_request_date\">"+pendingData.statusDate +"</span>";
	html += "</div>";
	$("#pending_request_details").html(html);
	$.ui.loadContent("#pending_request_status_page", true, false, "slide");
	hideMask();
};

var showMiniStatementCallBack = function(data, accountNo){
	console.log("accountNo : " + accountNo);
    var miniStatement = data;
	console.log("transactions length in model: " + miniStatement.length);
	var html = "";
	
	if(miniStatement[0].responseStatus == true){
		
		for(var i = 0; i < miniStatement.length; i++) { 
		    html +="<div class=\"mini_statement_li_content_background\">" +
			"<div class=\"mini_statement_main_content\">" +
			"<span class=\"mini_statement_description\">" + miniStatement[i].transactionDescription + "</span>"+
			"<span class=\"mini_statement_date\">" + miniStatement[i].transactionDate + "</span>"+
			"</div >"+
			"<div class=\"mini_statement_amount\">"+
			"<img class=\"mini_statement_rupee_image\" src=\"static/images/rupee.png\" title=\"INR\" alt=\"INR\"/> "+ miniStatement[i].transactionAmount;
		    if(miniStatement[i].transactionType == "DEBIT") 
				html +="(Dr)" ;
			else { 
				html +="(Cr)";
			} 		
			html += "</div></div><hr class=\"clear-both\"/>";
		}
		
		$("#transactions").html(html);
		$.ui.loadContent("#mini_statement", false, false, "slide");
		hideMask();
		cacheMap.put("transactionsHtml_" + accountNo, html);
	
	} else if(miniStatement[0].responseStatus == false && miniStatement[0].responseMessage === "Request completed successfully (000)") { 
	    html = "<div class=\"li_content_background\">"+
	    "<div class=\"mini_statement_main_content\">"+
		"<span class=\"mini_statement_transaction_not_found\">No Transactions Found.</span>"+
		"</div>"+
		"</div>";
	    
	    $("#transactions").html(html);
		$.ui.loadContent("#mini_statement", false, false, "slide");
		hideMask();
		cacheMap.put("transactionsHtml_" + accountNo, html);
		
	} else {
		hideMask();
		alert(miniStatement[0].responseMessage);
	}
};

var setUpthirdPartyFundsTransferDropdownsCallBack = function( data){
    var thirdPartyAccName = data;
	$("#beneficiary_name_third_party").val(thirdPartyAccName);
	hideMask();
};

function showError( errLog){
    console.log(errLog);
	alert(errLog);
	hideMask();
}

var getRegisterdPayeeCallBack = function( data){
	console.log("ajax call success");
	var payee = data;
	var html = "<option> Select Payee </option>";
	if(payee.length<=0)
	{
		$("#select_payee_name_third_party").attr("disabled","disabled");
	}
	else
    {
		$("#select_payee_name_third_party").removeAttr("disabled");
		for(var i=0; i<payee.length; i++) { 
			html+="<option value='"+ payee[i].toAccountNo.replace(/^\s+|\s+$/g,'') + "_" +payee[i].payeeName + "'>"+payee[i].payeeName+"</option>";
		}
	}
	$("#select_payee_name_third_party").html(html);
};

var viewNeftBeneficiaryListCallBack = function(data) {
    var beneficiary = data;
    var html = "";
    if(beneficiary.length <= 0) {
	    html = "<div class='main_menus_div' ><a>No Beneficiary Found.</a></div>";
	} else {
		for(var i=0; i<beneficiary.length; i++) { 
		    html += "<div id="+ beneficiary[i].beneficiaryId.trim() +" class='main_menus_div beneficiary_click_event'><a><span>" + beneficiary[i].name +  "</span></a></div>";
		}    
	}
    $("#neft_beneficiary_list_view").html(html);
    $.ui.loadContent("#neft_beneficiary_list", false, false, "slide");
    cacheMap.put("neftBeneficiaryListHtml", true);
    
    $(".beneficiary_click_event").unbind('click').click(function (){
    	console.log("Clicked Beneficiary to view detail" +this.id);
    	showBeneficiaryDetail( this.id );
	});
    
    hideMask();
};


var viewRtgsBeneficiaryListCallBack = function(data) {
    var beneficiary = data;
    var html = "";
    if(beneficiary.length <= 0) {
	    html = "<div class='main_menus_div' ><a>No Beneficiary Found.</a></div>";
	} else {
		for(var i=0; i<beneficiary.length; i++) { 
		    html += "<div id="+ beneficiary[i].beneficiaryId.trim() +" class='main_menus_div beneficiary_click_event'><a><span>" + beneficiary[i].name +  "</span></a></div>";
		}    
	}
    $("#rtgs_beneficiary_list_view").html(html);
    $.ui.loadContent("#rtgs_beneficiary_list", false, false, "slide");
    cacheMap.put("rtgsBeneficiaryListHtml", true);
    
    $(".beneficiary_click_event").unbind('click').click(function (){
    	showBeneficiaryDetail( this.id );
	});
    
    hideMask();
};

function showBeneficiaryDetail(beneficiaryId){
	showMask();
	var beneficiaryDetailHtml = cacheMap.get("beneficiaryDetailHtml" + beneficiaryId);
	if(beneficiaryDetailHtml && beneficiaryDetailHtml != null && beneficiaryDetailHtml != ""){
		console.log("Beneficiary Details already available");
		$("#beneficiary_details_view").html(beneficiaryDetailHtml);
		$.ui.loadContent("#beneficiary_details", false, false, "slide");
		hideMask();
	} else {
		var _url = "";
		if(_isProd){
			_url = _serverBaseUrl+"/BoiMobileBanking/beneficiary/neft-beneficiary-details.htm?callback=?&beneficiary_id=" + beneficiaryId; //for C24
		}else{
			_url = _serverBaseUrl+"BoiMobileBanking/beneficiary/neft-beneficiary-details.htm?callback=?&beneficiary_id=" + beneficiaryId;
		}
		
		console.log("_url : " + _url);
		var errLog = "Beneficiary Detail : Failed to fetch Detail";
		setUpOpts(_url, showBeneficiaryDetailCallBack, errLog, beneficiaryId);
	}
}


var showBeneficiaryDetailCallBack = function(data, beneficiaryId){

	console.log("beneficiaryId : " + beneficiaryId);
    
	var beneficiaryDetailData = data;
	var html = "";
	if(beneficiaryDetailData.length <= 0) 
	    html = "<div class='main_menus_div' ><a>No Data Found.</a></div>";
	else { 
			
		    html +="<div class=\"mini_statement_li_content_background\">" +
		    			"<div>" +
			    			"<div class='mini_statement_main_content beneficiary_content_padding'>" +
								"<span class='mini_statement_description'>Name</span>" +
							"</div >"+
							"<div class='mini_statement_amount beneficiary_content_padding'>"+
								"<span class='span_right clear-both'>" + beneficiaryDetailData[0].name + "</span>"+
							"</div>" +
						"</div>" +
						"<hr class='clear-both'/>"+
						"<div class='mini_statement_main_content beneficiary_content_padding'>" +
							"<span class='mini_statement_date'>Account No.</span>"+
						"</div>" +
						"<div class='mini_statement_amount beneficiary_content_padding'>"+
							"<span class='span_right clear-both'>" + beneficiaryDetailData[0].accountNo + "</span>"+
						"</div>" +
						"<hr class='clear-both'/>"+
						"<div class='mini_statement_main_content beneficiary_content_padding'>" +
							"<span class='mini_statement_date'>Type</span>"+
						"</div>" +
						"<div class='mini_statement_amount beneficiary_content_padding'>"+
							"<span class='span_right clear-both'>" + beneficiaryDetailData[0].beneficiaryType + "</span>"+
						"</div>" +
						"<hr class='clear-both'/>"+
						"<div class='mini_statement_main_content beneficiary_content_padding'>" +
							"<span class='mini_statement_date'>Bank</span>"+
						"</div>" +
						"<div class='mini_statement_amount beneficiary_content_padding'>"+
							"<span class='span_right clear-both'>" + beneficiaryDetailData[0].bank + "</span>"+
						"</div>" +
						"<hr class='clear-both'/>"+
						"<div class='mini_statement_main_content beneficiary_content_padding'>" +
							"<span class='mini_statement_date'>Mobile No.</span>"+
						"</div>" +
						"<div class='mini_statement_amount beneficiary_content_padding'>"+
							"<span class='span_right clear-both'>" + beneficiaryDetailData[0].phoneNo + "</span>"+
						"</div>" +
						"<hr class='clear-both'/>"+
						"<div class='mini_statement_main_content beneficiary_content_padding'>" +
							"<span class='mini_statement_date'>City</span>"+
						"</div>" +
						"<div class='mini_statement_amount beneficiary_content_padding '>"+
							"<span class='span_right clear-both'>" + beneficiaryDetailData[0].city + "</span>"+
						"</div>" +
						"<hr class='clear-both'/>" +
					"</div>";
	}
	$("#beneficiary_details_view").html(html);
	$.ui.loadContent("#beneficiary_details", false, false, "slide");
	hideMask();
	cacheMap.put("beneficiaryDetailHtml" + beneficiaryId, html);
};

var viewBankNameListCallBack = function(data) {
    var html = "";
 
    html = "<option value='Select Bank Name'> Select Bank Name </option>";

    if(data.length > 0) {
		
		for(var i=0; i<data.length; i++)
			html+="<option value='"+ data[i].bankName +"'>"+ data[i].bankName +"</option>";
	}

    
    if($.ui.activeDiv.attributes.id.value == "rtgs_add_beneficiary_page")
    {
    	$.ui.loadContent("#rtgs_add_bank_detail_page",false,false,"slide");
    }
    else if ($.ui.activeDiv.attributes.id.value == "neft_add_beneficiary_page")
    {
    	$.ui.loadContent("#neft_add_bank_detail_page",false,false,"slide");
    }
    $("#rtgs_select_bank_name").html(html);
    $("#neft_select_bank_name").html(html);
    
    hideMask();
    cacheMap.put("beneficiaryBankNameListHtml", true);
};

var viewStateNameCallBack = function(data) {
    var html = "";
    html = "<option value='Select State'> Select State </option>";

    if(data.length > 0) {
		
		for(var i=0; i<data.length; i++)
			html+="<option value='"+ data[i].state +"'>"+ data[i].state +"</option>";
	}
    
    if($.ui.activeDiv.attributes.id.value == "rtgs_add_bank_detail_page")
    	$("#rtgs_beneficiary_state").html(html);
    else if ($.ui.activeDiv.attributes.id.value == "neft_add_bank_detail_page")
    	$("#neft_beneficiary_state").html(html);
    
    hideMask();
};

var viewCityListCallBack = function(data) {
    var html = "";
    html = "<option value='Select City'> Select City </option>";

    if(data.length > 0) {
		
		for(var i=0; i<data.length; i++)
			html+="<option value='"+ data[i].city +"'>"+ data[i].city +"</option>";
	}
    
    if($.ui.activeDiv.attributes.id.value == "rtgs_add_bank_detail_page")
    	$("#rtgs_beneficiary_city").html(html);
    else if ($.ui.activeDiv.attributes.id.value == "neft_add_bank_detail_page")
    	$("#neft_beneficiary_city").html(html);
    
    hideMask();
};

var viewBranchListCallBack = function(data) {
    var html = "";
    html = "<option value='Select Branch Name'> Select Branch Name </option>";

    if(data.length > 0) {
		
		for(var i=0; i<data.length; i++)
			html+="<option value='"+ data[i].branchName +"'>"+ data[i].branchName +"</option>";
	}
    
    if($.ui.activeDiv.attributes.id.value == "rtgs_add_bank_detail_page")
    	$("#rtgs_select_branch_name").html(html);
    else if ($.ui.activeDiv.attributes.id.value == "neft_add_bank_detail_page")
    	$("#neft_select_branch_name").html(html);
    
    hideMask();
};

var viewIfscCodeCallBack = function(data) {
    
    if(data.length > 0) {
		
		for(var i=0; i<data.length; i++)
			
			if($.ui.activeDiv.attributes.id.value == "rtgs_add_bank_detail_page")
				$("#rtgs_beneficiary_ifsc_code").val(data[i].ifscCode);
		    else if ($.ui.activeDiv.attributes.id.value == "neft_add_bank_detail_page")
		    	$("#neft_beneficiary_ifsc_code").val(data[i].ifscCode);
	}
    
    hideMask();
};

var successAddBeneificaryCallBack = function( data){
    
	if (data)
	{
		
	    var html="";
		html += "<div class= \"transfer_detail_row\"> <span class=\"row_label\"> Benecficiary Name: </span> <span class=\"row_value\">" + $('#confirmation_beneficiary_name').text() + "</span> </div>";
	    html += "<div class= \"transfer_detail_row\"> <span class=\"row_label\"> Mobile No.: </span> <span class=\"row_value\">"+ $("#confirmation_beneficiary_mobile_no").text() +"</span> </div>";
		html += "<div class= \"transfer_detail_row\"> <span class=\"row_label\"> Account No.: </span> <span class=\"row_value\">"+ $('#confirmation_beneficiary_account_no').text() +"</span> </div>";
		html += "<div class= \"transfer_detail_row\"> <span class=\"row_label\"> Bank Name: </span> <span class=\"row_value\">"+ $('#confirmation_beneficiary_bank_name').text() +"</span> </div>";
		html += "<div class= \"transfer_detail_row\"> <span class=\"row_label\"> Branch Name: </span> <span class=\"row_value\">"+ $("#confirmation_beneficiary_branch_name").text() +"</span> </div>";
		html += "<div class= \"transfer_detail_row\"> <span class=\"row_label\"> IFSC Code: </span> <span class=\"row_value\">" + $('#confirmation_ifsc_code').text() + "</span> </div>";
								
		html += "<div class= \"btn_outer_div\"><a href=\"javascript:clearHistory();\" id=\"successfull_beneficiary_btn\" class=\"fund_transfer_right_btn\"> Ok </a></div>";
		$("#successful_beneficiary_detail").html(html);
		$.ui.loadContent("#add_beneficiary_successful_page",false,false,"slide");
		
	}
	hideMask();
};

var customerAccountInquiryCallback = function( data){

	var fromAccount = $('#from_account_third_party').val();
	var toAccount = $("#to_account_third_party").val().trim();
	var amount = $('#transaction_amount_third_party').val();
	//var remark = $('#transaction_remark_third_party').val().trim();
	var accountDetails = data;
	var fromAccType = null ;
	
	hideMask();
	
	if(accountDetails == null || accountDetails == undefined) {
		
		alert("Unable to process request");
	
	}
	else if(!accountDetails.generalAccInqSuccessfull) {
	
		alert(accountDetails.responseMessage);	
	}
	else {
			
		fromAccType = getTypeOfAccountByAccNumber(allAccounts, fromAccount);
		
		if(isTransactonPossible(fromAccType, accountDetails.accountType)) {
			
			console.log('Valid destination account type ' + accountDetails.accountType);
			
			$('#confirmation_from_account').text(fromAccount);
			$('#confirmation_to_account').text(toAccount);
			$('#confirmation_amount').text(amount);
			//$('#confirmation_remark').text(remark);
			
			// Hide/Show Remark
			/*if(remark == "")
				$('#confirmation_remark').parent().addClass('hide-option');
			else
				$('#confirmation_remark').parent().removeClass('hide-option');
			*/
			//hide
			//document.getElementById("transaction_remark_third_party").style.display='none';
			document.getElementById("to_account_third_party").style.display='none';
			document.getElementById("transaction_amount_third_party").style.display='none';
			document.getElementById("payee_name_third_party").style.display='none';
	
			//Show
			//document.getElementById("transaction_remark_third_party").style.display='inline-block';
			document.getElementById("to_account_third_party").style.display='inline-block';
			document.getElementById("transaction_amount_third_party").style.display='inline-block';
			document.getElementById("payee_name_third_party").style.display='inline-block';
			$.ui.loadContent("#confirmation_transaction",false,false,"slide");
		
		}
		else {
			alert("Fund transfer from account type "+ fromAccType + " to " + accountDetails.accountType +" is not allowed");
		}
	}
};

function getFromAccounts(featureType, accountsList, accountsType){
	var accNosTemp = accountsList.replace(/account_nos=/g,"");
	var accNos = accNosTemp.split("&");
	var accType = accountsType.split("&");
	var finalAccList = "";
	if(featureType != "" || featureType != null || featureType != undefined ){
		var dict = [];
		for(var i = 0; i < accNos.length;i++){
			dict.push({
				key: accNos[i],
				value : accType[i]
			});
		}
		if(featureType == "miniStatement"){
			for(var j = 0; j < dict.length;j++){
				if(dict[j].value == "SBA" || dict[j].value == "CCA" || dict[j].value == "CAA" || dict[j].value == "ODA" ){
					finalAccList += "account_nos=" + dict[j].key;
					if(j != dict.length - 1){
						finalAccList += "&";
		    		}
				}
				
			}
		}
		else if(featureType == "self-link" || featureType == "third-party" || featureType == "neft"){
			for(var j = 0; j < dict.length;j++){
				if(dict[j].value == "SBA" || dict[j].value == "CCA" || dict[j].value == "CAA" || dict[j].value == "ODA" || dict[j].value == "NRE" ){
					finalAccList += "account_nos=" + dict[j].key;
					if(j != dict.length - 1){
						finalAccList += "&";
		    		}
				}
				
			}
		}
		/*else if(featureType == "third-party"){
			for(var j = 0; j < dict.length;j++){
				if(dict[j].value == "SBA" || dict[j].value == "CCA" || dict[j].value == "CAA" || dict[j].value == "ODA" ){
					finalAccList += "account_nos=" + dict[j].key;
					if(j != dict.length - 1){
						finalAccList += "&";
		    		}
				}
			}
		}*/
		return finalAccList;
	}
	else{
		return accountsList;
	}
}

function getToAccounts(featureType, accountsList, debitAccountType, fromAccount){
	var tempAccountsList = new Array();
	if(featureType == 'self-link'){
		if(debitAccountType == "NRE"){
			for(var i = 0; i < accountsList.length; i++){
				if(accountsList[i].accNumber != fromAccount){
					tempAccountsList.push(accountsList[i].accNumber);
				}
			}
		}
		else if(debitAccountType == "SBA" || debitAccountType == "CCA" || debitAccountType == "CAA" || debitAccountType == "ODA"){
			for(var i = 0; i < accountsList.length; i++){
				if(accountsList[i].accType == "SBA" || accountsList[i].accType == "CCA" || accountsList[i].accType == "CAA" ||
					accountsList[i].accType == "ODA" || accountsList[i].accType == "LAA"){
					if(accountsList[i].accNumber != fromAccount){
						tempAccountsList.push(accountsList[i].accNumber);
					}
				}
			}
		}
	}
	return tempAccountsList;
}


function getTypeOfAccountByAccNumber(accountsList, fromAccountNumber){
	for(var i = 0; i < accountsList.length; i++){
		if(accountsList[i].accNumber == fromAccountNumber){
		console.log("account Type  - " + accountsList[i].accType + " From account number  - " + accountsList[i].accNumber);
			return accountsList[i].accType;
		}
	}
}

var txnPwdValidationCallback_IMT = function(verifyMPINResult){
	
	console.log("inside callback IMT " + verifyMPINResult.responseFlag);
	console.log("inside callback transactionPasswordAttempts IMT:- " + verifyMPINResult.transactionPasswordAttempts);

	if(verifyMPINResult.responseFlag == "success"){
		hideMask();	
		var _url = "";
		var zsid = "";
		
		if(_isProd)
		{
		  _url = _serverBaseUrl+"BoiMobileBanking/fundtransfer/initiate-imt.htm?callback=?"; 
		  zsid = R2FA4AHAJSI.getZRSessionId();
		}
		else 
		{
			_url = _serverBaseUrl+"BoiMobileBanking/fundtransfer/initiate-imt.htm?callback=?";
			zsid = 'sample';
		}
		
		_url += "&zSessionId="+encodeURIComponent(zsid)+"&customerId="+encodeURIComponent($('#from_account_imt').val().split("_")[0].trim())+
		"&userId="+encodeURIComponent(_userId)+
		"&customerName="+
		"&transactionAmount="+encodeURIComponent($('#transaction_amount_imt').val().trim())+
		"&beneficiaryMobile="+encodeURIComponent($('#beneficiary_imt').val().split("_")[0].trim())+
		"&customerMobile="+encodeURIComponent($('#imt_mobile_number').val().trim())+
		"&transactionPin="+encodeURIComponent($('#imt_sender_code').val().trim())+
		"&remarks="+encodeURIComponent($('#imt_payment_remark').val().trim())+
		"&customerAccountNumber="+encodeURIComponent($('#from_account_imt').val().split("_")[1].trim());
		
		console.log("_url : " + _url);
		var errLog = "Transaction failed";
		setUpOpts(_url, confirmFundTransferCallBack_IMT, errLog);
		$.ui.showMask("Please wait while we process your request");
		$("body").append('<div class="modalWindow"/>');
	}
	else if(verifyMPINResult.responseFlag == "failure"){
		hideMask();
		$('#mpin_neft').val("");
		if(verifyMPINResult.transactionPasswordStatus == "SUSPENDED"){
			alert("Your 3 transaction attempts have been exceeded. Your transaction password has been suspended for security reasons.");
			clearHistory();
		}
		else if((verifyMPINResult.transactionPasswordAttempts > 0 || verifyMPINResult.transactionPasswordAttempts < 4) && verifyMPINResult.transactionPasswordStatus == "ACTIVE"){
			alert("Please Enter Valid Transaction Password. Only " + (3 - parseInt(verifyMPINResult.transactionPasswordAttempts)) + " attempts left.");
		}
	}
};


var txnPwdValidationCallback_NEFT = function(verifyMPINResult){
	
	console.log("inside callback NEFT " + verifyMPINResult.responseFlag);
	console.log("inside callback transactionPasswordAttempts NEFT:- " + verifyMPINResult.transactionPasswordAttempts);

	if(verifyMPINResult.responseFlag == "success")
	{
		hideMask();	
		var _url = "";
		var zsid = "";
		
		if(_isProd)
		{
		  _url = _serverBaseUrl+"BoiMobileBanking/fundtransfer/neft.htm?callback=?"; 
		  zsid = R2FA4AHAJSI.getZRSessionId();
		}
		else 
		{
			_url = _serverBaseUrl+"BoiMobileBanking/fundtransfer/neft.htm?callback=?";
			zsid = 'sample';
		}
		
		var beneficiaryValues = $("#beneficiary_neft").val();
		var beneficiaryDetails = beneficiaryValues.split("_");
		
		_url += "&from_account_no="+ $("#confirmation_neft_from_account").text() 
		+ "&to_account_no="+ encodeURIComponent(beneficiaryDetails[6].trim()) 
		+ "&amount="+ $("#confirmation_neft_amount").text() 
		//+ "&remarks="+ encodeURIComponent($("#confirmation_neft_remark").text())
		+ "&user_id="+ _userId 
		+ "&destination_bank_id=" + encodeURIComponent(beneficiaryDetails[0].trim())
		+ "&destination_branch_code=" + encodeURIComponent(beneficiaryDetails[1].trim()) 
		+ "&benef_account_type=" + encodeURIComponent(beneficiaryDetails[2].trim()) 
		+ "&payee_name=" + encodeURIComponent(beneficiaryDetails[3].trim()) 
		+ "&destination_branch_address=" + encodeURIComponent(beneficiaryDetails[4].trim()) 
		+ "&ifsc_code=" + encodeURIComponent(beneficiaryDetails[5].trim()) 
		+ "&zSessionId=" + zsid;
		
		console.log("_url : " + _url);
		var errLog = "Transaction failed";
		setUpOpts(_url, confirmFundTransferCallBack_NEFT, errLog);
		$.ui.showMask("Please wait while we process your request");
		$("body").append('<div class="modalWindow"/>');
		
	}
	else if(verifyMPINResult.responseFlag == "failure"){
		hideMask();
		$('#mpin_neft').val("");
		if(verifyMPINResult.transactionPasswordStatus == "SUSPENDED"){
			alert("Your 3 transaction attempts have been exceeded. Your transaction password has been suspended for security reasons.");
			clearHistory();
		}
		else if((verifyMPINResult.transactionPasswordAttempts > 0 || verifyMPINResult.transactionPasswordAttempts < 4) && verifyMPINResult.transactionPasswordStatus == "ACTIVE"){
			alert("Please Enter Valid Transaction Password. Only " + (3 - parseInt(verifyMPINResult.transactionPasswordAttempts)) + " attempts left.");
		}
	}
};

var neftValidIFSCCodeCallBack = function(data)
{
	var fromAccount = $('#from_account_neft').val();
	var toAccount = $("#to_account_neft").val();
	var amount = $('#transaction_amount_neft').val().trim();
	//var remark = $('#transaction_remark_neft').val().trim();
	var ifscCode = $('#ifsc_code_neft').val().trim();
	var payeeName = $('#payee_name_neft').val().trim();
	var response = data.responseFlag;
	var bankCode = data.bankCode;
	var accountType = $('#act_type_neft').val();
	
	if(response == "success"){
		$('#confirmation_neft_from_account').text(fromAccount);
		$('#confirmation_neft_amount').text(amount);
		//$('#confirmation_neft_remark').text(remark);
		$('#confirmation_neft_to_account').text(toAccount);
		$('#confirmation_neft_payee_name').text(payeeName);
		$('#confirmation_neft_branch_address').text(data.branchAddress);
		$('#confirmation_neft_bank_code').text(data.bankCode);
		$('#confirmation_neft_branch_code').text(data.branchCode);
		$('#confirmation_neft_ifsc_code').text(ifscCode);
		$('#confirmation_neft_act_type').text($('#act_type_neft').val());
		$('#confirmation_neft_branch_name').text(data.branchName);
		$('#confirmation_neft_branch_city').text(data.city);
		$('#confirmation_neft_bank_name').text(data.bankName);
		
		// Hide/ Show Remark
		/*if(remark == "")
			$('#confirmation_neft_remark').parent().addClass('hide-option');
		else
			$('#confirmation_neft_remark').parent().removeClass('hide-option');
		*/
		$.ui.loadContent("#confirmation_neft_transaction",false,false,"slide");
	}
	else if(response == "failure") {
		alert("IFSCCode: '" + ifscCode + "' not found. Please Enter Valid IFSC Code.");
	}
	
}

var txnPwdValidationCallback = function(verifyMPINResult){

	console.log("inside callback " + verifyMPINResult.responseFlag);
	console.log("inside callback transactionPasswordAttempts:- " + verifyMPINResult.transactionPasswordAttempts);

	if(verifyMPINResult.responseFlag == "success")
	{
		//$('#confirm_fund_transfer_btn').addClass("ui-disabled");

		var _url = "";
		var zsid = R2FA4AHAJSI.getZRSessionId();
		
		if(confirmFundTransferPage === "THIRD_PARTY" && _isProd)
		{
			  _url = _serverBaseUrl+"BoiMobileBanking/fundtransfer/third-party.htm?callback=?"+ "&register_payee=false&payee_name="+encodeURIComponent($("#payee_name_third_party").val()) ;
		}
		else if (confirmFundTransferPage === "THIRD_PARTY" && !(_isProd))
		{
			_url = _serverBaseUrl+"BoiMobileBanking/fundtransfer/third-party-from-local.htm?callback=?"+ "&register_payee="+$("#register_payee").is(":checked")+ "&payee_name="+encodeURIComponent($("#payee_name_third_party").val()) ;
		}
		else if(confirmFundTransferPage === "SELF_LINK" && _isProd)
		{
			  _url = _serverBaseUrl+"BoiMobileBanking/fundtransfer/self-link.htm?callback=?";
		}
		else if(confirmFundTransferPage === "SELF_LINK"  && !(_isProd))
		{
			  _url = _serverBaseUrl+"BoiMobileBanking/fundtransfer/self-link-from-local.htm?callback=?";
		}
		
		_url += "&from_account_no="+ $("#confirmation_from_account").text() 
		+ "&to_account_no="+ $("#confirmation_to_account").text() 
		+ "&amount="+ $("#confirmation_amount").text().trim()  
		+ "&user_id="+ _userId 
		//+ "&remarks="+ encodeURIComponent($("#confirmation_remark").text())
		+ "&z_session_id=" + zsid;
		
		console.log("_url : " + _url);
		var errLog = "Transaction failed";
		setUpOpts(_url, confirmFundTransferCallBack, errLog);
		//$('#confirm_fund_transfer_btn').removeClass("ui-disabled");
	}
	else if(verifyMPINResult.responseFlag == "failure"){
		hideMask();
		if(verifyMPINResult.transactionPasswordStatus == "SUSPENDED"){
			alert("Your 3 transaction attempts have been exceeded. Your transaction password has been suspended for security reasons.");
			clearHistory();
		}
		else if((verifyMPINResult.transactionPasswordAttempts > 0 || verifyMPINResult.transactionPasswordAttempts < 4) && verifyMPINResult.transactionPasswordStatus == "ACTIVE"){
			alert("Please Enter Valid Transaction Password. Only " + (3 - parseInt(verifyMPINResult.transactionPasswordAttempts)) + " attempts left.");
		}
	}
	
};

var checkTxnPwdStatusCallback = function(data){
	console.log("inside checkTxnPwdStatusCallback : " + data.responseFlag);
	hideMask();
	var response = data.responseFlag;
	
	if(response == "success"){
		if(data.transactionPasswordStatus == "ACTIVE"){
			$.ui.loadContent("#fund_transfer_menu", false, false, "slide");
		}else if(data.transactionPasswordStatus == "PENDING_ACTIVATION") {
			if(data.isTransactionPwdSetup){
				alert("Please activate your transaction password from Internet Banking.");
			}
			else{
				alert("Your Transaction password is yet to be setup. Please navigate to Change Secrets menu to setup your Transaction Password and activate it from Internet Banking.");
			}
			
		}
		else if(data.transactionPasswordStatus == "SUSPENDED") {
			if(parseInt(data.transactionPasswordAttempts)!==0){
				alert("Your Transaction password has been suspended. Please reset your transaction password from Forgot password link on Change Secrets menu and activate it from Internet Banking.");
			}
			else{
				alert("Please activate your transaction password from Internet Banking.");
			}
		}
		else if (data.transactionPasswordStatus == "BLOCKED"){
			alert("Your Transaction password has been blocked.");
		}
	} else if(response == "failure") {
		alert("Your Transaction password is either not been set yet or is suspended. Please navigate to Change Secrets menu to setup your Transaction Password.");
	}
};

function showBalanceInquiry(accountNo){

	showMask();
	var balInqHtml = cacheMap.get("balInqHtml_" + accountNo);
	
	if(balInqHtml && balInqHtml != null && balInqHtml != ""){
	
		console.log("balInqHtml already available");
		$("#balance_enquiry_accounts_content").html(balInqHtml);
		$.ui.loadContent("#balance_enquiry_accounts", false, false, "slide");
		hideMask();
		
	} else {
		
		console.log("Balance Inquiry for account no. - " + accountNo);
		var _url = "";
		if(_isProd){
			_url = _serverBaseUrl+"BoiMobileBanking/customer/accounts/balance.htm?callback=?&account_nos=" + accountNo; //for c24
		}else{
			_url = _serverBaseUrl+"BoiMobileBanking/customer/accounts.htm?callback=?&customer_id=" + accountNo;
		}
		console.log("balInqHtml not available. fetching latest balances");
		console.log("_url : " + _url);
		var errLog = "Unable to fetch balance of the account";
		setUpOpts(_url, balanceEnquiryCallBack, errLog, accountNo);
	}
}

function getAccountsArrayForBalanceInquiry(totalRecords)
{
    accountsArrBalInq = new Array();
    var cntr = 1;
    
    for(singleRecord in totalRecords)
    {   
        for(curAcc in totalRecords[singleRecord].accounts)
        {
            var custId = totalRecords[singleRecord].accounts[curAcc].accountNo;
            console.log(custId);
            accountsArrBalInq[cntr] = '<li><a href="javascript:showBalanceInquiry(\''+custId +'\');"><span>Account Number</span><span class="span_right">'+custId+'</span></a></li>';
            cntr++;
        }
    }
    console.log(accountsArrBalInq);
    return accountsArrBalInq;
}
	
function getAccountsArrayForMiniStatement(accountNos, accountType)
{
	accountsArr = new Array();
    var cntr = 1;
    
    var accountNumbersList = getFromAccounts("miniStatement", accountNos, accountType);
	var accounts  = accountNumbersList.replace(/account_nos=/g,"").split("&");
	
	console.log("Valid Account List For Mini- Statement - " +accounts);
    
	if(accounts.length <= 0 || accountNumbersList.length <=0) {
	    html = "<li class=\"li_content_background\" ><a class=\"li_content\">No Accounts Found.</a></li>";
	} else {
		for(var i=0; i<accounts.length; i++) {
			if( accounts[i] != null && accounts[i] != "" && accounts[i] != undefined)
                accountsArr[cntr] = '<li><a href="javascript:showMiniStatement(\''+ accounts[i] +'\');"><span>Account Number</span><span class="span_right">'+ accounts[i] +'</span></a></li>';
            cntr++;
        }
    }
    console.log(accountsArr);
    return accountsArr;
}

function showMiniStatements(accountsArray, parentUL, pStart, pEnd)
{
    var acLI = '';
    
    if(pStart > accountsArray.length)
        return;
    
    if(pStart == 1 && pEnd == 10) 
    { 
    	if(parentUL == "balance_inquiry_accounts_list_content")
        	$("#pagination-prev-balanceenq-button").hide();
    	else
        	$("#pagination-prev-ministatement-button").hide();
    	
    } else {
    
    	if(parentUL == "balance_inquiry_accounts_list_content")
    		$("#pagination-prev-balanceenq-button").show();
    	else
    		$("#pagination-prev-ministatement-button").show();
    }
    
    if((accountsArray.length - 1) > pEnd)
	{
    	if(parentUL == "balance_inquiry_accounts_list_content")
    		$("#pagination-next-balanceenq-button").show();
    	else
    		$("#pagination-next-ministatement-button").show();
	
	} else {
	
		if(parentUL == "balance_inquiry_accounts_list_content")
    		$("#pagination-next-balanceenq-button").hide();
		else
			$("#pagination-next-ministatement-button").hide();
	
	}
    
    for(i=pStart; i <= pEnd; i++)
    {
        if(typeof(accountsArray[i]) != 'undefined')
            acLI += accountsArray[i];
    }
    
    var ulElement = document.getElementById(parentUL);
    $(ulElement).html(acLI);
}

function showNextRecords(parentUL, data)
{
    if(pageEnd < data.length)
    {
        pageStart += 10;
        pageEnd += 10;
    }
    showMiniStatements(data, parentUL, pageStart, pageEnd);
}

function showPrevRecords(parentUL, data)
{
    if(pageStart != 1)
    {
        pageStart -= 10;
        pageEnd -= 10;
    }
    
    showMiniStatements(data, parentUL, pageStart, pageEnd);
}

var getBeneficiaryCallBack = function(data){
	var beneficiaries = data;
	
	$('#transaction_amount_imt').val("");
	$('#imt_sender_code').val("");
	$('#imt_mobile_number').val(_senderMobileNumber);
	$('#imt_mobile_number').attr('disabled','disabled');
	$('#imt_payment_remark').val("");
	
	console.log("Beneficiary Data: " +beneficiaries);
	console.log("Beneficiary length: " +beneficiaries.length);
	var html = "<option value='-1' selected=\"selected\">Pay To</option>";
	hideMask();
	if(beneficiaries.length > 0) {

		for(var i=0; i<beneficiaries.length; i++) { 
			var beneficiaryName = beneficiaries[i].beneficiaryName.trim();
			var beneficiaryPhone = beneficiaries[i].beneficiaryMobileNumber.trim();
			html += "<option value='"+beneficiaryPhone+"_"+beneficiaryName+ "'>"+beneficiaryName+"</option>";
		}
		$("#beneficiary_imt").html(html);
		console.log("Beneficiary Name Fetching Completed : " +html);
		
		var accountNumbersList = getFromAccounts("neft",  accountNos, accountType);
		var accounts  = accountNumbersList.replace(/account_nos=/g,"").split("&");
		console.log("Account List for Initiate IMT Transaction : " + accounts);

	  html = "<option value='-1' selected=\"selected\"> Select Account </option>";

		for(var i=0; i<accounts.length; i++) { 
			if( accounts[i] != null && accounts[i] != "" && accounts[i] != undefined){
				for(var j=0;j<allAccounts.length;j++){
					if(allAccounts[j].accNumber==accounts[i]){
						html += "<option value='"+allAccounts[j].custId+"_"+ accounts[i] +"'>"+ accounts[i]+"</option>";
					}
				}
			}

		}
		
		$("#from_account_imt").html(html);
		document.getElementById("isTermSelected").checked = false;
		$.ui.loadContent("#imt_fund_transfer_page", false, false, "slide");
	}
	else {

		alert("You do not have any beneficiary added");
	}
};

var syncAccountCallback = function (data) {
	if(data[0].customerId != "") {
		
		InitailizeMyAccounts(data);
		pageStart = 1;
		pageEnd = 10;
		cacheMap = new Map();
		if($.ui.activeDiv.attributes.id.value == "balance_inquiry_accounts_list"){
			
			$("#pagination-prev-balanceenq-button").show();
			$("#pagination-next-balanceenq-button").show();
			showMiniStatements(accountsArrBalInq, 'balance_inquiry_accounts_list_content', 1, 10);
		}
		else {
			
			$("#pagination-prev-ministatement-button").hide();
			$("#pagination-next-ministatement-button").show();
			showMiniStatements(accountsArr, 'mini_statement_accounts_content', 1, 10);
		}
		alert("Accounts sync completed successfully");
	}
	else {
		alert("Failed to Sync Accounts");
	}
	hideMask();
};

var syncBeneficiaryCallBack = function( data){
    var beneficiaries = data;
    console.log("Sync Beneficiary Data: " +beneficiaries);
    console.log("Sync Beneficiary length: " +beneficiaries.length);
	var html = "<option value='Select Beneficiary' selected=\"selected\">Select Beneficiary</option>";
	hideMask();
	if(beneficiaries.length > 0) {
		
		for(var i=0; i<beneficiaries.length; i++) { 
			html += "<option value='"+ beneficiaries[i].bankCode + "_" + beneficiaries[i].branchCode + "_" + beneficiaries[i].accountType + "_" 
					+ beneficiaries[i].payeeName + "_" + beneficiaries[i].branchAddress + "_" + beneficiaries[i].consumerCode + "_" 
					+ beneficiaries[i].accountNo + "_" + beneficiaries[i].branchName + "_" + beneficiaries[i].city + "_" + beneficiaries[i].state + "_" 
					+ beneficiaries[i].bankName + "'>"+ beneficiaries[i].payeeName+ " - " + beneficiaries[i].accountNo +"</option>";
		}
		$("#beneficiary_neft").html(html);
		console.log("Sync Beneficiary Account Completed : " +html);
		alert("Beneficiary sync completed successfully");
	}
	else {
		
		alert("You do not have any beneficiary added");
	}
};

var txnPwdValidationForIMTAddBeneficiaryCallback = function(verifyMPINResult) {
	
	
	console.log("inside callback NEFT " + verifyMPINResult.responseFlag);
	console.log("inside callback transactionPasswordAttempts NEFT:- " + verifyMPINResult.transactionPasswordAttempts);

	if(verifyMPINResult.responseFlag == "success")
	{
		hideMask();	
		var _url = "";
		var zsid = "";
		
		_url = _serverBaseUrl+"BoiMobileBanking/beneficiary/imt/addImtBeneficiary.htm?callback=?"; 
		
		var beneficiaryValues = $("#beneficiary_neft").val();
		var beneficiaryDetails = beneficiaryValues.split("_");
		
		_url += "&userId=" + _userId
		+ "&beneficiryName="+ $("#confirmation_imt_add_beneficiary_name").text() 
		+ "&beneficiaryMobNumber="+ $("#confirmation_imt_add_beneficiary_mobile_number").text()
		+ "&address="+ $("#confirmation_imt_add_beneficiary_address").text()
		+ "&pinCode="+ $("#confirmation_imt_add_beneficiary_pin_code").text()
		+ "&nickName="+ $("#confirmation_imt_add_beneficiary_nick_name").text()
		+ "&senderMobNumber="+ $("#confirmation_imt_add_sender_mobile_number").text()
		+ "&branchName="+ $("#confirmation_imt_add_branch_name").text();
		
		console.log("_url : " + _url);
		var errLog = "IMT add beneficiary failed";
		setUpOpts(_url, IMTAddBeneficiaryCallback, errLog);
		$.ui.showMask("Please wait while we process your request");
		$("body").append('<div class="modalWindow"/>');
		
	}
	else if(verifyMPINResult.responseFlag == "failure"){
		hideMask();
		$('#mpin_imt_add_beneficiary').val("");
		if(verifyMPINResult.transactionPasswordStatus == "SUSPENDED"){
			alert("Your 3 transaction attempts have been exceeded. Your transaction password has been suspended for security reasons.");
			clearHistory();
		}
		else if((verifyMPINResult.transactionPasswordAttempts > 0 || verifyMPINResult.transactionPasswordAttempts < 4) && verifyMPINResult.transactionPasswordStatus == "ACTIVE"){
			alert("Please Enter Valid Transaction Password. Only " + (3 - parseInt(verifyMPINResult.transactionPasswordAttempts)) + " attempts left.");
		}
	}
};

var IMTAddBeneficiaryCallback = function(data) {
	console.log("result of addition of imt beneficiary:-" + data);
	hideMask();
	var html = "";
	
	if(data.responseCode == "E0000") {
		html = "<div class= \"transfer_detail_row\"><div class=\"row_label\"> Beneficiary Name: </div>" +
				"<div class=\"row_value\">"+$("#confirmation_imt_add_beneficiary_name").text()+"</div></div>"+
				"<div class= \"transfer_detail_row\"><div class=\"row_label\"> Beneficiary Mobile Number: </div>" +
				"<div class=\"row_value\">"+$("#confirmation_imt_add_beneficiary_mobile_number").text()+"</div></div>"+
				"<div class= \"transfer_detail_row\"><div class=\"row_label\"> Beneficiary Address: </div>" +
				"<div class=\"row_value\">"+$("#confirmation_imt_add_beneficiary_address").text()+"</div></div>"+
				"<div class= \"transfer_detail_row\"><div class=\"row_label\"> Beneficiary Pin Code: </div>" +
				"<div class=\"row_value\">"+$("#confirmation_imt_add_beneficiary_pin_code").text()+"</div></div>"+
				"<div class= \"transfer_detail_row\"><div class=\"row_label\"> Beneficiary Nick Name: </div>" +
				"<div class=\"row_value\">"+$("#confirmation_imt_add_beneficiary_nick_name").text()+"</div></div>"+
				"<div class= \"transfer_detail_row\"><div class=\"row_label\"> Sender Mobile Number: </div>" +
				"<div class=\"row_value\">"+$("#confirmation_imt_add_sender_mobile_number").text()+"</div></div>"+
				"<div class= \"btn_outer_div\"><a href=\"javascript:clearHistory();\" " +
				"id=\"successfull_transfer_btn\" class=\"fund_transfer_right_btn\"> OK </a></div>";
		$("#confirmation_add_beneficiary_notification").html(html);
		$.ui.loadContent("#confirmation_add_beneficiary_notification_page", false, false, "slide");
	}
	else if(data.responseCode != null && data.responseMessage != null) {
		alert(data.responseCode +": "+data.responseMessage);
	}
	else {
		alert("Unable to add IMT beneficiary");
	}
};

function clearIMTAddBeneficiaryPage() {
	$("#imt_beneficiary_name").val("");
	$("#imt_beneficiary_mobile_number").val("");
	$("#imt_beneficiary_address").val("");
	$("#imt_beneficiary_pin_code").val("");
	$("#imt_beneficiary_nick_name").val("");
	$("#imt_sender_mobile_number").val(_senderMobileNumber);
	$("#imt_sender_mobile_number").attr("disabled","disabled");
	$("#imt_beneficiary_branch_name").val("");

}

var getIMTBeneficiariesCallBack = function(data) {
	var beneficiaries = data;
	console.log("IMT beneficiries length : " + beneficiaries.length);
	var html = "";
	
	if(beneficiaries.length > 0){
		
		for(var i = 0; i < beneficiaries.length; i++){
			var name = beneficiaries[i].beneficiaryName.split(" ");
			html += "<div class=\"list_content_div_flexible\">"
					+"<div>"
					+"<div>" 
					+"<div class=\"beneficiary_detail_left bold\">Name :</div>"
					+"<div class=\"beneficiary_detail_left beneficiary_full_name\">" + name[0] + "</div>"
					+"<div class=\"beneficiary_option\">"
					+"<img class=\"beneficiary_info\" onclick=\"javascript:showBeneficiaryDetails(this);\" src=\"static/images/Sign-Info-icon.png\">"
					+"<img class=\"delete_beneficiary\" onclick=\"deleteBeneficiaryDetails(this, '"+ beneficiaries[i].beneficiaryMobileNumber +"', '" + _senderMobileNumber +"');\" src=\"static/images/System-Delete-icon.png\">"
					+"</div>"
					+"</div>"
					+"<div>"
					+"<div class=\"beneficiary_detail_left width_35 bold\">Mob.No :</div>"
					+"<div class=\"beneficiary_detail_left\">" + beneficiaries[i].beneficiaryMobileNumber + "</div>"
					+"</div>"
					+"<div class=\"beneficiary_detail\" jqmoldstyle=\"block\">"
					+"<div class=\"beneficiary_detail_left bold\" >Nick Name :</div>"
					+"<div class=\"beneficiary_detail_left beneficiary_full_name\" >" + beneficiaries[i].nickName + "</div>"
					+"<div class=\"beneficiary_detail_left bold\">Address :</div>"
					+"<div class=\"beneficiary_detail_left\">"+ beneficiaries[i].beneficiaryAddress +"</div>"
					+"</div>"
					+"</div>"
					+"</div>";
		}
	}
	else {
		html += "<div class='li_content padding-10'>"
					+"<span>"
						+"Imt Beneficiary not added."
						+" Please click Add+ button to add beneficiary"
					+"</span>"
				+"</div>";
	}
	$("#imt_manage_beneficiary_list").html(html);
	$.ui.loadContent("#imt_manage_beneficiary_page", false, false, "slide");
	hideMask();
};

function showBeneficiaryDetails(obj) {
	$(obj.parentNode.parentNode.parentNode).find('.beneficiary_detail').toggle();	
}

function deleteBeneficiaryDetails(obj, beneficiaryMobileNumber, senderMobileNumber) {
	var res = confirm("Are you sure you want to delete beneficiary '" + $(obj.parentNode.parentNode.parentNode).find('.beneficiary_full_name').html().trim() + "' ?");
	if(res == true) {
		showMask();
		var _url = _serverBaseUrl +"BoiMobileBanking/beneficiary/imt/deleteImtBeneficiary.htm?callback=?&userId=" + _userId + 
			"&beneficiaryMobNumber=" + beneficiaryMobileNumber.trim() + "&senderMobNumber=" + senderMobileNumber.trim();
		setUpOpts(_url, deteleIMTBeneficiaryCallBack, "Failed to detele beneficiary", obj);
	}
}

var deteleIMTBeneficiaryCallBack = function(data, obj) {
	console.log("Delete IMT Beneficiary response code:- " + data.responseCode);
	hideMask();
	if(data.responseCode == "E0000"){
		alert("Beneficiary delete successfully with Mobile number : " + data.beneficiaryMobileNumber);
		$(obj.parentNode.parentNode.parentNode.parentNode).remove();
	}
	else {
		alert("Failed to delete beneficiary with Mobile number : " + data.beneficiaryMobileNumber);
	}
};

var getImtTransactionListCallBack = function(data) {
	
	imtTransactionList = data;
	console.log("IMT Transaction List length : " + imtTransactionList.length);
	var html = "";

	if(imtTransactionList != null && imtTransactionList !="No transaction list for given parameters") {
		if(imtTransactionList.length == 0) {
			html = "<div class=\"mini_statement_transaction_not_found li_content\">No Transactions Available<div>";
		}
		else {
			for(var i = 0; i < imtTransactionList.length; i++) {
				html += "<div id=\'transaction"+i+"\' class=\"list_content_div_flexible toggle_status_div\">"
					    +"<div class=\"transfer_list_click\">"
					    +"<div class=\"half\"><div class=\"transfer_status_div check_status_width_45 bold\">Mobile No :</div><div class=\"transfer_status_div check_status_width_45\">"+(imtTransactionList[i].beneficiaryMobileNumber).substring(5)+"</div></div>"
					    +"<div class=\"half\"><div class=\"transfer_status_div check_status_width_45\"><div class=\"bold\">Amount :</div>"+"&nbsp;"+imtTransactionList[i].transactionAmount+"</div>"
					    +"<div class=\"transfer_status_div check_status_width_45\"><div class=\"bold\">Txn Date :</div>"+"&nbsp;"+imtTransactionList[i].transactionDateTime+"</div>"
					    +"</div>"
					    +"</div>"
					    +"</div>";
			}
		}
		
		$("#imt_transaction_list").html(html);
		$.ui.loadContent("#imt_transaction_status_list_page", false, false, "slide");
		$('#cancel_transfer_status_list_page').css("margin-left",$('#imt_transaction_status_list_page').width()*.33+"px");
	}
	else {
		alert("No Imt Transaction found");
	}
	hideMask();
	bindToggleClickEvent();
};

var imtCheckStatusCallBack = function(data,id) {
	
	imtTransactionDetails = data;
	var html = "";
	var imtStatus = imtTransactionDetails.status;
	
	if(imtStatus == "1") {
		imtStatus = "Authorized";
	}
	else if(imtStatus == "2") {
		imtStatus = "Cancelled";
	}
	else if(imtStatus == "5") {
		imtStatus = "Paid";
	}
	else {
		imtStatus = "Failed";
	}
	
	console.log("Check status response :"+ imtTransactionDetails);
	if(imtTransactionDetails != null) {
		if(imtTransactionDetails.status == "1") {
			html += "<div class=\"transfer_list_detail_toggel first\" jqmoldstyle=\"block\">"
					+"<div class=\"half\"><div class=\"transfer_status_div check_status_width_45 bold\">Emitter-Ticket :</div><div class=\"transfer_status_div check_status_width_45\">"+imtTransactionDetails.emitterTicket+"</div></div>"
					+"<div class=\"half\"><div id=\"imt_status\" class=\"transfer_status_div check_status_width_45\"><div class=\"bold\">Status :</div>"+"&nbsp;"+imtStatus+"</div>"
					+"<div id=\"expiry_date\" class=\"transfer_status_div width_55\"><div class=\"bold\">Exp Date :</div>"+"&nbsp;"+imtTransactionDetails.expiryDate+"</div>"
					+"</div>"
					+"<div>"
					+"<a id=\'cancel_imt"+id+"\' type=\"button\" class=\"cancel_imt_transaction\">Cancel Transaction</a>"
					+"</div>"
					+"</div>";
		}
		else {
			html += "<div class=\"transfer_list_detail_toggel first\" jqmoldstyle=\"block\">"
				+"<div class=\"half\"><div class=\"transfer_status_div check_status_width_45 bold\">Emitter-Ticket  :</div><div class=\"transfer_status_div check_status_width_45\">"+imtTransactionDetails.emitterTicket+"</div></div>"
				+"<div class=\"half\"><div id=\"imt_status\" class=\"transfer_status_div check_status_width_45\"><div class=\"bold\">Status :</div>"+"&nbsp;"+imtStatus+"</div>"
				
			if(imtTransactionDetails.expiryDate == undefined || imtTransactionDetails.expiryDate == null) {
				html += "<div id=\"expiry_date\" class=\"transfer_status_div width_55\"><div class=\"bold\">Exp Date :</div>----</div>"
						+"</div>"
						+"</div>";
			} else {
				html += "<div id=\"expiry_date\" class=\"transfer_status_div width_55\"><div class=\"bold\">Exp Date :</div>"+"&nbsp;"+imtTransactionDetails.expiryDate+"</div>"
						+"</div>"
						+"</div>";
			}
		}
	}
		
	var divId = "transaction"+id; 
			
	cacheMap.put("imtCheckStatusHtml_"+id, html);
	$("#"+divId).append(html);
	$(this).find('.transfer_list_detail_toggel').toggle();
	hideMask();
	cancelImt();
};

var txnPwdValidationForCancelIMTCallback = function(verifyMPINResult) {
	
	$('#mpin_cancel_imt').val("");
	console.log("inside callback cancel IMT " + verifyMPINResult.responseFlag);
	console.log("inside callback transactionPasswordAttempts cancel IMT:- " + verifyMPINResult.transactionPasswordAttempts);

	if(verifyMPINResult.responseFlag == "success")
	{
		hideMask();
		var _url = "";
		var zsid = "";
		
		if(_isProd)
		{
			_url = _serverBaseUrl+"BoiMobileBanking/fundtransfer/cancel-imt.htm?callback=?"; 
			zsid = R2FA4AHAJSI.getZRSessionId();
		}
		else 
		{
			_url = _serverBaseUrl+"BoiMobileBanking/fundtransfer/cancel-imt.htm?callback=?"; 
			zsid = 'sample';
		}
		
		_url += "&zSessionId=" + zsid +"&userId=" + _userId
		+ "&reasonId=" 
		+ "&emitterTicket="+ $("#confirmation_emitter_ticket").text()
		+ "&reasonDesc="
		+ "&traceNumber="+ $("#confirmation_trace_number").text()
		+ "&beneficiaryMobile="+ $("#confirmation_beneficiary_mobile").text()
		+ "&initiatorAccount="+ $("#confirmation_account_number").text();
		
		console.log("_url : " + _url);
		var errLog = "Failed to cancel IMT transaction";
		setUpOpts(_url, cancelImtCallback, errLog);
		$.ui.showMask("Please wait while we process your request");
		$("body").append('<div class="modalWindow"/>');	
	}
	else if(verifyMPINResult.responseFlag == "failure"){
		hideMask();
		$('#mpin_cancel_imt').val("");
		if(verifyMPINResult.transactionPasswordStatus == "SUSPENDED"){
			alert("Your 3 transaction attempts have been exceeded. Your transaction password has been suspended for security reasons.");
			clearHistory();
		}
		else if((verifyMPINResult.transactionPasswordAttempts > 0 || verifyMPINResult.transactionPasswordAttempts < 4) && verifyMPINResult.transactionPasswordStatus == "ACTIVE"){
			alert("Please Enter Valid Transaction Password. Only " + (3 - parseInt(verifyMPINResult.transactionPasswordAttempts)) + " attempts left.");
		}
	}
};

var cancelImtCallback = function(data) {

	var response = data;
	hideMask();
	if(response != null) {
		alert(response.responseMessage);
	}
	var loc = $("#list_location").text();
	$(loc + " #imt_status").text("Cancelled");
	$(loc + " .cancel_imt_transaction").addClass("hide-option");
	$.ui.goBack();
};

var syncIMTBeneficiariesCallback = function(data) {
	var imtBeneficiaries = data;
	hideMask();
	if(imtBeneficiaries == true) {
		alert("IMT Beneficiaries are synced.");
	}
	else {
		alert("IMT Beneficiaries sync failed.");
	}
};