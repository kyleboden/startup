import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // Import Link for navigation

import './userInfo.css';

export function UserInfo() {
    const [userInfo, setUserInfo] = useState({});

    const handleSaveUserInformation = () => {
      // Collect the user information from the form fields
      const sections = document.querySelectorAll('.user-info-section');
      const newUserInfo = {};
  
      sections.forEach((section) => {
        const sectionValue = {};
        const data = section.querySelectorAll('.user-info-data');
        data.forEach((item) => {
          sectionValue[item.id] = item.type === 'checkbox' ? item.checked : item.value;
        });
        newUserInfo[section.id] = sectionValue;
      });
  
      // Store the information in localStorage
      localStorage.setItem('user-info', JSON.stringify(newUserInfo));
    };
    

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
    const [awardEntries, setAwardEntries] = useState([]);
    const [websiteEntries, setwebsiteEntries] = useState([]);


    const [isAddingEducation, setIsAddingEducation] = useState(false);
    const [isAddingWork, setIsAddingWork] = useState(false); // State for adding work
    const [isAddingSkill, setIsAddingSkill] = useState(false);  // State for adding skills
    const [isAddingLanguage, setIsAddingLanguage] = useState(false);
    const [isAddingAward, setIsAddingAward] = useState(false);
    const [isAddingWebsite, setIsAddingWebsite] = useState(false);

    const [currentEducationIndex, setCurrentEducationIndex] = useState(null);
    const [currentWorkIndex, setCurrentWorkIndex] = useState(null);
    const [currentLanguageIndex, setCurrentLanguageIndex] = useState(null);
    const [currentAwardIndex, setCurrentAwardIndex] = useState(null);
    const [currentWebsiteIndex, setCurrentWebsiteIndex] = useState(null);



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
    const [newAward, setNewAward] = useState({
        title: '', date: '' 
    });
    const [newWebsite, setNewWebsite] = useState({
        website: '', description: '' 
    });

    const [isEditingEducation, setIsEditingEducation] = useState(false);
    const [isEditingWork, setIsEditingWork] = useState(false); // State for editing work
    const [isEditingLanguage, setIsEditingLanguage] = useState(false);
    const [isEditingAward, setIsEditingAward] = useState(false);
    const [isEditingWebsite, setIsEditingWebsite] = useState(false);




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

    const handleNewAwardChange = (e) => {
        const { id, value } = e.target;
        setNewAward((prevAward) => ({
            ...prevAward,
            [id]: value,
        }));
    };    
    
    const handleNewWebsiteChange = (e) => {
        const { id, value } = e.target;
        setNewWebsite((prevWebsite) => ({
            ...prevWebsite,
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


    const addWorkEntry = () => {
        if (newWork.company && newWork.position && newWork.startDate && newWork.endDate) {
            if (isEditingWork && currentWorkIndex !== null) {
                // Update the work entry at the specific index
                const updatedWorkEntries = [...workEntries];
                updatedWorkEntries[currentWorkIndex] = newWork;
                setWorkEntries(updatedWorkEntries);
            } else {
                // Add a new work entry if not editing
                setWorkEntries((prev) => [...prev, newWork]);
            }
    
            // Reset states after action
            setNewWork({ company: '', position: '', startDate: '', endDate: '', keyRoles: '' });
            setIsAddingWork(false);
            setIsEditingWork(false);
        } else {
            alert("Please fill in all fields.");
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
            if (isEditingLanguage && currentLanguageIndex !== null) {
                // Update the language entry at the specific index
                const updatedLanguageEntries = [...languageEntries];
                updatedLanguageEntries[currentLanguageIndex] = newLanguage;
                setLanguageEntries(updatedLanguageEntries);
            } else {
                // Add a new language entry if not editing
                setLanguageEntries((prev) => [...prev, newLanguage]);
            }
    
            // Reset states after action
            setNewLanguage({ language: '', proficiency: '' });
            setIsAddingLanguage(false);
            setIsEditingLanguage(false);
        } else {
            alert("Please fill in both fields before saving.");
        }
    };
    
    const isValidDate = (date) => /^\d{2}\/\d{4}$/.test(date);
    const addAwardEntry = () => {
        if (newAward.title && isValidDate(newAward.date)) {
            if (isEditingAward && currentAwardIndex !== null) {
                // Update the award at the specific index
                const updatedAwards = [...awardEntries];
                updatedAwards[currentAwardIndex] = newAward;
                setAwardEntries(updatedAwards);
            } else {``
                // Add a new award if not editing
                setAwardEntries((prev) => [...prev, newAward]);
            }
    
            // Reset states after action
            setNewAward({ title: '', date: '' });
            setIsAddingAward(false);
            setIsEditingAward(false);
        } else {
            alert("Please enter a valid date in MM/YYYY format.");
        }
    };

    const addWebsiteEntry = () => {
        if (newWebsite.website && newWebsite.description) {
            if (isEditingWebsite && currentWebsiteIndex !== null) {
                // Update the language entry at the specific index
                const updatedWebsiteEntries = [...websiteEntries];
                updatedWebsiteEntries[currentWebsiteIndex] = newWebsite;
                setwebsiteEntries(updatedWebsiteEntries);
            } else {
                // Add a new language entry if not editing
                setwebsiteEntries((prev) => [...prev, newWebsite]);
            }
    
            // Reset states after action
            setNewWebsite({ website: '', description: '' });
            setIsAddingWebsite(false);
            setIsEditingWebsite(false);
        } else {
            alert("Please fill in both fields before saving.");
        }
    };
    


// Removing
    const removeEducationEntry = (index) => {
            setEducationEntries((prev) => prev.filter((_, i) => i !== index));
        };

    const removeWorkEntry = (index) => { // Function to remove work entry
        setWorkEntries((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSkillRemove = (index) => {
        const updatedSkills = skills.filter((_, i) => i !== index);
        setSkills(updatedSkills);
    };

    const removeLanguageEntry = (index) => {
        setLanguageEntries((prev) => prev.filter((_, i) => i !== index));
    };

    const removeAwardEntry = (index) => {
        setAwardEntries((prev) => prev.filter((_, i) => i !== index));
    };    
    const removeWebsiteEntry = (index) => {
        setwebsiteEntries((prev) => prev.filter((_, i) => i !== index));
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
        setCurrentLanguageIndex(index);
        setNewLanguage(languageEntries[index]); // Set the entry values for editing
        setIsEditingLanguage(true);
        setIsAddingLanguage(false);
    };

    const editAwardEntry = (index) => {
        setCurrentAwardIndex(index);
        setNewAward(awardEntries[index]);
        setIsEditingAward(true);
        setIsAddingAward(false);
    };

    const editWebsiteEntry = (index) => {
        setCurrentWebsiteIndex(index);
        setNewWebsite(websiteEntries[index]);
        setIsEditingWebsite(true);
        setIsAddingWebsite(false);
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
                            <button className="update-button"onClick={addLanguageEntry}>{isEditingLanguage ? 'Save Changes' : 'Save Language'}
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
            
            <h3>Awards and Certifications</h3>
            <div className="award-section">
                {awardEntries.map((entry, index) => (
                    <div key={index} className="award-entry">
                        <div className="award-details">
                            <p className="award-title">Title: {entry.title}</p>
                            <p className="award-date">Date: {entry.date}</p>
                        </div>
                        <div className="button-group">
                            <button className="edit-button" onClick={() => editAwardEntry(index)}>Edit</button>
                            <button className="remove-button" onClick={() => removeAwardEntry(index)}>Remove</button>
                        </div>
                    </div>
                ))}
                <button className="add-button" onClick={() => {
                    setIsAddingAward(true);
                    setIsEditingAward(false);
                    setNewAward({ title: '', date: '' });
                }}>Add Award / Certification</button>

                {(isAddingAward || isEditingAward) && (
                    <div className="new-award-form">
                        <div className = "centerAwards">
                            <div>
                                <label htmlFor="title">Title:</label>
                                <input type="text" id="title" value={newAward.title} onChange={handleNewAwardChange} placeholder="Enter award title" />
                            </div>
                            <div>
                                <label htmlFor="date">Date:</label>
                                <input type="text" id="date" value={newAward.date} onChange={handleNewAwardChange} placeholder="MM/YYYY" />
                            </div>
                        </div>
                        
                        <div className="button-group">
                            <button className="update-button" onClick={addAwardEntry}>{isEditingAward ? 'Update Award' : 'Save Award'}</button>
                            <button className="cancel-button" onClick={() => {
                                setIsAddingAward(false);
                                setIsEditingAward(false);
                                setNewAward({ title: '', date: '' });
                            }}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>


            <h3>Relevant Websites</h3>
            <div className="website-section">
                {websiteEntries.map((entry, index) => (
                    <div key={index} className="website-entry">
                        <div className="website-details">
                            <p className="website-website">Website: {entry.website}</p>
                            <p className="website-description">Description: {entry.description}</p>
                        </div>
                        <div className="button-group">
                            <button className="edit-button" onClick={() => editWebsiteEntry(index)}>Edit</button>
                            <button className="remove-button" onClick={() => removeWebsiteEntry(index)}>Remove</button>
                        </div>
                    </div>
                ))}
                <button className="add-button" onClick={() => {
                    setIsAddingWebsite(true);
                    setIsEditingWebsite(false);
                    setNewWebsite({ website: '', description: '' });
                }}>Add Website</button>

                {(isAddingWebsite || isEditingWebsite) && (
                    <div className="new-website-form">
                        <div>
                            <input
                                type="url"
                                id="website"
                                value={newWebsite.website}  // Corrected here
                                onChange={handleNewWebsiteChange}
                                placeholder="Enter website URL"
                                className="wide-input"
                            />
                        </div>
                        <div className="description">
                            <textarea
                                id="description"
                                value={newWebsite.description}
                                onChange={handleNewWebsiteChange}
                                placeholder="Briefly describe the Website"
                                className="wide-input tall-input"
                            />
                        </div>
                        <div className="button-group">
                            <button className="update-button" onClick={addWebsiteEntry}>
                                {isEditingWebsite ? 'Update Website' : 'Save Website'}
                            </button>
                            <button className="cancel-button" onClick={() => {
                                setIsAddingWebsite(false);
                                setIsEditingWebsite(false);
                                setNewWebsite({ website: '', description: '' });  // Corrected here
                            }}>Cancel</button>
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
