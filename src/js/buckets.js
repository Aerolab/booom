/**
 * Create a custom UI for the add to bucket modal
 * The official one is very inefficient for shot lists 
 */
$(document).ready(function(){
  if( $('body').hasClass('better-buckets') ){ return; }
  $('body').addClass('better-buckets');

  // Setup the container
  var $sidebar = $('<aside id="add-to-bucket" />').appendTo( $('body') );
  var $bucketHolder = $('<ol class="buckets" />').appendTo( $sidebar );

  $sidebar.on('click', function(event){
    closeAddToBucket();
  });
  $bucketHolder.on('click', function(event){
    event.stopPropagation();
  });

  // New Bucket
  // Todo: Refactor This
  var $addBucket = $('<li class="group newbucket">'+
      '<div class="bucket-img">'+
        '<img src="" alt="" />'+
      '</div>'+
      '<strong>Create New Bucket</strong>'+
      '<form>'+
        '<input type="text" name="name" placeholder="Create New Bucket" required>'+
      '</form>'+
    '</li>').prependTo($bucketHolder);

  $addBucket.on('click', function(event){
    event.preventDefault();
    var $bucket = $(this).closest('li');
    if( $bucket.hasClass('active') ){ return; }

    $bucket.addClass('active');
    setTimeout(function(){
      $bucket.find('form input[name=name]').focus();
    }, 16*5);
    
  });

  $addBucket.find('form').on('submit', function(event){
    event.preventDefault();
  });

  $(document).on('keydown', function(event){
    if(event.keyCode == 27) {
      $('#add-to-bucket').removeClass('active');
    }
  });

});


function showAddBucket(slug, shotUrl) {
  // Prefill the bucket list
  var $bucketHolder = $('#add-to-bucket .buckets');
  var $addBucket = $bucketHolder.find('li.newbucket');

  $bucketHolder.find('li.group').not( $addBucket ).remove();
  $bucketHolder.addClass('loading');
  $addBucket.removeClass('active').find('input').val('');
  $('#add-to-bucket').addClass('active');

  $.get('https://dribbble.com/shots/'+slug+'/bucketings/new', function(html){

    var $modal = $(html);
    var $buckets = $modal.find('ol.buckets li');

    sortBuckets($buckets);

    buckets = [];

    $bucketHolder.find('li.group').not( $addBucket ).remove();
    $bucketHolder.append( $buckets ).removeClass('loading');

    $buckets.not( $addBucket ).on('click', function(event){
      event.preventDefault();

      addToBucket(slug, $(this).attr('id').replace('bucket-', ''));

      $(this).removeClass('unbucketed').addClass('bucketed');
      $('#add-to-bucket').removeClass('active');
    });

    $addBucket.find('img').attr('src', shotUrl);

    // Recreate the submit handler so it sends this bucket
    $addBucket.find('form').unbind('submit').on('submit', function(event){
      event.preventDefault();

      if( $(this).hasClass('loading') ){ return; }
      $(this).addClass('loading');

      var bucketName = $(this).find('input[name=name]').val();

      $.ajax({
        type: 'POST',
        url: profileUrl +'/buckets',
        dataType: 'json',
        data: {
          utf8: '✓',
          authenticity_token: csrfToken,
          bucket: {
            name: bucketName,
            description: ''
          }
        },
        headers: {'X-CSRF-Token': csrfToken},
        success: function(data){
          addToBucket(slug, data.id);

        }
      });

      // Insert a fake bucket
      var $placeholder = $(
        '<li id="bucket-new" class="group bucketed">'+
          '<a href="#">'+
            '<span class="bucket-img">'+
              '<img alt="" src="'+shotUrl+'" title="Spinnner">'+
            '</span>'+
            '<strong>'+'</strong>'+
            '<span class="bucket-meta">1 shot</span>'+
            '<span class="bucket-meta">updated less than a minute ago</span>'+
          '</a>'+
        '</li>');

      $placeholder.find('strong').text(bucketName);
      $('#add-to-bucket').find('li.newbucket').after( $placeholder );
      
      closeAddToBucket();
    });

  }, 'html');
}


function addToBucket(slug, bucketId) {
  $.ajax({
    type: 'POST',
    url: 'https://dribbble.com/shots/'+ slug +'/bucketings',
    data: {
      bucket_id: bucketId
    },
    headers: {'X-CSRF-Token': csrfToken}
  });
}


function closeAddToBucket() {
  $('#add-to-bucket').removeClass('active');
  $addBucket.removeClass('active');
  $addBucket.find('form').removeClass('loading').find('input').val('');
}


function sortBuckets($buckets) {
  $buckets.sort(function(a,b){
    var dateA = parseRelativeDate( $(a).find('.bucket-meta:last-child').text() );
    var dateB = parseRelativeDate( $(b).find('.bucket-meta:last-child').text() );
    var idA = a.getAttribute('id').replace('bucket-', '');
    var idB = b.getAttribute('id').replace('bucket-', '');

    if(dateA > dateB) { return -1; }
    if(dateA < dateB) { return 1; }
    // If the dates are the same, the newest goes first
    if(dateA === dateB) {
      if(idA > idB) { return -1; }
      if(idA < idB) { return 1; }
    }
  });
}

function parseRelativeDate(text) {
  // Todo: Some storage is needed for buckets modified < 60s ago
  var parsers = [
    { regex: /less than a minute ago/i, multiplier: 59 }, // If it says this, assume 59s (no numbers === 1)
    { regex: /([0-9]+) seconds? ago/i,  multiplier: 1 },
    { regex: /([0-9]+) minutes? ago/i,  multiplier: 60 },
    { regex: /([0-9]+) hours? ago/i,    multiplier: 60*60 },
    { regex: /([0-9]+) days? ago/i,     multiplier: 60*60*24 },
    { regex: /([0-9]+) months? ago/i,   multiplier: 60*60*24*30 },
    { regex: /([0-9]+) years? ago/i,    multiplier: 60*60*24*30*12 }
  ];

  var timeago = 60*60*24*30*12; // A year old by default
  var match = null;

  for( var i=0; i<parsers.length; i++ ) {
    if( match = text.match( parsers[i].regex ) ) {
      var num = parseFloat( match[1] );
      if( ! (num > 0) ) { num = 1; }
      timeago = num * parsers[i].multiplier;
      break;
    }
  }

  return Date.now() - timeago;
}