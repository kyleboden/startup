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
    const [skills, setSkills] = useState([]);  // State for skills
    const [languageEntries, setLanguageEntries] = useState([]);

    const [isAddingEducation, setIsAddingEducation] = useState(false);
    const [isAddingWork, setIsAddingWork] = useState(false); // State for adding work
    const [isAddingSkill, setIsAddingSkill] = useState(false);  // State for adding skills
    const [isAddingLanguage, setIsAddingLanguage] = useState(false);



    const [newEducation, setNewEducation] = useState({
        school: '',
        startDate: '',
        endDate: '',
        gpa: '',
        major: '',
    });
    const [newWork, setNewWork] = useState({ // State for new work entry
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        keyRoles: '',
    });
    const [newSkill, setNewSkill] = useState('');  // State for new skill
    const [newLanguage, setNewLanguage] = useState({
        language: '', 
        proficiency: '' 
    });

    const [isEditingEducation, setIsEditingEducation] = useState(false);
    const [isEditingWork, setIsEditingWork] = useState(false); // State for editing work
    const [isEditingLanguage, setIsEditingLanguage] = useState(false);
    
// Handle Changes
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

    const handleNewSkillChange = (e) => {
        setNewSkill(e.target.value); // Update the new skill input state
    };

    const handleNewLanguageChange = (e) => {
        const { id, value } = e.target;
        setNewLanguage((prevLanguage) => ({
            ...prevLanguage,
            [id]: value,
        }));
    };

// Adding
    const addEducationEntry = () => {
        if (newEducation.school && newEducation.startDate && newEducation.endDate) {
            setEducationEntries((prev) => [...prev, newEducation]);
            setNewEducation({ school: '', startDate: '', endDate: '' });
            setIsAddingEducation(false);
        }
    };

    const addWorkEntry = () => {
        if (newWork.company && newWork.position && newWork.startDate && newWork.endDate) {
            setWorkEntries((prev) => [...prev, newWork]);
            setNewWork({ company: '', position: '', startDate: '', endDate: '', keyRoles: '' });
            setIsAddingWork(false);
        }
    };

    const handleAddSkill = () => {
        if (newSkill && !skills.includes(newSkill)) { // Check if the skill is not empty and not already in the list
            setSkills([...skills, newSkill]);
            setNewSkill(''); // Clear the input field after adding
        }
    };

    const addLanguageEntry = () => {
        if (newLanguage.language && newLanguage.proficiency) {
            setLanguageEntries([...languageEntries, newLanguage]);
            setNewLanguage({ language: '', proficiency: '' });
            setIsAddingLanguage(false);
        } else {
            alert("Please fill in both fields before saving.");
        }
    };

// Removing
    const removeEducationEntry = (index) => {
            const updatedEntries = educationEntries.filter((_, i) => i !== index);
            setEducationEntries(updatedEntries);
        };

    const removeWorkEntry = (index) => { // Function to remove work entry
        const updatedEntries = workEntries.filter((_, i) => i !== index);
        setWorkEntries(updatedEntries);
    };

    const handleSkillRemove = (index) => {
        const updatedSkills = skills.filter((_, i) => i !== index);
        setSkills(updatedSkills);
    };

    const removeLanguageEntry = (index) => {
        const updatedLanguageEntries = languageEntries.filter((_, i) => i !== index);
        setLanguageEntries(updatedLanguageEntries);
    };

