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

function setUpCreditCard(){
	
	$("#currentStatementAccounts").unbind('click').click(function(){
		showMask();
		var currentStatementAccountsHtml = cacheMap.get("currentStatementAccounts");
		if(currentStatementAccountsHtml && currentStatementAccountsHtml != null && currentStatementAccountsHtml != ""){
			console.log("currentStatementAccountsHtml already available");
			$.ui.loadContent("#current_statement_accounts", false, false, "slide");
			hideMask();
		} else {
			var _url = _serverBaseUrl + "BoiMobileBanking/customer/credit-card/accounts.htm?callback=?&customerId=" + $("#cust_id").val();
			var opts = {
					type : "GET",
					async:false,
					cache: true,
					dataType : 'jsonp',
					success : function(data) {
						console.log("ajax call success");
						var creditAccounts = data;
						var html = "";
						if(creditAccounts.length <= 0) 
							html += "<li><a>No Accounts Found.</a></li>";
						else { 
							for(var i=0; i<creditAccounts.length; i++) { 
								html += "<li><a href=\"javascript:showCurrentStatement('"+creditAccounts[i].creditCardNo+"');\"><span>Card Number</span><span class=\"span_right\">"+ creditAccounts[i].creditCardNo +"</span></a></li>";
							}
						}
						$("#current_statement_accounts_content").html(html);
						$.ui.loadContent("#current_statement_accounts", false, false, "slide");
						hideMask();
						cacheMap.put("currentStatementAccounts", true);
					},
					error : function(data) {
						var errLog = "Current Statement : Unable to fetch customer account numbers";
						console.log(errLog);
						alert(errLog);
						hideMask();
					},
					url : _url
			};
			$.ajax(opts);
		}

	});
	
	$("#lastPaymentDetailsAccounts").unbind('click').click(function(){
		showMask();
		var lastPaymentDetailsAccountsHtml = cacheMap.get("lastPaymentDetailsAccounts");
		if(lastPaymentDetailsAccountsHtml && lastPaymentDetailsAccountsHtml != null && lastPaymentDetailsAccountsHtml != ""){
			console.log("lastPaymentDetailsAccountsHtml already available");
			$.ui.loadContent("#last_payment_details_accounts", false, false, "slide");
			hideMask();
		} else {
			var _url = _serverBaseUrl + "BoiMobileBanking/customer/credit-card/accounts.htm?callback=?&customerId=" + $("#cust_id").val();
			var opts = {
					type : "GET",
					async:false,
					cache: true,
					dataType : 'jsonp',
					success : function(data) {
						console.log("ajax call success");
						var creditAccounts = data;
						var html = "";
						if(creditAccounts.length <= 0) 
							html += "<li><a>No Accounts Found.</a></li>";
						else { 
						for(var i=0; i<creditAccounts.length; i++) { 
							html += "<li><a href=\"javascript:showLastPaymentDetails('"+creditAccounts[i].creditCardNo+"');\"><span>Card Number</span><span class=\"span_right\">"+ creditAccounts[i].creditCardNo +"</span></a></li>";
						}
						}
						$("#last_payment_details_accounts_content").html(html);
						$.ui.loadContent("#last_payment_details_accounts", false, false, "slide");
						hideMask();
						cacheMap.put("lastPaymentDetailsAccounts", true);
					},
					error : function(data) {
						var errLog = "Last Payment details : Unable to fetch customer account numbers";
						console.log(errLog);
						alert(errLog);
						hideMask();
					},
					url : _url
				};
			$.ajax(opts);
		}
	});
	
	$("#lastTransaction").unbind('click').click(function(){
		showMask();
		var lastTransactionHtml = cacheMap.get("lastTransaction");
		if(lastTransactionHtml && lastTransactionHtml != null && lastTransactionHtml != ""){
			console.log("lastTransactionHtml already available");
			$.ui.loadContent("#last_transaction_accounts", false, false, "slide");
			hideMask();
		} else {
			var _url = _serverBaseUrl + "BoiMobileBanking/customer/credit-card/accounts.htm?callback=?&customerId=" + $("#cust_id").val();
			var opts = {
					type : "GET",
					async:false,
					cache: true,
					dataType : 'jsonp',
					success : function(data) {
						console.log("ajax call success");
						var creditAccounts = data;
						var html = "";
						if(creditAccounts.length <= 0) 
							html += "<li><a>No Accounts Found.</a></li>";
						else { 
						for(var i=0; i<creditAccounts.length; i++) { 
							html += "<li><a href=\"javascript:showLastTransaction('"+creditAccounts[i].creditCardNo+"');\"><span>Card Number</span><span class=\"span_right\">"+ creditAccounts[i].creditCardNo +"</span></a></li>";
						}
						}
						$("#last_transaction_accounts_content").html(html);
						$.ui.loadContent("#last_transaction_accounts", false, false, "slide");
						hideMask();
						cacheMap.put("lastTransaction", true);
					},
					error : function(data) {
						var errLog = "Last transaction : Unable to fetch customer account numbers";
						console.log(errLog);
						alert(errLog);
						hideMask();
					},
					url : _url
				};
			$.ajax(opts);
		}

	});
}

