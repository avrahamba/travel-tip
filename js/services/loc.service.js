var locs = [{ lat: 11.22, lng: 22.11 }]
const KEY = 'AIzaSyCaQVlcIeYewnFSmm3xkL2d3HHy9xhYbz4';
const gTestadress ='הבונים, 4 רמת גן'
function getLocs(address) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?&address=${address}&key=${KEY}`)
        .then(res => res.data.results[0].geometry.location)
}


function getPosition() {
    console.log('Getting Pos');

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function getLocationForSharing() {
    const lat = marker.getPosition().lat();
    const lng = marker.getPosition().lng();
    const strURL = `https://avrahamba.github.io/travel-tip/?lat=${lat}&lat=${lng}&`;
    return strURL;
}

export default {
     getLocs,
     getPosition,
    getLocationForSharing
}