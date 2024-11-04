import React from 'react';
import './userInfo.css';

export function UserInfo() {

  const saveUserInformation = () => {
    // Call the save function
    // Add your save logic here
    window.location.href = 'generator.html';
  };

  return (
    <main>
      <h2 id="welcome-message"></h2>
      <p>Please tell us more about you!</p>
      <br />

      <h3>Contact Information</h3>
      <div id="contact-information" className="user-info-section">
        <label htmlFor="name">Full Name:</label>
        <input type="text" id="name" className="user-info-data" placeholder="Enter your Full Name" /><br /><br />

        <label htmlFor="phone">Phone Number:</label>
        <input type="text" id="phone" className="user-info-data" placeholder="Enter your phone number" /><br /><br />

        <label htmlFor="address">Address:</label>
        <input type="text" id="address" className="user-info-data" placeholder="Enter your address" /><br /><br />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" className="user-info-data" placeholder="Enter your email" /><br /><br />

        <label htmlFor="linkedIn">LinkedIn URL:</label>
        <input type="url" id="linkedIn" className="user-info-data" placeholder="Enter your LinkedIn URL" /><br /><br />
      </div>

      <h3>Education</h3>
      <div id="education-information" className="user-info-dynamic-section">
        {/* Dynamically populated */}
      </div>
      <button id="add-education-information">Add Education</button>

      <h3>Work History</h3>
      <div id="work-history-information" className="user-info-dynamic-section">
        {/* Dynamically populated */}
      </div>
      <button id="add-work-history-information">Add Work Entry</button>

      <h3>Skills</h3>
      <div id="skill-information" className="user-info-section">
        <textarea id="skills" className="user-info-data" rows="4" cols="50"
                  placeholder="Enter your skills (comma-separated)"></textarea>
      </div>

      <h3>Languages</h3>
      <div id="language-information" className="user-info-dynamic-section">
        {/* Dynamically populated */}
      </div>
      <button id="add-language-information">Add Another Language</button>

      <h3>Awards and Certifications</h3>
      <div id="award-information" className="user-info-dynamic-section">
        {/* Dynamically populated */}
      </div>
      <button id="add-award-information">Add Another</button>

      <h3>Relevant Websites</h3>
      <div id="website-information" className="user-info-dynamic-section">
        {/* Dynamically populated */}
      </div>
      <button id="add-website-information">Add Another Website</button>

      <h3>Projects</h3>
      <div id="project-information" className="user-info-dynamic-section">
        {/* Dynamically populated */}
      </div>
      <button id="add-project-information">Add Another Project</button>

      <h3>Other Relevant Information</h3>
      <div id="other-information" className="user-info-section">
        <textarea id="relevant-info" className="user-info-data" rows="4" cols="50"
                  placeholder="Enter any other information about yourself :)"></textarea>
      </div>

      <br /><br />
      <hr />
      <button id="save-information" onClick={saveUserInformation}>
        Save Information and go to Resume Generator
      </button>
      <hr />
    </main>
  );
}
