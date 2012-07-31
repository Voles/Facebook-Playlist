/**
 * Created by JetBrains PhpStorm.
 * User: nielsdequeker
 * Date: 1/07/12
 * Time: 14:57
 * To change this template use File | Settings | File Templates.
 */
window.fbAsyncInit = function()
{
    FB.init({
        appId      : '388660947857102', // App ID
        channelUrl : 'channel.php', // Channel File
        status     : true, // check login status
        cookie     : true, // enable cookies to allow the server to access the session
        xfbml      : true  // parse XFBML
    });

/*
    FB.logout(function (response) {console.log('User is now logged out')});

    // check if user is logged in
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            var uid = response.authResponse.userID;
            var accessToken = response.authResponse.accessToken;

            FB.api( 'me/links', function( response )
            {
                //console.log(response);
            });

        } else if (response.status === 'not_authorized') {
            // the user is logged in to Facebook,
            // but has not authenticated your app
        } else {
            // the user isn't logged in to Facebook.
        }
    });
*/
    /*FB.login(function(response) {
        // handle the response
    }, {scope: 'user_status,read_stream'});
    */
};

// Load the SDK Asynchronously
(function(d){
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
}(document));