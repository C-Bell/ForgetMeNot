/*
Janrain initializations and settings for JUMP.

For more information about these settings, see the following documents:

    http://developers.janrain.com/documentation/widgets/social-sign-in-widget/social-sign-in-widget-api/settings/
    http://developers.janrain.com/documentation/widgets/user-registration-widget/capture-widget-api/settings/
    http://developers.janrain.com/documentation/widgets/social-sharing-widget/sharing-widget-js-api/settings/
*/

(function() {
    if (typeof window.janrain !== 'object') window.janrain = {};
    window.janrain.settings = {};
    window.janrain.settings.capture = {};

    janrain.settings.packages = ['login', 'capture'];

    janrain.settings.appUrl = 'https://elililly-dev.rpxnow.com';
    janrain.settings.capture.appId = 'm2uqcsxt5rmhjqf7dbqxbgsbzn';
    janrain.settings.capture.captureServer = 'https://elililly-dev.janraincapture.com';
    janrain.settings.capture.clientId = 'g2z54xcwx24jaecb6e73xzyfx8vjkt7y';

    // --- Engage Widget -------------------------------------------------------

    janrain.settings.language = 'en-US';

    janrain.settings.tokenUrl = 'http://localhost/';
    janrain.settings.tokenAction = 'event';
    janrain.settings.borderColor = '#ffffff';
    janrain.settings.fontFamily = 'Helvetica, Lucida Grande, Verdana, sans-serif';
    janrain.settings.width = 300;
    janrain.settings.actionText = ' ';


    // --- Capture Widget ------------------------------------------------------

    janrain.settings.capture.flowName = 'lilly_pro_uk';
    janrain.settings.capture.redirectUri = 'http://localhost/';
    janrain.settings.capture.flowVersion = 'HEAD';
    janrain.settings.capture.registerFlow = 'socialRegistration';
    janrain.settings.capture.setProfileCookie = true;
    janrain.settings.capture.keepProfileCookieAfterLogout = true;
    janrain.settings.capture.modalCloseHtml = '<span class="janrain-icon-16 janrain-icon-ex2"></span>';
    janrain.settings.capture.noModalBorderInlineCss = true;
    janrain.settings.capture.responseType = 'token';
    janrain.settings.capture.mobileStylesheets = ['css/janrain-mobile.css'];
    janrain.settings.capture.stylesheets = ['css/janrain.css'];
    janrain.settings.capture.hasSettings = false;
    janrain.settings.capture.thinRegistration = true;

    // --- Mobile WebView ------------------------------------------------------

    //janrain.settings.capture.redirectFlow = true;
    //janrain.settings.popup = false;
    //janrain.settings.tokenAction = 'url';
    //janrain.settings.capture.registerFlow = 'socialMobileRegistration'

    // --- Federate  -----------------------------------------------------------

    //janrain.settings.capture.federate = true;
    //janrain.settings.capture.federateServer = '';
    //janrain.settings.capture.federateXdReceiver = '';
    //janrain.settings.capture.federateLogoutUri = '';
    //janrain.settings.capture.federateLogoutCalllback = function() {};
    //janrain.settings.capture.federateEnableSafari = false;

    // --- Backplane -----------------------------------------------------------

    //janrain.settings.capture.backplane = true;
    //janrain.settings.capture.backplaneBusName = '';
    //janrain.settings.capture.backplaneVersion = 2;
    //janrain.settings.capture.backplaneBlock = 20;

    // --- Share widget --------------------------------------------------------

    //janrain.settings.share = {};
    //janrain.settings.packages.push('share');
    //janrain.settings.share.message = "";
    //janrain.settings.share.title = "";
    //janrain.settings.share.url = "";
    //janrain.settings.share.description = "";

    // --- Load URLs -----------------------------------------------------------

    var httpsLoadUrl = "https://rpxnow.com/load/elililly-dev";
    var httpLoadUrl = "http://widgets-cdn.rpxnow.com/load/elililly-dev";

    var httpsShareLoadUrl = "https://rpxnow.com/js/lib/elililly-dev/share_beta.js'";
    var httpShareLoadUrl = "http://widget-cdn.rpxnow.com/js/lib/elililly-dev/share_beta.js";

    // --- DO NOT EDIT BELOW THIS LINE -----------------------------------------

    function isReady() { janrain.ready = true; };
    if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", isReady, false);
    } else {
        window.attachEvent('onload', isReady);
    }

    var e = document.createElement('script');
    e.type = 'text/javascript';
    e.id = 'janrainAuthWidget';
    if (document.location.protocol === 'https:') {
        e.src = httpsLoadUrl;
    } else {
        e.src = httpLoadUrl;
    }
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(e, s);

    if (typeof window.janrain.settings.share === 'object') {
        var e = document.createElement('script');
        e.type = 'text/javascript';
        e.id = 'janrainWidgets';
        if (document.location.protocol === 'https:') {
            e.src = httpsShareLoadUrl;
        } else {
            e.src = httpShareLoadUrl;
        }
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(e, s);
    }
})();

/*
Custom regex for client-side password validation. Server side validation is also
enforced via Capture settings.
*/


