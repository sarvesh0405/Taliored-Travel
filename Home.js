import React from 'react';

function Home() {
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
          <button className="primary-button">GET STARTED</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
