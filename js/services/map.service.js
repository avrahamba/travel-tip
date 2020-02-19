
export const mapService = {
    initMap,
    addMarker,
    panTo,
    getMarkerPos
}

var map;
var marker;

function initMap(lat, lng) {
    return _connectGoogleApi()
        .then(() =>
            map = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
        )
}
function _removeMarker() {
    marker.setMap(null);
}
function addMarker(loc) {
    if (marker) _removeMarker();
    marker = new google.maps.Marker({
        position: loc,
        map: map,
        title: 'Hello World!'
    });
    // console.log(marker);

    return marker;
}
function panTo(location) {
    const { lat, lng } = location;
    var laLatLng = new google.maps.LatLng(lat, lng);
    map.panTo(laLatLng);
    return addMarker(location)
}
function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = `AIzaSyCaQVlcIeYewnFSmm3xkL2d3HHy9xhYbz4`;
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}
function getMarkerPos() {
    const lat = marker.getPosition().lat();
    const lng = marker.getPosition().lng();
    return { lat, lng };
}
