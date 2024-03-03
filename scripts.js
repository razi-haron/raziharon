
function openTab(tabName) {
  var i, x;
  x = document.getElementsByClassName("cad-container-tab");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById(tabName).style.display = "block";
}

// prevent website from being opened on small screen e.g mobile devices
window.onload = function() {
  // Check user agent
  var userAgent = navigator.userAgent.toLowerCase();

  // Define keywords indicating mobile devices
  var mobileKeywords = ['android', 'webos', 'iphone', 'ipad', 'ipod', 'blackberry', 'iemobile', 'opera mini'];

  // Check if user agent contains any mobile keywords
  var isMobile = mobileKeywords.some(function(keyword) {
      return userAgent.indexOf(keyword) !== -1;
  });

  // If user agent indicates a mobile device, prevent further action
  if (isMobile) {
      // Clear the entire body content
      document.body.innerHTML = "";

      // Create a new message element
      var messageElement = document.createElement('div');
      messageElement.id = 'desktopOnlyMessage';
      messageElement.innerHTML = '<p>This website is only accessible on desktop devices.</p>';
      
      // Append the message element to the body
      document.body.appendChild(messageElement);
  }
};
