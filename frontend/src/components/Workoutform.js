import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";  //this is a custom hook that allows us to access the workouts context

const Workoutform = () => {
    const { dispatch } = useWorkoutsContext();  //this is a custom hook that allows us to access the workouts context
    
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);  //this is a state that will hold the empty fields

    const handleSubmit = async (e) => {
        e.preventDefault();

        const workout = { title, load, reps };

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);  //this is a state that will hold the empty fields
        }
        if (response.ok) {
            setError(null);
            setEmptyFields([]);  // Clear empty fields when submission is successful
            console.log('new workout added', json);
            // Reset the form
            setTitle('');   
            setLoad('');
            setReps('');
            dispatch({type: 'CREATE_WORKOUT', payload: json});  //this is a dispatch that adds the new workout to the context
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Exercise Title:</label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}  //this is a conditional class that will add the error class if the title field is empty
            />
            <label>Load (in kg):</label>
            <input 
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('load') ? 'error' : ''}  //this is a conditional class that will add the error class if the load field is empty
            />
            <label>Reps:</label>
            <input 
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}  //this is a conditional class that will add the error class if the reps field is empty
            />

            <button>Add Workout</button>

            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Workoutform;