// Editing
    const editEducationEntry = (index) => {
        setCurrentEducationIndex(index);
        setNewEducation(educationEntries[index]);
        setIsEditingEducation(true);
        setIsAddingEducation(false);
    };

    const editWorkEntry = (index) => { // Function to set up editing work entry
        setCurrentWorkIndex(index);
        setNewWork(workEntries[index]);
        setIsEditingWork(true);
        setIsAddingWork(false);
    };

    const editLanguageEntry = (index) => {
        const entry = languageEntries[index];
        setNewLanguage(entry); // Set the entry values for editing
        setIsEditingLanguage(true);
        setEditIndex(index); // Store the index of the entry being edited
    };

    const saveEditedLanguageEntry = () => {
        const updatedLanguageEntries = [...languageEntries];
        updatedLanguageEntries[editIndex] = newLanguage; // Update the specific entry
        setLanguageEntries(updatedLanguageEntries);
        setNewLanguage({ language: '', proficiency: '' });
        setIsEditingLanguage(false);
        setEditIndex(null);
    };


    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {  // Check if Enter key is pressed
            handleAddSkill();  // Add the skill
            e.preventDefault(); // Prevent form submission or other default actions
        }
    };







    
    

    return (
        <main className="user-info-main">

            <h2>Welcome!</h2>
            <br></br>
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
                        <p>GPA: {entry.school}</p>
                        <p>Major: {entry.school}</p>

                        <div className="button-group">
                        <button className="edit-button" onClick={() => editEducationEntry(index)}>Edit</button>
                        <button className="remove-button" onClick={() => removeEducationEntry(index)}>Remove</button>
                        </div>
                    </div>
                ))}

                <button className="add-button"onClick={() => {
                    setIsAddingEducation(true);
                    setIsEditingEducation(false); // Reset editing when adding new
                    setNewEducation({ school: '', startDate: '', endDate: '' }); // Reset form
                }}>Add Education</button>

                {(isAddingEducation || isEditingEducation) && (
                    <div className="new-education-form">
                        <div className="input-group">
                <label htmlFor="school">School:</label>
                <input type="text" id="school" value={newEducation.school} onChange={handleNewEducationChange} placeholder="Enter school name" />
            </div>

            <div className="input-group date-container"> {/* New container for dates */}
                <div>
                    <label htmlFor="startDate">Start Date:</label>
                    <input type="text" id="startDate" value={newEducation.startDate} onChange={handleNewEducationChange} placeholder="MM/YYYY" />
                </div>
                <div>
                    <label htmlFor="endDate">End Date:</label>
                    <input type="text" id="endDate" value={newEducation.endDate} onChange={handleNewEducationChange} placeholder="MM/YYYY" />
                </div>
            </div>

            <div className="input-group">
                <label htmlFor="gpa">GPA:</label>
                <input type="text" id="gpa" value={newEducation.gpa} onChange={handleNewEducationChange} placeholder="Enter your GPA" />
            </div>

            <div className="input-group">
                <label htmlFor="major">Major:</label>
                <input type="text" id="major" value={newEducation.major} onChange={handleNewEducationChange} placeholder="Enter your major" />
            </div>

                        <div className="button-group">
                            <button className="update-button" onClick={addEducationEntry}>{isEditingEducation ? 'Update Education' : 'Save Education'}</button>
                            <button className="cancel-button" onClick={() => {
                                setIsAddingEducation(false);
                                setIsEditingEducation(false);
                                setNewEducation({ school: '', startDate: '', endDate: '' }); // Reset form
                            }}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>

            <br />
            <h3>Work History</h3>
            <div className="work-section">
                {workEntries.map((entry, index) => (
                    <div key={index} className="work-entry">
                        <p>Company: {entry.company}</p>
                        <p>Position: {entry.position}</p>
                        <p>Start: {entry.startDate}</p>
                        <p>End: {entry.endDate}</p>
                        <p>
                            Key Roles: <br />
                            <span dangerouslySetInnerHTML={{ __html: entry.keyRoles.replace(/\n/g, '<br />') }} />
                        </p>
                        <div className="button-group">
                        <button className="edit-button"onClick={() => editWorkEntry(index)}>Edit</button>
                        <button className="remove-button" onClick={() => removeWorkEntry(index)}>Remove</button>
                        </div>
                    </div>
                ))}

                <button className="add-button"onClick={() => {
                    setIsAddingWork(true);
                    setIsEditingWork(false); // Reset editing when adding new
                    setNewWork({ company: '', position: '', startDate: '', endDate: '', keyRoles: ''}); // Reset form
                }}>Add Work</button>

                {(isAddingWork || isEditingWork) && (
                    <div className="new-work-form">
                        <div className="input-group">
                            <label htmlFor="company">Company:</label>
                            <input type="text" id="company" value={newWork.company} onChange={handleNewWorkChange} placeholder="Enter company name" />
                        </div>

                        <div className="input-group">
                            <label htmlFor="position">Position:</label>
                            <input type="text" id="position" value={newWork.position} onChange={handleNewWorkChange} placeholder="Enter position" />
                        </div>


                        <div className="input-group date-container">
                            <div>
                                <label htmlFor="startDate">Start Date:</label>
                                <input type="text" id="startDate" value={newWork.startDate} onChange={handleNewWorkChange} placeholder="MM/YYYY" />
                            </div>
                            <div>
                                <label htmlFor="endDate">End Date:</label>
                                <input type="text" id="endDate" value={newWork.endDate} onChange={handleNewWorkChange} placeholder="MM/YYYY" />
                            </div>
                        </div>

                        <div className="input-group">
                        <label htmlFor="keyRoles">Key Roles:</label><br />
                        <textarea id="keyRoles" value={newWork.keyRoles} onChange={handleNewWorkChange} placeholder="Enter key roles in your work history" rows="4" />
                        </div>

                        <div className="button-group">
                            <button className="update-button" onClick={addWorkEntry}>{isEditingWork ? 'Update Work' : 'Save Work'}</button>
                            <button className="cancel-button" onClick={() => {
                                setIsAddingWork(false);
                                setIsEditingWork(false);
                                setNewWork({ company: '', position: '', startDate: '', endDate: '', keyRoles: '' }); // Reset form
                            }}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>

            <br />
            <h3>Skills</h3>
            <div className="skills-section">
                {skills.map((skill, index) => (
                    <div key={index} className="skill-entry">
                        <span>{skill}</span>
                        <span className="remove-skill" onClick={() => handleSkillRemove(index)}>×</span>
                    </div>
                ))}
            </div>

            <div className="add-skill">
                <input
                    type="text"
                    value={newSkill}
                    onChange={handleNewSkillChange}
                    placeholder="Add a new skill"
                    onKeyDown={(e) => handleKeyDown(e, 'skill')} // Use the existing handleKeyDown function

                />
                <button onClick={handleAddSkill}>Add Skill</button>
            </div>

            <br />
            <h3>Languages</h3>
            <div className="language-section">
                {languageEntries.map((entry, index) => (
                    <div key={index} className="language-entry">
                        <p>Language: {entry.language}</p>
                        <p>Proficiency: {entry.proficiency}</p>
                        <div className="button-group">
                            <button className="edit-button" onClick={() => editLanguageEntry(index)}>Edit</button>
                            <button className="remove-button" onClick={() => removeLanguageEntry(index)}>Remove</button>
                        </div>
                    </div>
                ))}
                <button className="add-button" onClick={() => setIsAddingLanguage(true)}>Add Language</button>

                {(isAddingLanguage || isEditingLanguage) && (
                    <div className="new-language-form">
                        <div className="input-group">
                            <label htmlFor="language">Language:</label>
                            <input
                                type="text"
                                id="language"
                                value={newLanguage.language}
                                onChange={handleNewLanguageChange}
                                placeholder="Enter language"
                            />

                            <select
                                id="proficiency"
                                value={newLanguage.proficiency}
                                onChange={handleNewLanguageChange}
                            >
                                <option value="">Select proficiency</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                                <option value="Fluent">Fluent</option>
                                <option value="Native">Native</option>
                            </select>
                        </div>
                        <div className="button-group">
                            <button className="update-button"onClick={isEditingLanguage ? saveEditedLanguageEntry : addLanguageEntry}>
                                {isEditingLanguage ? 'Save Changes' : 'Save Language'}
                            </button>
                            <button className="cancel-button" onClick={() => {
                                setIsAddingLanguage(false);
                                setIsEditingLanguage(false);
                                setNewLanguage({ language: '', proficiency: ''}); // Reset form
                            }}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>






        </main>
    );
}
