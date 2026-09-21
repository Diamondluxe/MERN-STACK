import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

//pages and components
import Home from "./pages/Home"; 
import Navbar from "./components/Navbar";

function App() {
  // 1. Create the toggle tracking flag state
  const [showForm, setShowForm] = useState(false);

  // 2. Define the callback runner to swap true/false values
  const toggleFormHandler = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <div className="App">
      <BrowserRouter>
        {/* 3. Pass the toggle click trigger directly to Navbar */}
        <Navbar onToggleForm={toggleFormHandler} />
        
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              /* 4. Pass the true/false visibility state down into Home */
              element={<Home showForm={showForm} />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
