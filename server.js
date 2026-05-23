require('dotenv').config();

const express = require('express');
const cors = require('cors');
const router = require('./app/routes/router');

const app = express();
const PORT = process.env.EXPRESS_PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'UP',
        timestamp: new Date().toISOString(),
        node: process.env.NODE_ENV || 'Node-API'
    });
});

app.use('/api', router);

app.use((req, res) => {
    res.status(404).json({ message: 'ruta no encontrada' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});