/**
 * Connect Infinite Scrolling with auto @2x
 */


// Detect insertion of new shots and set up the @2x shots.
$('#main ol.dribbbles').bind("DOMNodeInserted", function() {
  var $shot = $(event.target);
  if( ! $shot.is('li.group') ){ return; }
  setupShot($shot);
});