// This function is called by the Capture Widget when it has completred loading
// itself and all other dependencies. This function is required, and must call
// janrain.capture.ui.start() for the Widget to initialize correctly.
function janrainCaptureWidgetOnLoad() {
    var implFuncs = janrainExampleImplementationFunctions(); // Located below.

    /*==== CUSTOM ONLOAD CODE START ==========================================*\
    ||  Any javascript that needs to be run before screens are rendered but   ||
    ||  after the Widget is loaded should go between this comment and "CUSTOM ||
    ||  ONLOAD CODE END" below.                                               ||
    \*                                                                        */

    /*--
        SCREEN TO RENDER:
        This setting defines which screen to render. We've set it to the result
        of implFuncs.getParameterByName() so that if you pass in a parameter
        in your URL called 'screenToRender' and provide a valid screen name,
        that screen will be shown when the Widget loads.
                                                                            --*/
    janrain.settings.capture.screenToRender = implFuncs.getParameterByName('screenToRender');

    /*--
        EVENT HANDLING:

        Event Documentation:
        http://developers.janrain.com/reference/javascript-api/registration-js-api/events/
    --*/
    janrain.events.onCaptureScreenShow.addHandler(implFuncs.enhanceReturnExperience);
    janrain.events.onCaptureSaveSuccess.addHandler(implFuncs.hideResendLink);

    /*--
        NAVIGATION EVENTS:
        These event handlers are used for navigating the example implementation
        that exists on our servers for testing/demo/sample purposes. It is not
        required for your implementation, but can be modified to suit your
        needs. These event handlers are provided as an example.

                                                                            --*/

    janrain.events.onCaptureSessionNotFound.addHandler(function(result) {
        if (window.location.pathname === '/home'){
          window.location = '/';
        }
    });

    janrain.events.onCaptureLoginSuccess.addHandler(implFuncs.setNavigationForLoggedInUser);
    janrain.events.onCaptureSessionFound.addHandler(implFuncs.setNavigationForLoggedInUser);
    janrain.events.onCaptureRegistrationSuccess.addHandler(implFuncs.setNavigationForLoggedInUser);
    janrain.events.onCaptureSessionEnded.addHandler(implFuncs.setNavigationForLoggedOutUser);
    janrain.events.onCaptureLoginFailed.addHandler(implFuncs.handleDeactivatedAccountLogin);
    janrain.events.onCaptureAccountDeactivateSuccess.addHandler(implFuncs.handleAccountDeactivation);

    /*--
        SHOW EVENTS:
        Uncomment this line to show events in your browser's console. You must
        include janrain-utils.js to run this function.
                                                                            --*/
     janrainUtilityFunctions().showEvents();

    //  Register custom client-side validators
    janrain.capture.ui.registerFunction('passwordValidation', implFuncs.passwordValidation);

    /*                                                                        *\
    || *** CUSTOM ONLOAD CODE END ***                                         ||
    \*========================================================================*/

    // This should be the last line in janrainCaptureWidgetOnLoad()
    janrain.capture.ui.start();
}


// Reference implementation navigation.
function janrainExampleImplementationFunctions() {
    function setNavigationForLoggedInUser(result) {
        //janrain.capture.ui.renderScreen('editProfile');
        if (window.location.pathname === '/edit-profile'){
          janrain.capture.ui.renderScreen('editProfile');
        } else {
        document.getElementById("captureSignInLink").style.display  = 'none';
        document.getElementById("captureSignOutLink").style.display = '';
        document.getElementById("captureProfileLink").style.display = '';
        window.location = '/home';
      }
    }
    function setNavigationForLoggedOutUser(result) {
        document.getElementById("captureSignInLink").style.display  = '';
        document.getElementById("captureSignOutLink").style.display = 'none';
        document.getElementById("captureProfileLink").style.display = 'none';
        document.getElementById("editProfile").style.display = 'none';
        window.location = '/';
    }
    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    function enhanceReturnExperience(result) {
        if (result.screen == "returnTraditional") {
            var span = document.getElementById('traditionalWelcomeName');
            var name = janrain.capture.ui.getReturnExperienceData("displayName");
            if (span && name) {
                span.innerHTML = "Welcome back, " + name + "!";
            }
        }
    }
    function hideResendLink(result) {
        // Hide the 'Resend confirmation email' link if it's been clicked
        // from the edit profile page. Link will reappear if the user
        // refreshes their profile page.
        if(result.controlName == "resendVerificationEmail" &&
           result.screen == "editProfile") {
            document.getElementById("capture_editProfile_resendLink").style.display = 'none';
        }
    }
    function handleDeactivatedAccountLogin(result) {
        if (result.statusMessage == "accountDeactivated") {
            janrain.capture.ui.renderScreen('accountDeactivated');
        }
    }
    function handleAccountDeactivation(result) {
        if(result.status == "success") {
            document.getElementById("editProfile").style.display = 'none';
            janrain.capture.ui.modal.close();
            janrain.capture.ui.endCaptureSession();
            janrain.capture.ui.renderScreen('accountDeactivated');
        }
    }
    function passwordValidation(name, value) {
        return /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])|(?=.*[a-z])(?=.*[A-Z])(?=.*[!@\#$%&\/=?_.,:;\-])|(?=.*[a-z])(?=.*[0-9])(?=.*[!@\#$%&\/=?_.,:;\-])|(?=.*[A-Z])(?=.*[0-9])(?=.*[!@\#$%&\/=?_.,:;\-])).{8,}$/.test(value);
    }
    function janrainCustomPasswordValidation(name, value) {
        return /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d).*$/.test(value);
    }

    function janrainCustomPostalCodeValidation(name, value) {
        return /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) {0,1}[0-9][A-Za-z]{2})$/.test(value);
    }
    return {
        setNavigationForLoggedInUser: setNavigationForLoggedInUser,
        setNavigationForLoggedOutUser: setNavigationForLoggedOutUser,
        getParameterByName: getParameterByName,
        enhanceReturnExperience: enhanceReturnExperience,
        hideResendLink: hideResendLink,
        handleDeactivatedAccountLogin: handleDeactivatedAccountLogin,
        handleAccountDeactivation: handleAccountDeactivation,
        passwordValidation: passwordValidation
    };
}
