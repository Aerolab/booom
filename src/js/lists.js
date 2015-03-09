var profileUrl = '', 
    csrfToken = '',
    bucketScriptLoaded = false;

/**
 * Setup a shot thumbnail so it has an Like / Add to Bucket buttons and an HQ Picture.
 */
function setupShot($shot) {

  // Prevent dual initialization
  if( $shot.hasClass('enhanced') ){ return; }
  $shot.addClass('enhanced');

  // Don't show the buttons for logged out users
  // Todo: This should be refactored.
  if( $('body').hasClass('logged-in') ){

    var $like = $shot.find('li.fav a');
    var shot = $like.attr('href').replace('/shots/', '').replace('/fans', '');
    var shotUrl = $shot.find('[data-picture] [data-src]').data('src');
    var $tools = $shot.find('ul.tools').attr('shot', shot);
    var $bucket = $('<li class="bucket"><a>Add</a></li>').insertAfter($like.parent());

    $bucket.find('a').attr('title', 'Add to bucket');
    $like.attr('title', 'Like this shot!');

    /* Do the like via ajax */
    $like.on('click', function(event){
      event.preventDefault();

      var $button = $(this);
      var shot = $button.attr('href').replace('/shots/', '').replace('/fans', '');
      var likes = parseInt( $button.text() );

      // Todo: Use the actual like data for the like count (it comes from the ajax request)
      if( ! $button.parent().hasClass('marked') ){
        likeShot(shot);
        $button.text( likes+1 ).parent().addClass('marked');
      } else {
        unlikeShot(shot);
        $button.text( likes-1 ).parent().removeClass('marked');
      }

    });


    /* Add to bucket */
    $bucket.on('click', function(event){
      showAddBucket(shot, shotUrl);
    });

  }


  /* Use a high resolution shot */
  // Todo: Add the alt
  var $picture = $shot.find('[data-picture]');
  var picAlt = $picture.data('alt');
  var picSrc = $picture.find('div[data-media]').data('src');
  var isGif = ($shot.find('img.is-gif').length > 0) ? true : false;

  if( isGif ) {
    // Use the proper animated gif
    picSrc = picSrc.replace('_1x.gif', '.gif');
  }

  var $pic = $('<img src="'+ picSrc +'" class="hq" />');
  $pic.on('load', function(){
    $(this).parent().addClass('hq-loaded');
    $(this).closest('.dribbble').find('img.is-gif').addClass('hidden');
  });

  $picture.parent().append($pic);
}


/**
 * Like a specific shot
 */
function likeShot(shot, callback) {

  $.ajax({
    type: 'POST',
    url: profileUrl + '/likes?screenshot_id='+ shot,
    data: {},
    headers: {'X-CSRF-Token': csrfToken}
  });

}

/**
 * Remove a like
 */
function unlikeShot(shot, callback) {

  $.ajax({
    type: 'POST',
    url: profileUrl + '/likes/'+ shot,
    data: { '_method': 'delete' },
    headers: {'X-CSRF-Token': csrfToken}
  });
  
}


$(document).ready(function(){

  // Check if the user is logged in
  var $profileTop = $('#t-profile > a');

  // No user, no plugin
  if( ! $profileTop.length ){ return; }

  $('body').addClass('powershot-loaded');


  profileUrl = $profileTop.attr('href');

  // Get the AJAX and CSRF values
  csrfToken = $('meta[name=csrf-token]').attr('content');


  var $shots = $('ol.dribbbles > li');

  if( $('#main .playoffs').length ) {
    // Playoffs use different logic
    $shots.each(function(){
      setupShot($(this));
    });
  } else {
    $shots.each(function(){
      setupShot($(this));
    });
  }

});