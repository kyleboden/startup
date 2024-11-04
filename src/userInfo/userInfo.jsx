import React, { useEffect, useState } from 'react';
import './userInfo.css';

export function UserInfo () {
    const [userInfo, setUserInfo] = useState({});
    const [educationEntries, setEducationEntries] = useState([]);
    const [workEntries, setWorkEntries] = useState([]);
    const [languageEntries, setLanguageEntries] = useState([]);
    const [awardEntries, setAwardEntries] = useState([]);
    const [websiteEntries, setWebsiteEntries] = useState([]);
    const [projectEntries, setProjectEntries] = useState([]);
    const [username, setUsername] = useState('Guest');

    useEffect(() => {
        loadUserInformation();
        const params = new URLSearchParams(window.location.search);
        const userParam = params.get('username');
        setUsername(userParam || 'Guest');
    }, []);

    const saveUserInformation = () => {
        const updatedUserInfo = { ...userInfo };

        // Gather static section data
        const sections = document.querySelectorAll('.user-info-section');
        sections.forEach(section => {
            const sectionValue = {};
            const data = section.querySelectorAll('.user-info-data');
            data.forEach(item => {
                sectionValue[item.id] = item.type === 'checkbox' ? item.checked : item.value;
            });
            updatedUserInfo[section.id] = sectionValue;
        });

        // Gather dynamic section data
        updatedUserInfo.education = educationEntries;
        updatedUserInfo.workHistory = workEntries;
        updatedUserInfo.languages = languageEntries;
        updatedUserInfo.awards = awardEntries;
        updatedUserInfo.websites = websiteEntries;
        updatedUserInfo.projects = projectEntries;

        localStorage.setItem('user-info', JSON.stringify(updatedUserInfo));
        setUserInfo(updatedUserInfo);
        window.location.href = 'generator.html';
    };

    const loadUserInformation = () => {
        const storedUserInfo = JSON.parse(localStorage.getItem('user-info')) || {};
        setUserInfo(storedUserInfo);

        // Set form values from localStorage
        const sections = document.querySelectorAll('.user-info-section');
        sections.forEach(section => {
            const data = section.querySelectorAll('.user-info-data');
            const sectionData = storedUserInfo[section.id] || {};
            data.forEach(item => {
                if (item.type === 'checkbox') {
                    item.checked = sectionData[item.id] || false;
                } else {
                    item.value = sectionData[item.id] || '';
                }
            });
        });
    };

    const addEducationEntry = () => {
        setEducationEntries([...educationEntries, { school: '', startDate: '', endDate: '', gpa: '', major: '' }]);
    };

    const removeEducationEntry = (index) => {
        const updatedEntries = educationEntries.filter((_, i) => i !== index);
        setEducationEntries(updatedEntries);
    };

    const handleEducationChange = (index, field, value) => {
        const updatedEntries = [...educationEntries];
        updatedEntries[index][field] = value;
        setEducationEntries(updatedEntries);
    };

    const renderEducationEntries = () => {
        return educationEntries.map((entry, index) => (
            <div className="education-entry user-info-dynamic-subsection" key={index}>
                <label>School:</label>
                <input type="text" className="user-info-data" value={entry.school} onChange={(e) => handleEducationChange(index, 'school', e.target.value)} placeholder="Enter your school name" /><br /><br />
                
                <label>Start Date:</label>
                <input type="date" className="user-info-data" value={entry.startDate} onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)} /><br /><br />
                
                <label>End Date:</label>
                <input type="date" className="user-info-data" value={entry.endDate} onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)} /><br /><br />
                
                <label>GPA:</label>
                <input type="text" className="user-info-data" value={entry.gpa} onChange={(e) => handleEducationChange(index, 'gpa', e.target.value)} placeholder="Enter your GPA" /><br /><br />
                
                <label>Major:</label>
                <input type="text" className="user-info-data" value={entry.major} onChange={(e) => handleEducationChange(index, 'major', e.target.value)} placeholder="Enter your major" /><br /><br />
                <button type="button" onClick={() => removeEducationEntry(index)}>Remove</button>
            </div>
        ));
    };

    return (
        <div>
            <header className="d-flex justify-content-between align-items-center fixed-top">
                <a href="./index.html">
                    <img src="ApplySmartTWhite.png" style={{ width: '200px', height: 'auto' }} alt="Logo" />
                </a>
                <nav className="navbar navbar-expand-lg">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item"><a className="nav-link" href="index.html">Home</a></li>
                            <li className="nav-item"><a className="nav-link" href="login.html">Login</a></li>
                            <li className="nav-item"><a className="nav-link" href="generator.html">Resume Generator</a></li>
                            <li className="nav-item"><a className="nav-link active" href="userInfo.html">Update Information</a></li>
                        </ul>
                    </div>
                </nav>
            </header>

            <main>
                <h2>Welcome, {username}!</h2>
                <p>Please tell us more about you!</p>
                <br />

                <h3>Contact Information</h3>
                <div className="user-info-section" id="contact-information">
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
                    {renderEducationEntries()}
                </div>
                <button type="button" onClick={addEducationEntry}>Add Education</button>

                {/* Similar sections for Work History, Skills, Languages, Awards, Websites, Projects can be added here */}
                <button id="save-information" onClick={saveUserInformation}>Save Information and go to Resume Generator</button>
            </main>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js"></script>
        </div>
    );
};