function showCurrentStatement(creditCardNo){
	showMask();
	var showCurrentStatementHtml = cacheMap.get("showCurrentStatement");
	if(showCurrentStatementHtml && showCurrentStatementHtml != null && showCurrentStatementHtml != ""){
		console.log("showCurrentStatementHtml already available");
		$.ui.loadContent("#current_statement", false, false, "slide");
		hideMask();
	} else {
		var _url = _serverBaseUrl + "BoiMobileBanking/customer/credit-card/current-statement.htm?callback=?&creditCardNo=" + creditCardNo;
		var opts = {
				type : "GET",
				async:false,
				cache: true,
				dataType : 'jsonp',
				success : function(data) {
					console.log("ajax call success");
					var currentStatement = data;
					var html = "";
					if(currentStatement.length <= 0)
					html = "<li class=\"li_content_background\"><a class=\"li_content\">No Accounts Found.</a></li>";
					else { 
						if(_isTablet == true){
							html = "<li class=\"li_content_background\"><a class=\"credit_card_li_content_big\" ><span> Balance </span><span class=\"span_right\"><img class=\"credit_card_rupee_image\" src=\"static/images/rupee.png\" title=\"INR\" alt=\"INR\"/> " + currentStatement.balance + "</span></a></li>"+
							"<hr class=\"hr_margin\" />"+
							"<li class=\"li_content_background\"><a class=\"credit_card_li_content_big\" ><span> Total Payment Due </span><span class=\"span_right\"><img class=\"credit_card_rupee_image\" src=\"static/images/rupee.png\" title=\"INR\" alt=\"INR\"/> "+ currentStatement.totalPaymentDue + "</span></a></li>"+
							"<hr class=\"hr_margin\" />"+
							"<li class=\"li_content_background\"><a class=\"credit_card_li_content_big\" ><span> Minimum Payment Due </span><span class=\"span_right\"><img class=\"credit_card_rupee_image\" src=\"static/images/rupee.png\" title=\"INR\" alt=\"INR\"/> " + currentStatement.mininumPaymentDue + "</span></a></li>"+
							"<hr class=\"hr_margin\" />"+
							"<li class=\"li_content_background\"><a class=\"credit_card_li_content_big\" ><span> Payment Due Date </span><span class=\"span_right\">"+currentStatement.paymentDueDate +"</span></a></li>"+
							"<hr class=\"hr_margin\" />"+
							"<li class=\"li_content_background\"><a class=\"credit_card_li_content_big\" ><span> Credit Limit </span><span class=\"span_right\"><img class=\"credit_card_rupee_image\" src=\"static/images/rupee.png\" title=\"INR\" alt=\"INR\"/> " + currentStatement.creditLimit + "</span></a></li>"+
							"<hr class=\"hr_margin\" />";
						} else {
							html = "<li class=\"li_content_background\"><a class=\"credit_card_li_content_small\" ><span> Balance </span><span class=\"span_right\"><img class=\"credit_card_small_rupee_image\" src=\"static/images/rupee.png\" title=\"INR\" alt=\"INR\"/> " + currentStatement.balance + "</span></a></li>"+
							"<hr class=\"hr_margin\" />"+
							"<li class=\"li_content_background\"><a class=\"credit_card_li_content_small\" ><span> Total Payment Due </span><span class=\"span_right\"><img class=\"credit_card_small_rupee_image\" src=\"static/images/rupee.png\" title=\"INR\" alt=\"INR\"/> "+ currentStatement.totalPaymentDue + "</span></a></li>"+
							"<hr class=\"hr_margin\" />"+
							"<li class=\"li_content_background\"><a class=\"credit_card_li_content_small\" ><span> Minimum Payment Due </span><span class=\"span_right\"><img class=\"credit_card_small_rupee_image\" src=\"static/images/rupee.png\" title=\"INR\" alt=\"INR\"/> " + currentStatement.mininumPaymentDue + "</span></a></li>"+
							"<hr class=\"hr_margin\" />"+
							"<li class=\"li_content_background\"><a class=\"credit_card_li_content_small\" ><span> Payment Due Date </span><span class=\"span_right\">"+currentStatement.paymentDueDate +"</span></a></li>"+
							"<hr class=\"hr_margin\" />"+
							"<li class=\"li_content_background\"><a class=\"credit_card_li_content_small\" ><span> Credit Limit </span><span class=\"span_right\"><img class=\"credit_card_small_rupee_image\" src=\"static/images/rupee.png\" title=\"INR\" alt=\"INR\"/> " + currentStatement.creditLimit + "</span></a></li>"+
							"<hr class=\"hr_margin\" />";
						}
					
					}
					$("#current_statement_content").html(html);
					$.ui.loadContent("#current_statement", false, false, "slide");
					hideMask();
					cacheMap.put("showCurrentStatement", true);
				},
				error : function(data) {
					var errLog = "Unable to fetch current statement for credit card number : " + creditCardNo;
					console.log(errLog);
					alert(errLog);
					hideMask();
				},
				url : _url
			};
			$.ajax(opts);
	}
	
}

