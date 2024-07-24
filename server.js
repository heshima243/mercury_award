const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

const mongoURI = "mongodb+srv://heshimajulienofficial:gZo66bAOKJBetFSQ@localisation.st4rgvh.mongodb.net/?retryWrites=true&w=majority&appName=localisation";

const port = process.env.PORT || 3000;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB connected successfully'))
    .catch(err => console.error('DB connection error:', err));

const locationSchema = new mongoose.Schema({
    uuid: String,
    latitude: Number,
    longitude: Number,
    timestamp: Date
});

// Configurer CORS
app.use(cors({ origin: 'https://crush-rust.vercel.app' }));


const Location = mongoose.model('Location', locationSchema);

app.get('/track/:uuid', (req, res) => {
    res.sendFile(path.join(__dirname, 'track.html'));
});

app.post('/location', async (req, res) => {
    const { uuid, latitude, longitude } = req.body;
    const newLocation = new Location({ uuid, latitude, longitude, timestamp: new Date() });
    
    try {
        await newLocation.save();
        res.status(200).send('Location saved');
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(port, () => {
    console.log('Server is running on port ',port);
});




//-----------------------------------------------------------------------

// const axios = require('axios');

// const API_KEY = '0d91477bf1894b3f9ba9d868227882c1'; // Remplacez par votre clé API
// const latitude = -11.6588544;
// const longitude = 27.4890752;

// const getGeolocationInfo = async (lat, lon) => {
//     const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${API_KEY}`;
    
//     try {
//         const response = await axios.get(url);
//         const results = response.data.results;
//         if (results.length > 0) {
//             const address = results[0].formatted;
//             const components = results[0].components; // Pour détails plus fins comme les adresses de rue
//             return {
//                 address,
//                 components
//             };
//         } else {
//             return 'No results found';
//         }
//     } catch (error) {
//         console.error('Error fetching geolocation data:', error);
//         return 'Error fetching geolocation data';
//     }
// };

// getGeolocationInfo(latitude, longitude).then(data => {
//     console.log('Address:', data.address);
//     console.log('Components:', data.components);
// });

