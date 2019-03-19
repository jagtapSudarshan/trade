var OSType = "Unknown OS";

function openCustomURLinIFrame(src) {
    var url = "js2ios:";
    url += src;
    var rootElm = document.documentElement;
    var newFrameElm = document.createElement("IFRAME");
    newFrameElm.setAttribute("src", url);
    rootElm.appendChild(newFrameElm);
    // remove the frame now
    newFrameElm.parentNode.removeChild(newFrameElm);
}

function detectOS() {
	if (navigator.platform.toUpperCase().indexOf("WIN") !== -1)
		OSType = "Windows";
	else if (navigator.platform.toUpperCase().indexOf("IPHONE") !== -1)
		OSType = "Iphone";
	else if (navigator.platform.toUpperCase().indexOf("IPAD") !== -1)
        OSType = "Ipad";
	else if (navigator.platform.toUpperCase().indexOf("LINUX") !== -1)
		OSType = "Android";
	console.log("OS type: " + OSType);
}

function logOut(){
    if (OSType == "Android")
        R2FA4AHAJSI.logoutFromJs();
    else if (OSType == "Iphone" || OSType == "Ipad")
        javascript: openCustomURLinIFrame("logout");
}

function changePin(){
    if (OSType == "Android")
        R2FA4AHAJSI.onOpenSiteByTitle('ChangePIN');
    else if (OSType == "Iphone" || OSType == "Ipad")
        javascript: openCustomURLinIFrame("ChangePIN");
}

function changeSecretQuestion() {
    if (OSType == "Android")
        R2FA4AHAJSI.onOpenSiteByTitle('ChangeSecretQA');
    else if (OSType == "Iphone" || OSType == "Ipad")
        javascript: openCustomURLinIFrame("ChangeSecretQA");
}

function openErpBiTest() {
    if (OSType == "Android")
        R2FA4AHAJSI.onOpenSiteByTitle("BI-TEST");
    else if (OSType == "Iphone" || OSType == "Ipad")
        javascript: openCustomURLinIFrame("BI-TEST");
}

function openErpBiProduction() {
    if (OSType == "Android")
        R2FA4AHAJSI.onOpenSiteByTitle("BI-PROD");
    else if (OSType == "Iphone" || OSType == "Ipad")
        javascript: openCustomURLinIFrame("BI-PROD");
}

function openErp() {
    if (OSType == "Android")
        R2FA4AHAJSI.onOpenSiteByTitle("ERP");
    else if (OSType == "Iphone" || OSType == "Ipad")
        javascript: openCustomURLinIFrame("ERP");
}

function openWebView1(){
    if (OSType == "Android")
        R2FA4AHAJSI.onOpenSiteByTitle('WebView1');
    else if (OSType == "Iphone" || OSType == "Ipad")
        javascript: openCustomURLinIFrame("WebView1");
}

function openWebView2(){
    if (OSType == "Android")
        R2FA4AHAJSI.onOpenSiteByTitle('WebView2');
    else if (OSType == "Iphone" || OSType == "Ipad")
        javascript: openCustomURLinIFrame("WebView2");
}

function openEmail(){
    if (OSType == "Android")
        R2FA4AHAJSI.onOpenSiteByTitle("Email");
    else if (OSType == "Iphone" || OSType == "Ipad")
        javascript: openCustomURLinIFrame("Email");
}

function generateOTP(){
    if (OSType == "Android")
        R2FA4AHAJSI.onOpenSiteByTitle('OTPGenerator');
    else if (OSType == "Iphone" || OSType == "Ipad")
        javascript: openCustomURLinIFrame("OTPGenerator");
}

function checkForTransaction(){
    if (OSType == "Android")
        R2FA4AHAJSI.onOpenSiteByTitle('CheckForTransaction');
    else if (OSType == "Iphone" || OSType == "Ipad")
        javascript: openCustomURLinIFrame("CheckForTransaction");
}

function showHelplinePage(){
    if (OSType == "Android")
        R2FA4AHAJSI.onOpenSiteByTitle("Help");
    else if (OSType == "Iphone" || OSType == "Ipad")
        javascript: openCustomURLinIFrame("Help");
}

function getZRSessionId(){
    var zrSessionId;
    if(OSType=="Android")
        zrSessionId = R2FA4AHAJSI.getZRSessionId();
    return zrSessionId;
}

function setContainer()
{
    document.getElementById("container-parent").style.height=document.documentElement.clientHeight+"px";
    //for dynamic handling of height
    var ht = parseInt(document.getElementById("container").offsetHeight);
    var newht = "-"+ht/2+"px";
    if(ht > document.documentElement.clientHeight)
        newht = "-"+(document.documentElement.clientHeight/2-5)+"px";
    document.getElementById("container").style.marginTop=newht;
    
    var image = document.getElementsByTagName('img');
    for (i=0;i<image.length;i++)
    {
        if (image[i].parentNode.toString().toLowerCase() != '')
        {
            image[i].onfocus = function(){
                if(this.id == "logoffimg")
                {
                    this.width = "231";
                }
                else
                {
                    this.width = "129";
                }
            }
            image[i].onblur = function(){
                if(this.id == "logoffimg")
                {
                    this.width = "233";
                }
                else
                {
                    this.width = "130";
                }
            }
        }
    }
}