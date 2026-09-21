const mongoose = require('mongoose'); //mongoose ko import kar rahe hain database interaction ke liye

//create a schema for the workout model
const Schema = mongoose.Schema; //create a schema object from mongoose

const workoutSchema =new Schema({
    title: {  //title use for the name of the workout
        type: String, //title field is of type String
        required: true //title field is required
    },
    reps: {  //reps use for number of repetitions in the workout
        type: Number, //reps field is of type Number
        required: true //reps field is required
    },  
    load : {  //load use for the weight/load used in the workout
        type: Number, //load field is of type Number
        required: true //load field is required
    }
}, {timestamps: true}) //timestamps option automatically adds createdAt and updatedAt fields to the schema

//
module.exports = mongoose.model('Workout', workoutSchema); //export the Workout model based on the workoutschema