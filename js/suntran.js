$('#routes').live('pagebeforecreate',function(event, ui){
  $.mobile.pageLoading();
  $.ajax({
    url: "http://busted.kitplummer.apigee.com/beta/routes.json",
    dataType: 'jsonp',
    success: function(data, textStatus, jqXHR) {
      $.tmpl('routeTemplate', data.routes).appendTo('#routes .content ul');
      $('#routes .content ul').listview('refresh');
    }
  });
});

$('.routeButton').live('click', function() {
  $.mobile.pageLoading();
  var routeId = $(this).jqmData('id');
  $.ajax({
    url: "http://busted.kitplummer.apigee.com/beta/route/"+routeId+".json",
    dataType: 'jsonp',
    success: function(data, textStatus, jqXHR) {
      $('#schedules .content ul').html('');
      if ( data.Route.busses.length > 0 ) {
        $('#schedules .content ul').append('<li data-role="list-divider">RUNNING BUSSES</li>');
        $.tmpl('busTemplate', data.Route.busses).appendTo('#schedules .content ul');
      }
      $('#schedules .content ul').append('<li data-role="list-divider">STATIONS</li>');
      $.tmpl('stationTemplate', data.Route.stations).appendTo('#schedules .content ul');
      //$('#schedules .content ul').append('<li data-role="list-divider">STOPS</li>');
      //$.tmpl('stationTemplate', data.Route.stops).appendTo('#schedules .content ul');
      $.mobile.changePage('#schedules');
    }
  });
});

$('#schedules').live('pagebeforeshow',function(event, ui){
  $('#schedules .content ul').listview('refresh');
});

$('.busButton').live('click', function() {
  $.mobile.pageLoading();
  var lat = $(this).jqmData('lat'),
      lng = $(this).jqmData('lng'),
      dir = $(this).jqmData('dir');
  $('#map-canvas').css('height', ($(window).height()-43));
  $('#map-canvas').gmap({ 'center': new google.maps.LatLng(lat,lng), 'zoom': 15, 'callback': function() {
    $('#map-canvas').gmap('addMarker', { 'position': new google.maps.LatLng(lat,lng) } );
    $.mobile.changePage('#map');
  }});
});
