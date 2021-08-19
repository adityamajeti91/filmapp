const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

//Import Routes
const ticketRoute = require('./routes');

//Middle
app.use(express.json());

const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

//Routh middlewares
app.use('/api', ticketRoute);

const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.DB_Connect, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    // console.log("Connected to database successfully");
});

app.listen(3001, () => {
    console.log("Server is listening on port 3001");
});

module.exports = app;