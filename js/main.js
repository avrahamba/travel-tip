
import locService from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { weatherService } from './services/weather.service.js'



window.onload = () => {

    getPositionFromUrl()
        .then((pos) => {
            if (pos) return pos;
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
        .then(map => {
            mapService.addMarker(map.center)
            return map;
        })
        .then(map => weatherService.getWeather(map.center))
        .then(renderWeather)
}

document.querySelector('.btn-go').addEventListener('click', (ev) => {
    const nameLocation = document.querySelector('.name-location').value;
    locService.getLocs(nameLocation)
        .then(loc => {
            mapService.panTo(loc);
            return loc
        })
        .then(loc => weatherService.getWeather(loc))
        .then(renderWeather)
})

document.querySelector('.btn-my-copy').addEventListener('click', (ev) => {
    const copyText = getLocationForSharing();

    const el = document.createElement('input');
    el.type = 'text';
    el.value = copyText;
    document.body.appendChild(el);
    el.select();
    el.setSelectionRange(0, 99999)
    document.execCommand('copy');
    document.querySelector('.btn-my-copy').innerText = 'copied!';
    document.body.removeChild(el);
})

function getLocationForSharing() {
    const pos = mapService.getMarkerPos();
    const strURL = `https://avrahamba.github.io/travel-tip/?lat=${pos.lat}&lng=${pos.lng}`;
    return strURL;
}
document.querySelector('.btn-my-location').addEventListener('click', (ev) => {
    locService.getPosition()
        .then(loc => {
            const coord = {
                lat: loc.coords.latitude,
                lng: loc.coords.longitude
            }
            mapService.panTo(coord);
            return coord
        })
        .then(loc => weatherService.getWeather(loc))
        .then(renderWeather)
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
    return Promise.resolve({ coords: { latitude: lat, longitude: lng } })
}
function renderWeather(watherObj) {

    document.querySelector('.weather-container').innerHTML =
        `
    <h2>Weather today</h2>
    <img src="https://openweathermap.org/img/wn/${watherObj.icon}@2x.png" alt="">
    <div class="weather-text">
        <p>
            <span class="location">${watherObj.location}, ${watherObj.country}</span>
            <img src="https://www.countryflags.io/${watherObj.country}/flat/32.png" alt="">
            <span class="description">${watherObj.description}</span>
        </p>
        <p>
            <span class="temp">${watherObj.temp}°C</span>
            <span class="min-max-temp"> temperature from ${watherObj['min-temp']} to ${watherObj['max-temp']} °C, wind ${watherObj.wind} m/s</span>
        </p>
    </div>
    `
}
