require('dotenv').config();

// // DEBUG LOGS
// console.log('Current Directory:', process.cwd());
// console.log('MONGO_URI Value:', process.env.MONGO_URI);

const express = require('express'); //import express for creating the server
const workoutRoutes = require('./routes/workout');  //import the workout routes from the workout.js file
const mongoose = require('mongoose');  //import mongoose for database interaction


//express app
const app = express();

// 2. Global Middleware (logs incoming requests)
app.use(express.json());  //middleware to parse incoming JSON requests
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next(); // Moves on to the next route/middleware
});


//routes not needed bcz we are using the workoutRoutes router
// app.get('/', (req, res) => {
//     res.json({mssg: 'Welcome to the app'})
// })

//use the workout routes
app.use('/api/workouts', workoutRoutes);

mongoose.connect(process.env.MONG_URI)  //connect to the MongoDB database using the connection string from environment variables
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connect to db listening on port',process.env.PORT);
        }) //listen for requests only after successful database connection 
    })
    .catch((error) => {
        console.log(error);  //log any errors that occur during the connection attempt
    })



