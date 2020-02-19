
import locService from './services/loc.service.js'
import { mapService } from './services/map.service.js'



window.onload = () => {


    locService.getPosition()
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
