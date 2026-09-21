import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

// Components
import WorkoutDetails from "../components/WorkoutDetails";
import Workoutform from "../components/Workoutform";

// 1. Destructure and accept 'showForm' straight from props
const Home = ({ showForm }) => {
   const { workouts, dispatch } = useWorkoutsContext();

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts');
            const json = await response.json();

            if (response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: json});
            }
        }

        fetchWorkouts();
    }, [dispatch]);

    return (
        <div className="home">  
            <div className="workouts">  
               {workouts && workouts.map((workout) => (
                   <WorkoutDetails key={workout._id} workout={workout} />
               ))}
            </div>

            {/* 2. Conditional render: The form will only append to the screen when showForm is true */}
            {showForm && <Workoutform />}
        </div>
    );
};

export default Home;
