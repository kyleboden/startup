# ApplySmart


## Specification Deliverable

### Elevator Pitch
Job hunting can be exhausting, with hours spent crafting resumes, writing cover letters, and applying to countless jobs, often without hearing back. In today's world, companies use AI tools to filter resumes before they even reach a human. With recruiters overwhelmed by applications, many great candidates are overlooked. ApplySmart changes that. Our platform uses AI to analyze job descriptions and your qualifications to create tailored resumes and cover letters that help you stand out, leveling the playing field and increasing your chances of landing an interview.

### Design
Here is a basic design of what the **login page** would look like:

![Login Page Design](/images/Login.png)


Here is a basic design of what the **main page** would look like once a user has logged in:

![Main Page Design](/images/MainPage.png)


### Key Features
- **Secure Login**: Protects user data with encrypted connections over HTTPS.
- **Personalized Profile**: Create and store a user profile with key information, including:
  - Work Experience
  - Contact Information
  - Education
  - Skills
  - Languages
- **Customizable Templates**: Choose from various resume and cover letter templates to suit different job applications.
- **Job Description Analysis**: Automatically reads and analyzes job descriptions to align qualifications effectively.
- **AI-Powered Document Creation**: Leverages ChatGPT to generate tailored resumes and cover letters.
- **Editable Documents**: Easily modify and personalize AI-generated documents to match your style or preferences.

### Technologies
I will use the required technologies in the following ways:

- **HTML**: Provides the basic structure of the web application, with two main pages:
  - A login page for user authentication.
  - A form page for inputting information, where users can generate and modify resumes and cover letters.
  
- **CSS**: Used for styling the application, ensuring a consistent color theme, font styles, and sizes across the app. CSS animations will enhance user interactions, such as highlighting active input fields or animating button presses.

- **JavaScript**: It will handle actions like submitting forms and loading personalized content after login.

- **React**: 
  - React will be the primary framework for building reusable components, such as forms, profile sections, and templates for resumes.
  - React Router will handle navigation between pages (e.g., login page, resume generation page) without refreshing the entire page, providing a smoother user experience.

- **Web Service**: 
  - A backend service will handle requests such as:
    - User login and authentication.
    - Retrieving stored user information (work experience, education, skills).
    - Fetching job descriptions for analysis.
    - Submitting updated resumes and cover letters.

- **Authentication**: 
  - The login system will allow users to create an account and securely log in. Upon login, the application will display the user's name and provide access to their stored profile information (e.g., work history, skills).

- **Database**: 
  - A database will store user profiles, including work experience, education, skills, and previously generated documents (resumes and cover letters). This ensures users can revisit and update their documents as needed.

- **WebSocket**: 
  - WebSockets will be used to update the user interface in real-time, such as when a new resume or cover letter is generated.

## HTML deliverable

For this deliverable I built out the structure of my application using HTML.
- [x] **HTML pages** - Three HTML page that represent the ability to login input User Information, and generate a Resume/Cover Letter
