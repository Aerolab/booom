// Detect insertion of new shots and set up the @2x shots.
$('body > .shot-overlay').bind("DOMNodeInserted", function() {

  if( event.target.nodeName.toLowerCase() == 'img' ) {
    var $img = $(event.target);
    if( $img.parent().parent().is('.single-img') && ! $img.hasClass('hq') ) {
      setupHqShot();
      //setupSingleShot();
    }
  }

});


/* Setup the HQ Shot for individual shots */
function setupHqShot() {
  var $picture = $('div.the-shot div.single-grid div.single-img [data-picture]');
  var picSrc = $picture.find('div[data-media]').attr('data-src');

  if(picSrc) {
    var $pic = $('<img src="'+ picSrc +'" class="hq" />');
    $picture.find('img').remove();
    $picture.append($pic);
  }
}

function setupSingleShot() {
  // Set up the Add to Bucket button
  var shot = $('.screenshot-meta a.meta-bucket').attr('href').replace('/shots/', '').replace('/bucketings/new', '');

  $('.screenshot-meta a.meta-bucket')
    .on('click', function(event){
      event.preventDefault();
      event.stopPropagation();

      var slug = $(this).attr('href').replace('/shots/', '').replace('/bucketings/new', '');
      var shotUrl = $('div.the-shot div.single-grid div.single-img img').attr('src');
      showAddBucket(slug, shotUrl)
    });

  // Move the secondary sidebar into a more useful position
  // Todo: This should be redone with two columns, since both solutions have issues
  /*
  var $secondary = $('body#details #content .secondary');
  $secondary.show();
  $secondary.insertAfter( $('body#details #main > .screenshot-meta') ).show();
  */
}


$(document).ready(function(){

  if( $('body#details').length ) {
    setupHqShot();
    setupSingleShot();
  }

  // Sometimes picturefill doesn't load the images for the rebounds on the first try.
  window.onload = function(){
    var s = document.createElement("script");
    s.textContent = 'picturefill ? picturefill() : null;';
    document.getElementsByTagName("body")[0].appendChild(s);
  };

});