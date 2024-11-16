import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // Import Link for navigation

import './userInfo.css';

export function UserInfo() {
    const [educationEntries, setEducationEntries] = useState([]);

    const [isAddingEducation, setIsAddingEducation] = useState(false);

    const [currentEducationIndex, setCurrentEducationIndex] = useState(null);

    const [newEducation, setNewEducation] = useState({
        school: '',
        startDate: '',
        endDate: '',
        gpa: '',
        major: '',
    });

    const [isEditingEducation, setIsEditingEducation] = useState(false);


//useEffect, testing
    useEffect(() => {
        // Fetch all education entries from the backend
        fetch('/api/education')
            .then((res) => res.json())
            .then(setEducationEntries)
            .catch(console.error);
    }, []);

    const saveEducation = () => {
        const method = isEditingEducation ? 'PUT' : 'POST';
        const endpoint = isEditingEducation
            ? `/api/education/${educationEntries[currentEducationIndex].id}`
            : '/api/education';

        fetch(endpoint, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newEducation),
        })
            .then((res) => res.json())
            .then((savedEducation) => {
                if (isEditingEducation) {
                    setEducationEntries((prev) =>
                        prev.map((edu, index) =>
                            index === currentEducationIndex ? savedEducation : edu
                        )
                    );
                } else {
                    setEducationEntries((prev) => [...prev, savedEducation]);
                }

                // Reset states
                setNewEducation({
                    school: '',
                    startDate: '',
                    endDate: '',
                    gpa: '',
                    major: '',
                });
                setIsAddingEducation(false);
                setIsEditingEducation(false);
            })
            .catch(console.error);
    };


// Handle Changes
    const handleNewEducationChange = (e) => {
        const { id, value } = e.target;
        setNewEducation((prevEducation) => ({
            ...prevEducation,
            [id]: value,
        }));
    };


// Adding
    const addEducationEntry = () => {
        if (newEducation.school && newEducation.startDate && newEducation.endDate) {
            if (isEditingEducation && currentEducationIndex !== null) {
                // Update the education entry at the specific index
                const updatedEducationEntries = [...educationEntries];
                updatedEducationEntries[currentEducationIndex] = newEducation;
                setEducationEntries(updatedEducationEntries);
            } else {
                // Add a new education entry if not editing
                setEducationEntries((prev) => [...prev, newEducation]);
            }

            // Reset states after action
            setNewEducation({ school: '', startDate: '', endDate: '' });
            setIsAddingEducation(false);
            setIsEditingEducation(false);
        } else {
            alert("Please fill in all fields.");
        }
    };

// Removing
    const removeEducationEntry = (index) => {
        const educationId = educationEntries[index].id;

        fetch(`/api/education/${educationId}`, { method: 'DELETE' })
            .then(() => {
                setEducationEntries((prev) =>
                    prev.filter((_, i) => i !== index)
                );
            })
            .catch(console.error);
    };


// Editing
    const editEducationEntry = (index) => {
        setCurrentEducationIndex(index);
        setNewEducation(educationEntries[index]);
        setIsEditingEducation(true);
        setIsAddingEducation(false);
    };

    return (
        <main className="user-info-main">

            <h2>Welcome!</h2>
            <h3>Education</h3>
            <div className="education-section">
                {educationEntries.map((entry, index) => (
                    <div key={entry.id} className="education-entry">
                        <p>School: {entry.school}</p>
                        <p>Start: {entry.startDate}</p>
                        <p>End: {entry.endDate}</p>
                        <p>GPA: {entry.gpa}</p>
                        <p>Major: {entry.major}</p>

                        <div className="button-group">
                            <button
                                className="edit-button"
                                onClick={() => editEducationEntry(index)}
                            >
                                Edit
                            </button>
                            <button
                                className="remove-button"
                                onClick={() => removeEducationEntry(index)}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}

                <button
                    className="add-button"
                    onClick={() => {
                        setIsAddingEducation(true);
                        setIsEditingEducation(false); // Reset editing when adding new
                        setNewEducation({
                            school: '',
                            startDate: '',
                            endDate: '',
                            gpa: '',
                            major: '',
                        }); // Reset form
                    }}
                >
                    Add Education
                </button>

                {(isAddingEducation || isEditingEducation) && (
                    <div className="new-education-form">
                        <div className="input-group">
                            <label htmlFor="school">School:</label>
                            <input
                                type="text"
                                id="school"
                                value={newEducation.school}
                                onChange={handleNewEducationChange}
                                placeholder="Enter school name"
                            />
                        </div>

                        <div className="input-group date-container">
                            <div>
                                <label htmlFor="startDate">Start Date:</label>
                                <input
                                    type="text"
                                    id="startDate"
                                    value={newEducation.startDate}
                                    onChange={handleNewEducationChange}
                                    placeholder="MM/YYYY"
                                />
                            </div>
                            <div>
                                <label htmlFor="endDate">End Date:</label>
                                <input
                                    type="text"
                                    id="endDate"
                                    value={newEducation.endDate}
                                    onChange={handleNewEducationChange}
                                    placeholder="MM/YYYY"
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label htmlFor="gpa">GPA:</label>
                            <input
                                type="text"
                                id="gpa"
                                value={newEducation.gpa}
                                onChange={handleNewEducationChange}
                                placeholder="Enter your GPA"
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="major">Major:</label>
                            <input
                                type="text"
                                id="major"
                                value={newEducation.major}
                                onChange={handleNewEducationChange}
                                placeholder="Enter your major"
                            />
                        </div>

                        <div className="button-group">
                            <button
                                className="update-button"
                                onClick={saveEducation}
                            >
                                {isEditingEducation ? 'Update Education' : 'Save Education'}
                            </button>
                            <button
                                className="cancel-button"
                                onClick={() => {
                                    setIsAddingEducation(false);
                                    setIsEditingEducation(false);
                                    setNewEducation({
                                        school: '',
                                        startDate: '',
                                        endDate: '',
                                        gpa: '',
                                        major: '',
                                    }); // Reset form
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div>
                <Link to="/generator">
                <button className = "save-resume-button" onClick={handleSaveUserInformation}>
                    Save Information and Go to Resume Generator
                </button>
                </Link>
            </div>
        </main>
        
    );
}
