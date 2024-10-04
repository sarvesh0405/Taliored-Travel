import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import ItineraryForm from './ItineraryForm'; // Import the form component

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="navbar">
          <div className="logo">Tailored Travel</div>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>Contact Us</li>
            <li>
              <Link to="/itinerary">Itinerary</Link>
            </li>
          </ul>
        </nav>

        {/* Define the routes */}
        <Routes>
          {/* Route for the Home Page */}
          <Route path="/" element={<HomePage />} />
          {/* Route for the Itinerary Page */}
          <Route path="/itinerary" element={<ItineraryPage />} />
        </Routes>
      </div>
    </Router>
  );
}

// Component for Home Page
const HomePage = () => {
  return (
    <div className="banner">
      <video autoPlay loop muted className="bg-video">
        <source src="video-1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
        <h1>ADVENTURE AWAITS</h1>
        <p>What are you waiting for?</p>
        <div className="banner-buttons">
          <Link to="/itinerary">
            <button className="primary-button">GET STARTED</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// ItineraryPage component to display the form
const ItineraryPage = () => {
  return (
    <div className="form-container">
      <ItineraryForm onSubmit={(data) => console.log(data)} />
    </div>
  );
};

export default App;
