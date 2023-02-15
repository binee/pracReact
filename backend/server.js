const express = require('express');
const cors = require('cors');
const errorController = require('../backend/controller/errorContoller');

const server = express();
const port = process.env.PORT || 5000;
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
   // optionSuccessStatus:200,
 }
require('./db') // Bring database connection
server.use(cors(corsOptions)) // Use this after the variable declaration

server.use(express.json()); //

// Bring Route 
const userRoute = require('./routes/userRoute');
const carRoute = require('./routes/carRoute');

server.use('/users', userRoute);
server.use('/cars', carRoute);
server.use(errorController);

server.listen(port, () => {
    console.log('server running')
})