/* Setup the HQ Shot for individual shots */
function setupHqShot() {
  var $picture = $('div.the-shot div.single-grid div.single-img [data-picture]');
  var picSrc = $picture.find('div[data-media]').data('src');

  if(picSrc) {
    var $pic = $('<img src="'+ picSrc +'" class="hq" />');
    $picture.replaceWith($pic);
  }
}

function setupSingleShot() {
  // Move the secondary sidebar into a more useful position
  var $secondary = $('body#details #content .secondary');
  $secondary.show();
  $secondary.insertAfter( $('body#details #main > .screenshot-meta') ).show();
}


$(document).ready(function(){

  if( $('body#details').length ) {
    setupHqShot();
    setupSingleShot();
  }

});