function showLastPaymentDetails(creditCardNo){
	showMask();
	var showLastPaymentDetailstHtml = cacheMap.get("showLastPaymentDetails");
	if(showLastPaymentDetailstHtml && showLastPaymentDetailstHtml != null && showLastPaymentDetailstHtml != ""){
		console.log("showLastPaymentDetailstHtml already available");
		$.ui.loadContent("#last_payment_details", false, false, "slide");
		hideMask();
	} else {
		var _url = _serverBaseUrl + "BoiMobileBanking/customer/credit-card/last-payment-details.htm?callback=?&creditCardNo=" + creditCardNo;
		var opts = {
				type : "GET",
				async:false,
				cache: true,
				dataType : 'jsonp',
				success : function(data) {
					console.log("ajax call success");
					var lastPaymentDetails = data;
					var html = "";
					if(lastPaymentDetails.length <= 0) 
						html = "<li class=\"li_content_background\" ><a class=\"li_content\">No Accounts Found.</a></li>";
					else { 
						if(_isTablet == true){
							html = "<li class=\"li_content_background\"><a class=\"credit_card_li_content_big\" ><span> Credit Card Number </span><span class=\"span_right\">" + lastPaymentDetails.creditCardNo + "</span></a></li>"+
							"<hr class=\"hr_margin\" />"+
							"<li class=\"li_content_background\"><a class=\"credit_card_li_content_big\" ><span> Card Holder Name </span><span class=\"span_right\">" + lastPaymentDetails.cardHolderName + "</span></a></li>"+
							"<hr class=\"hr_margin\" />"+
							"<li class=\"li_content_background\"><a class=\"credit_card_li_content_big\" ><span> Debit Account Number </span><span class=\"span_right\">" + lastPaymentDetails.debitAccountNo + "</span></a></li>"+
							"<hr class=\"hr_margin\" />"+
							"<li class=\"li_content_background\"><a class=\"credit_card_li_content_big\" ><span> Amount </span><span class=\"span_right\"><img class=\"credit_card_rupee_image\" src=\"static/images/rupee.png\" title=\"INR\" alt=\"INR\"/> " + lastPaymentDetails.amount + "</span></a></li>"+
							"<hr class=\"hr_margin\" />"+
							"<li class=\"li_content_background\"><a class=\"credit_card_li_content_big\" ><span> Transaction Date And Time </span><span class=\"span_right\">" + lastPaymentDetails.transactionDateAndTime + "</span></a></li>"+
							"<hr class=\"hr_margin\" />";
						} else {
							html = "<li class=\"li_content_background\"><a class=\"credit_card_li_content_background_tiny\" ><span> Credit Card Number </span><span class=\"span_right\">" + lastPaymentDetails.creditCardNo + "</span></a></li>"+
							"<hr class=\"hr_margin\" />"+
							"<li class=\"li_content_background\"><a class=\"credit_card_li_content_background_tiny\" ><span> Card Holder Name </span><span class=\"span_right\">" + lastPaymentDetails.cardHolderName + "</span></a></li>"+
							"<hr class=\"hr_margin\" />"+
							"<li class=\"li_content_background\"><a class=\"credit_card_li_content_background_tiny\" ><span> Debit Account Number </span><span class=\"span_right\">" + lastPaymentDetails.debitAccountNo + "</span></a></li>"+
							"<hr class=\"hr_margin\" />"+
							"<li class=\"li_content_background\"><a class=\"credit_card_li_content_background_tiny\" ><span> Amount </span><span class=\"span_right\"><img class=\"credit_card_small_rupee_image\" src=\"static/images/rupee.png\" title=\"INR\" alt=\"INR\"/> " + lastPaymentDetails.amount + "</span></a></li>"+
							"<hr class=\"hr_margin\" />"+
							"<li class=\"li_content_background\"><a class=\"credit_card_li_content_background_tiny\" ><span> Transaction Date And Time </span><span class=\"span_right\">" + lastPaymentDetails.transactionDateAndTime + "</span></a></li>"+
							"<hr class=\"hr_margin\" />";
						}
						
					}  
					$("#last_payment_details_content").html(html);
					$.ui.loadContent("#last_payment_details", false, false, "slide");
					hideMask();
					cacheMap.put("showLastPaymentDetails", true);
				},
				error : function(data) {
					var errLog = "Unable to fetch last payment details for credit card number : " + creditCardNo;
					console.log(errLog);
					alert(errLog);
					hideMask();
				},
				url : _url
			};
			$.ajax(opts);
	}

}

