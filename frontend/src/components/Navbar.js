import { Link } from "react-router-dom"; 

const Navbar = ({ onToggleForm }) => {
    return (
        <header>
            <div className="container">
                {/* Left Side: Brand Logo Link */}
                <Link to="/" className="brand-logo">
                    <span className="material-symbols-outlined">fitness_center</span>
                    DAILY WORKOUT
                </Link>

                {/* Center Side: Inspirational Quote */}
                <div className="navbar-quote">
                    “Consistency beats intensity.”
                </div>

                {/* Right Side: Interactive Action Toggle Button */}
                <button className="nav-toggle-btn" onClick={onToggleForm}>
                    <span className="material-symbols-outlined">add_circle</span>
                    <span>Add New</span>
                </button>
            </div>
        </header>
    );
};

export default Navbar;
