require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require('body-parser');
const routeur = require("./routes/route");
const rateLimit = require('express-rate-limit');

const mongoString = process.env.DATABASE_URL;

const generalLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 300,
    message: 'Too many requests.'
});

const loginLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    message: 'Too many requests.'
});

const app = express();
const port = 3000;

app.use(generalLimiter);
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use('/api/login', loginLimiter);
app.use('/api/register', loginLimiter);

app.use('/api', routeur);

mongoose.connect(mongoString);
const database = mongoose.connection;

// Connexion à la base de données
database.on('error', (error) => {
    console.log(error);
});

database.once('connected', () => {
    console.log('Database Connected');
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Server started at https://localhost:${port}`);
});
