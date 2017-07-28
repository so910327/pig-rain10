// same list.js
// const city = document.querySelector('#city');
// renderCity();
// const county = document.querySelector('#county');
// const stop = document.querySelector('#stop');
// city.addEventListener('change', () => {
//   renderCounty();
//   renderStations();
//   initMap();
// });
// county.addEventListener('change', ()=>{
//   renderStation();
//   initMap();
// });
// renderTimespan();
// stop.addEventListener('change', ()=>{
//   initMap();
// });

// safari 10.0 以上版本的geolocation API只接受https連線請求
var key = true; //因為定位非同步，有時候使用者已經選擇位置，故當key＝true使用user GPS 定位

function showStationById(id) {
    console.log(id);
    var marker = getMarkerById(id);
    var pos = {
        lat: marker.position.lat(),
        lng: marker.position.lng()
    }
    console.log(pos);
    map.setZoom(15);
    map.setCenter(pos);
    console.log(map.getCenter())
    setTimeout(() => google.maps.event.trigger(marker, 'click'), 1000);
}

function getMarkerById(id) {
    return markerDict[id];
}

var map;
var markers;
var infoWindow;
var markerDict;
// safari 10.0 以上版本的geolocation API只接受https連線請求
function initMap() {
    geocoder = new google.maps.Geocoder();
    var stopId = stop.value;
    var locate = { err: '定位失敗，使用系統預設值', lat: 24.052171, lng: 120.892433 };
    if (stopId) {
        lat = parseFloat(pigPos[stopId].lat);
        lng = parseFloat(pigPos[stopId].lon);
        locate = { lat: lat, lng: lng };
        return getMap(locate);
    }
    if (navigator.geolocation) {
        return getUserLocation()
            .then(data => key ? getMap(data) : '')
            .catch(() => key ? getMap(locate) : '')
    }
    getMap(locate);
}

function getUserLocation() {
    return new Promise((res, rej) =>
        navigator.geolocation.getCurrentPosition(
            position => {
                var lat = position.coords.latitude, lng = position.coords.longitude;
                (lat > 20 && lat < 27 && lng > 116 && lat < 122)
                    ? res({ lat: lat, lng: lng })
                    : res({ err: '您的位置不在服務範圍內，使用系統預設值', lat: 24, lng: 121 })
            },
            err => rej(err.code)
        )
    );
}

function getMap(locate) {
    if (locate.err) alert(locate.err);
    //Create google map

    map = new google.maps.Map(document.querySelector('#map'), {
        zoom: 14,
        center: { lat: locate.lat, lng: locate.lng }
    });
    infoWindow = new google.maps.InfoWindow();
    // createAllMarkers();
    // Add markers to the map: markers = all stop
    markers = [];
    function mark(i, location) {
        return new google.maps.Marker({
            position: { lng: parseFloat(location.lon), lat: parseFloat(location.lat) },
            id: i
        });
    }

    // for function getMarkerById
    markerDict = {};

    // create all markers
    for (let i in pigPos) {
        markerDict[i] = mark(i, pigPos[i]);
        markers.push(markerDict[i]);
    }

    // When markers onclick
    markers.map(marker => marker.addListener('click', () => addInfoWindows(marker)));

    // Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(map, markers, {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
        minimumClusterSize: 3
    });
}

function createAllMarkers() {
    

}

function addInfoWindows(marker) {
    var id = marker.id;
    var contentString
    if (!pigArea[id]) {
        contentString = '尚無資料';
    } else {
        contentString = ['行政區: ' + pigArea[id].city,
        '測站: ' + pigArea[id].stop,
        '位址: ' + pigArea[id].addr
        ].join('<br>');
    }
    infoWindow.setContent(contentString);
    infoWindow.open(map, marker);
}

function codeAddress() {
    var address = document.getElementById('address').value;
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == 'OK') {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
            icon: 'https://www.spreadshirt.it/image-server/v1/designs/117102917,width=178,height=178/i-am-here.png'
        });
      } else {
        alert('地址轉換失敗，請輸入有效地址');
      }
    });
  }