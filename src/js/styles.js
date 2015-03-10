/* Inject the Stylesheet on the Page */
/* Safari Only */

// I have no idea if this is the right way to do this, 
// but Safari has a suboptimal Style injection mechanism.
if( typeof safari !== 'undefined' && typeof safari.extension !== 'undefined' ) {

  function setupStyles() {

    // Retry until the document appears. Yes, this is a terrible hack.
    if( typeof document === 'undefined' || document.getElementsByTagName("head").length === 0){
      setTimeout(setupStyles, 1);
      return;
    }
    var ss = document.createElement("link");
    ss.type = "text/css";
    ss.rel = "stylesheet";
    ss.href = safari.extension.baseURI + "styles/styles.css";
    document.getElementsByTagName("head")[0].appendChild(ss);
    return true;
  }

  setupStyles();
}