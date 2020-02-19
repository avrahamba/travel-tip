
import locService from './services/loc.service.js'
import { mapService } from './services/map.service.js'



window.onload = () => {

    getPositionFromUrl()
    .then((pos)=>{
        if(pos)return pos;
        else return locService.getPosition()
    })
        .then(pos => {
            return pos.coords;
        })
        .catch(err => {
            console.log('err!!!', err);
        })
        .then(coords => {
            const lat = coords.latitude;
            const lng = coords.longitude;
            return mapService.initMap(lat, lng);
        })
        .then((map) => {
            mapService.addMarker(map.center);
        })
}

document.querySelector('.btn').addEventListener('click', (ev) => {
    const nameLocation = document.querySelector('.name-location').value;
    locService.getLocs(nameLocation)
        .then((loc) => mapService.panTo(loc));
})

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function getPositionFromUrl() {
    const lat = +getParameterByName('lat');
    const lng = +getParameterByName('lng');
    if (!lat || !lng) return Promise.resolve(null);
    return Promise.resolve({coords:{latitude:lat,longitude:lng}})
}