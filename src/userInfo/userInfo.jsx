import React, { useState } from 'react';
import './userInfo.css';

export function UserInfo() {
    const [contactInfo, setContactInfo] = useState({
        fullName: '',
        phoneNumber: '',
        address: '',
        email: '',
        linkedIn: '',
    });
    const [educationEntries, setEducationEntries] = useState([]);
    const [workEntries, setWorkEntries] = useState([]); // State for work history
    const [isAddingEducation, setIsAddingEducation] = useState(false);
    const [isAddingWork, setIsAddingWork] = useState(false); // State for adding work
    const [newEducation, setNewEducation] = useState({
        school: '',
        startDate: '',
        endDate: '',
    });
    const [newWork, setNewWork] = useState({ // State for new work entry
        company: '',
        position: '',
        startDate: '',
        endDate: '',
    });
    const [isEditingEducation, setIsEditingEducation] = useState(false);
    const [currentEducationIndex, setCurrentEducationIndex] = useState(null);
    const [isEditingWork, setIsEditingWork] = useState(false); // State for editing work
    const [currentWorkIndex, setCurrentWorkIndex] = useState(null); // Index for current work entry being edited

    const handleContactChange = (e) => {
        const { id, value } = e.target;
        setContactInfo((prevInfo) => ({
            ...prevInfo,
            [id]: value,
        }));
    };

    const handleNewEducationChange = (e) => {
        const { id, value } = e.target;
        setNewEducation((prevEducation) => ({
            ...prevEducation,
            [id]: value,
        }));
    };

    const handleNewWorkChange = (e) => { // Handle changes for new work entry
        const { id, value } = e.target;
        setNewWork((prevWork) => ({
            ...prevWork,
            [id]: value,
        }));
    };

    const addEducationEntry = () => {
        if (newEducation.school && newEducation.startDate && newEducation.endDate) {
            setEducationEntries((prev) => [...prev, newEducation]);
            setNewEducation({ school: '', startDate: '', endDate: '' });
            setIsAddingEducation(false);
        }
    };

    const removeEducationEntry = (index) => {
        const updatedEntries = educationEntries.filter((_, i) => i !== index);
        setEducationEntries(updatedEntries);
    };

    const editEducationEntry = (index) => {
        setCurrentEducationIndex(index);
        setNewEducation(educationEntries[index]);
        setIsEditingEducation(true);
        setIsAddingEducation(false);
    };

    const addWorkEntry = () => { // Function to add work entry
        if (newWork.company && newWork.position && newWork.startDate && newWork.endDate) {
            setWorkEntries((prev) => [...prev, newWork]);
            setNewWork({ company: '', position: '', startDate: '', endDate: '' });
            setIsAddingWork(false);
        }
    };

    const removeWorkEntry = (index) => { // Function to remove work entry
        const updatedEntries = workEntries.filter((_, i) => i !== index);
        setWorkEntries(updatedEntries);
    };

    const editWorkEntry = (index) => { // Function to set up editing work entry
        setCurrentWorkIndex(index);
        setNewWork(workEntries[index]);
        setIsEditingWork(true);
        setIsAddingWork(false);
    };

    return (
        <main className="user-info-main">
            <h2>Welcome!</h2>

            <h3>Contact Information</h3>
            <div className="contact-section">
                <div className="contact-grid">
                    <div>
                        <label htmlFor="fullName">Full Name:</label>
                        <input type="text" id="fullName" className="user-info-data" placeholder="Enter your Full Name" onChange={handleContactChange} />
                    </div>
                    <div>
                        <label htmlFor="phone">Phone Number:</label>
                        <input type="text" id="phone" className="user-info-data" placeholder="Enter your phone number" onChange={handleContactChange} />
                    </div>
                    <div>
                        <label htmlFor="address">Address:</label>
                        <input type="text" id="address" className="user-info-data" placeholder="Enter your address" onChange={handleContactChange} />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" className="user-info-data" placeholder="Enter your email" onChange={handleContactChange} />
                    </div>
                    <div>
                        <label htmlFor="linkedIn">LinkedIn URL:</label>
                        <input type="url" id="linkedIn" className="user-info-data" placeholder="Enter your LinkedIn URL" onChange={handleContactChange} />
                    </div>
                </div>
            </div>

            <h3>Education</h3>
            <div className="education-section">
                {educationEntries.map((entry, index) => (
                    <div key={index} className="education-entry">
                        <p>School: {entry.school}</p>
                        <p>Start: {entry.startDate}</p>
                        <p>End: {entry.endDate}</p>
                        <div className="button-group">
                            <button onClick={() => removeEducationEntry(index)}>Remove</button>
                            <button onClick={() => editEducationEntry(index)}>Edit</button>
                        </div>
                    </div>
                ))}

                <button onClick={() => {
                    setIsAddingEducation(true);
                    setIsEditingEducation(false); // Reset editing when adding new
                    setNewEducation({ school: '', startDate: '', endDate: '' }); // Reset form
                }}>Add Education</button>

                {(isAddingEducation || isEditingEducation) && (
                    <div className="new-education-form">
                        <label htmlFor="school">School:</label>
                        <input type="text" id="school" value={newEducation.school} onChange={handleNewEducationChange} placeholder="Enter school name" />

                        <label htmlFor="startDate">Start Date:</label>
                        <input type="text" id="startDate" value={newEducation.startDate} onChange={handleNewEducationChange} placeholder="MM/YYYY" />

                        <label htmlFor="endDate">End Date:</label>
                        <input type="text" id="endDate" value={newEducation.endDate} onChange={handleNewEducationChange} placeholder="MM/YYYY" />
                        <div className="button-group">
                            <button onClick={addEducationEntry}>{isEditingEducation ? 'Update Education' : 'Save Education'}</button>
                            <button onClick={() => {
                                setIsAddingEducation(false);
                                setIsEditingEducation(false);
                                setNewEducation({ school: '', startDate: '', endDate: '' }); // Reset form
                            }}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>

            // Inside the return statement of your UserInfo component
<h3>Work History</h3>
<div className="work-section">
    {workEntries.map((entry, index) => (
        <div key={index} className="work-entry">
            <p>Company: {entry.company}</p>
            <p>Position: {entry.position}</p>
            <p>Start: {entry.startDate}</p>
            <p>End: {entry.endDate}</p>
            <div className="button-group">
                <button onClick={() => removeWorkEntry(index)}>Remove</button>
                <button onClick={() => editWorkEntry(index)}>Edit</button>
            </div>
        </div>
    ))}

    <button onClick={() => {
        setIsAddingWork(true);
        setIsEditingWork(false); // Reset editing when adding new
        setNewWork({ company: '', position: '', startDate: '', endDate: '' }); // Reset form
    }}>Add Work</button>

    {(isAddingWork || isEditingWork) && (
        <div className="new-work-form">
            <label htmlFor="company">Company:</label>
            <input type="text" id="company" value={newWork.company} onChange={handleNewWorkChange} placeholder="Enter company name" />

            <label htmlFor="position">Position:</label>
            <input type="text" id="position" value={newWork.position} onChange={handleNewWorkChange} placeholder="Enter position" />

            <label htmlFor="workStartDate">Start Date:</label>
            <input type="text" id="workStartDate" value={newWork.startDate} onChange={handleNewWorkChange} placeholder="MM/YYYY" />

            <label htmlFor="workEndDate">End Date:</label>
            <input type="text" id="workEndDate" value={newWork.endDate} onChange={handleNewWorkChange} placeholder="MM/YYYY" />
            <div className="button-group">
                <button onClick={addWorkEntry}>{isEditingWork ? 'Update Work' : 'Save Work'}</button>
                <button onClick={() => {
                    setIsAddingWork(false);
                    setIsEditingWork(false);
                    setNewWork({ company: '', position: '', startDate: '', endDate: '' }); // Reset form
                }}>Cancel</button>
            </div>
        </div>
    )}
</div>


        </main>
    );
}
