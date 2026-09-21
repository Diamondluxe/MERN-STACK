const express = require('express');  //import express router

const router = express.Router();  //create an instance of express router

const { 
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
 } = require('../controllers/workoutController');  //import the createWorkout function from the workoutController.js file





//GET all workouts
router.get('/', getWorkouts)  //define a GET route for retrieving all workouts, using the getWorkouts controller function


//GET a single workout
router.get('/:id', getWorkout)  //define a GET route for retrieving a specific workout by ID, using the getWorkout controller function


//POST a new workout
router.post('/', createWorkout)  //define a POST route for creating a new workout, using the createWorkout controller function


//DELETE a workout
router.delete('/:id', deleteWorkout)  //define a DELETE route for deleting a specific workout by ID

// UPDATE a workout
router.patch('/:id', updateWorkout)  //define a PATCH route for updating a specific workout by ID

 
module.exports = router;  //export the router instance for use in other parts of the application