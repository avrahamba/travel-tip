'use strict';
import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { weatherService } from './services/weather.service.js'

window.onload = () => {
    document.querySelector('.btn-go').addEventListener('click', onGo)
    document.querySelector('.btn-my-copy').addEventListener('click', onCopy)
    document.querySelector('.btn-my-location').addEventListener('click', onMyLocaion)

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
        .then(map => locService.getReverseGeo({ lat: map.center.lat(), lng: map.center.lng() }))
        .then(res => {
            document.querySelector('.location-name').innerText = res.address;
            return res.coords
        })
        .then(weatherService.getWeather)
        .then(renderWeather)

}
function onCopy() {
    const copyText = getLocationForSharing();
    const elFake = document.createElement('input');
    elFake.type = 'text';
    elFake.value = copyText;
    document.body.appendChild(elFake);
    elFake.select();
    elFake.setSelectionRange(0, 99999)
    document.execCommand('copy');
    document.querySelector('.btn-my-copy').innerText = 'copied!';
    document.body.removeChild(elFake);
}
function onMyLocaion() {
    locService.getPosition()
        .then(loc => {
            const coords = {
                lat: loc.coords.latitude,
                lng: loc.coords.longitude
            }
            mapService.panTo(coords);
            return coords
        })
        .then(locService.getReverseGeo)
        .then(res => {
            document.querySelector('.location-name').innerText = res.address;
            return res.coords
        })
        .then(loc => weatherService.getWeather(loc))
        .then(renderWeather)
}
function onGo() {
    const nameLocation = document.querySelector('.name-location').value;
    locService.getLocs(nameLocation)
        .then(loc => {
            mapService.panTo(loc);
            return loc
        })
        .then(locService.getReverseGeo)
        .then(location => {
            document.querySelector('.location-name').innerText = location.address;
            return location.coords
        })
        .then(loc => weatherService.getWeather(loc))
        .then(renderWeather)
}
function getLocationForSharing() {
    const pos = mapService.getMarkerPos();
    const strURL = `https://avrahamba.github.io/travel-tip/?lat=${pos.lat}&lng=${pos.lng}`;
    return strURL;
}
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