function showLastTransaction(creditCardNo){
	showMask();
	var showLastTransactiontHtml = cacheMap.get("showLastTransaction");
	if(showLastTransactiontHtml && showLastTransactiontHtml != null && showLastTransactiontHtml != ""){
		console.log("showLastTransactiontHtml already available");
		$.ui.loadContent("#last_transaction", false, false, "slide");
		hideMask();
	} else {
		var _url = _serverBaseUrl + "BoiMobileBanking/customer/credit-card/last-transaction.htm?callback=?&creditCardNo=" + creditCardNo;
		var opts = {
				type : "GET",
				async:false,
				cache: true,
				dataType : 'jsonp',
				success : function(data) {
					console.log("ajax call success");
					var lastTransaction = data;
					var html = "";
					
					 if(lastTransaction.length <= 0) 
					html = 	"<div class=\"li_content_background\">"+
					 		"<div class=\"mini_statement_main_content\">"+
						 	"<span class=\"mini_statement_description\">No Transactions Found.</span>"+
						 	"</div >"+
						 	"</div>";
				 else { 
					 for(var i = 0; i < lastTransaction.length; i++) { 
						 if(_isTablet == true){
							 html += "<div class=\"credit_card_li_content_background_big\">"+
						 		"<div class=\"credit_card_main_content\">"+
							 	"<span class=\"credit_card_description\">" + lastTransaction[i].description + "</span>"+
							 	"<span class=\"credit_card_date\">" + lastTransaction[i].transactionDate + "</span>"+
							 	"</div >"+
							 	"<div class=\"credi_card_amount\">"+
							 	"<img class=\"credit_card_rupee_image\" src=\"static/images/rupee.png\" title=\"INR\" alt=\"INR\"/> " + lastTransaction[i].amount + ""+
							 	 "</div >"+
							 	 "</div>"+
							 	 "<hr style=\"clear:both\"/>";
						 } else {
							 html += "<div class=\"credit_card_li_content_background_small\">"+
						 		"<div class=\"credit_card_main_content\">"+
							 	"<span class=\"credit_card_description\">" + lastTransaction[i].description + "</span>"+
							 	"<span class=\"credit_card_date\">" + lastTransaction[i].transactionDate + "</span>"+
							 	"</div >"+
							 	"<div class=\"credi_card_amount\">"+
							 	"<img class=\"credit_card_small_rupee_image\" src=\"static/images/rupee.png\" title=\"INR\" alt=\"INR\"/> " + lastTransaction[i].amount + ""+
							 	 "</div >"+
							 	 "</div>"+
							 	 "<hr style=\"clear:both\"/>";
						 }
					 
					 }
				 	}
					$("#last_transaction_content").html(html);
					$.ui.loadContent("#last_transaction", false, false, "slide");
					hideMask();
					cacheMap.put("showLastTransaction", true);
				},
				error : function(data) {
					var errLog = "Unable to fetch last transaction for credit card number : " + creditCardNo;
					console.log(errLog);
					alert(errLog);
					hideMask();
				},
				url : _url
			};
			$.ajax(opts);
	}
}