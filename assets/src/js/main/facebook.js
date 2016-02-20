// facebook.js

if ( $('.fb-comments').length !== 0 || $('.fb-like').length !== 0 ) { 

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '491698674249308', 
      channelUrl : '//fb-channel.php',
      status     : true,                             
      xfbml      : true
    });
  };

  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/nl_NL/all.js";
    fjs.parentNode.insertBefore(js, fjs);
  } (document, 'script', 'facebook-jssdk'));

}

//
// EOF
//