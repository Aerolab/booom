/**
 * Infinite Shot Scrolling Module
 * TODO: Detect Offset and run loadNextPage();
 */

function calculatePageOffset() {
  if( $('ol.dribbbles').length ) {
    return $('ol.dribbbles').height() + $('ol.dribbbles').offset().top;
  } else {
    return null;
  }
}

var loadNextPageOffset = calculatePageOffset();

var loadingNextPage = false;

// It will look for next page button and get it's href
function getNextPageURL(parent) {
  var button = $(parent).find('.next_page');
  if (button) {
    return button.attr('href');
  }
  return '';
}


function loadPage(url, callback) {
  $.ajax({
    type: 'GET',
    url: url,
    success: function(data) {
      callback(data);
    }
  });
}

var nextPageURL = getNextPageURL($(document));

// This will get loadNextPage and append shots
function loadNextPage() {
  var url = nextPageURL;
  if (url == '' || typeof url == 'undefined' || url == null) {
    return false;
  }

  $('#main .page .loading-spinner').addClass('active');

  loadPage(url, function(data) {

    $('#main .page .loading-spinner').removeClass('active');

    var SHOTS = [];
    var $html = $(data);

    if( $html.find('#main .playoffs').length ) {

      nextPageURL = getNextPageURL(data);

      // Playoffs use simple html injection
      var $playoffs = $html.find('.playoffs > .multi.group');
      $playoffs.insertBefore('#main .playoffs .page');

      // Fix the playoffs pic
      $playoffs.each(function(){
        var $playoff = $(this);
        var $shot = $playoff.find('ol.dribbbles > li');
        setupShot($shot);
        $shot.find('.tools').css('visibility', 'visible');

        var $pic = $shot.find('ol.dribbbles > li').find('[data-picture');
        var src = $pic.find('[data-src]').data('src');
        $pic.append('<img src="'+src+'"/>');
      });

    }
    else {

      eval( $(data).find('#main > script').text() );

      var $shots = $html.find('ol.dribbbles > li');
      $shots.appendTo('ol.dribbbles');
      nextPageURL = getNextPageURL(data);

      $shots.each(function(){
        setupShot($(this));
      });

      for (var i = SHOTS.length - 1; i >= 0; i--) {
        var shot = SHOTS[i];
        var shot_el = $('#screenshot-'+shot.id);
        
        shot_el.find('.timestamp').text(shot.created_at);

        if (shot.comments_since_last_view) {
          shot_el.find('.cmnt').addClass('comments-since');
        }
        if (shot.liked) {
          shot_el.find('.fav').addClass('marked');
        }      
      };
    }

    // Set vars for next loading
    loadingNextPage = false;
    loadNextPageOffset = calculatePageOffset();

  });
}


$(document).ready(function(){

  if( ! $('ol.dribbbles').length ) { return; }

  if( $('body').hasClass('infinite-scrolling') ){ return; }
  $('body').addClass('infinite-scrolling')


  $(window).scroll(function () { 
    if (!loadingNextPage && $(window).scrollTop() >= loadNextPageOffset - $(window).height()) {
      // Initialize loading
      loadingNextPage = true;
      loadNextPage();
    }
  });

  $('#main .page .pagination .next_page').before('<span class="loading-spinner"></span>');

  $('#main .page .pagination').find('.next_page, .previous_page').hide();

  // Scroll to top button
  $('body').append('<span class="scroll-to-top"></span>');
  $('.scroll-to-top').click(function(e) {
    e.preventDefault();
    $.scrollTo({
      endY: 0,
      duration: 200
    });
  });


});
