const Workout = require('../models/workoutmodel');  //import the Workout model from the workoutmodel.js file
const mongoose = require('mongoose');  //import mongoose for database interaction




//get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1});  //retrieve all workout documents from the database, sorted by creation date in descending order
    res.status(200).json(workouts);  //send a JSON response with the retrieved workouts and a 200 status code
}



//get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params;  //destructure the id parameter from the request parameters

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'});  //if the provided ID is not a valid MongoDB ObjectId, send a 404 response with an error message
    }


    const workout = await Workout.findById(id);  //find a workout document in the database by its ID

    if (!workout) {
        return res.status(404).json({error: 'No such workout'});  //if no workout is found, send a 404 response with an error message
    }
    res.status(200).json(workout);  //send a JSON response with the retrieved workout and a 200 status code
}



//create a new workout
const createWorkout = async (req, res) => {
    
    const { title, reps, load } = req.body;  //destructure title, reps, and load from the request body
    
    let emptyFields = [];  //initialize an array to keep track of any empty fields

    if(!title) {
        emptyFields.push('title');  //if title is empty, add 'title' to the emptyFields array
    }
    if(!reps) {
        emptyFields.push('reps');  //if reps is empty, add 'reps' to the emptyFields array
    }
    if(!load) {
        emptyFields.push('load');  //if load is empty, add 'load' to the emptyFields array
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });  //if there are any empty fields, send a 400 response with an error message and the list of empty fields
    }

    try {
        const workout = await Workout.create({ title, reps, load });  //create a new workout document in the database using the Workout model
        res.status(200).json(workout);  //send a JSON response with the created workout document and a 200 status code
    } catch (error) {
        res.status(400).json({ error: error.message });  //send a JSON response with an error message and a 400 status code
    }
    // res.json({mssg: 'Create a new workout'})  //send a JSON response with a message
}



//delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;  //destructure the id parameter from the request parameters

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'});  //if the provided ID is not a valid MongoDB ObjectId, send a 404 response with an error message
    }

    const workout = await Workout.findOneAndDelete({ _id: id });  //find a workout document by its ID and delete it from the database

    if (!workout) {
        return res.status(404).json({error: 'No such workout'});  //if no workout is found, send a 404 response with an error message
    }
    res.status(200).json(workout);  //send a JSON response with the deleted workout and a 200 status code
}

//update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;  //destructure the id parameter from the request parameters


    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'});  //if the provided ID is not a valid MongoDB ObjectId, send a 404 response with an error message
    }

    const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true, runValidators: true } );  //find a workout document by its ID and update it with the new data

    if (!workout) {
        return res.status(404).json({error: 'No such workout'});  //if no workout is found, send a 404 response with an error message
    }
    res.status(200).json(workout);  //send a JSON response with the updated workout and a 200 status code
}



module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout 
}