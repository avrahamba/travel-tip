var locs = [{ lat: 11.22, lng: 22.11 }]
const KEY = 'AIzaSyCaQVlcIeYewnFSmm3xkL2d3HHy9xhYbz4';
const gTestadress ='הבונים, 4 רמת גן'
function getLocs(address) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?&address=${address}&key=${KEY}`)
        .then(res => res.data.results[0].geometry.location)
}

function getReverseGeo(coord) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coord.lat},${coord.lng}&key=${KEY}`)
        .then(res => {return{address:res.data.results[0].formatted_address,coord}})
}

function getPosition() {
    console.log('Getting Pos');

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}



export default {
     getLocs,
     getPosition,
     getReverseGeo
}