const axios = require('axios');

const API_KEY = '0d91477bf1894b3f9ba9d868227882c1'; // Remplacez par votre clé API
const latitude = -11.6588544;
const longitude = 27.4890752;

const getGeolocationInfo = async (lat, lon) => {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${API_KEY}`;
    
    try {
        const response = await axios.get(url);
        const results = response.data.results;
        if (results.length > 0) {
            return results[0].formatted; // Vous pouvez également explorer `components` pour plus de détails
        } else {
            return 'No results found';
        }
    } catch (error) {
        console.error('Error fetching geolocation data:', error);
        return 'Error fetching geolocation data';
    }
};

getGeolocationInfo(latitude, longitude).then(address => {
    console.log('Address:', address);
});
