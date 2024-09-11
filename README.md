# JobFitAI


## Specification Deliverable

### Elevator Pitch
Job hunting can be exhausting, with hours spent crafting resumes, writing cover letters, and applying to countless jobs, often without hearing back. In today's world, companies use AI tools to filter resumes before they even reach a human. With recruiters overwhelmed by applications, many great candidates are overlooked. JobFitAI changes that. Our platform uses AI to analyze job descriptions and your qualifications to create tailored resumes and cover letters that help you stand out, leveling the playing field and increasing your chances of landing an interview.

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


### Tecnologies
I am going to use the required technologies in the following ways.

- HTML - Uses correct HTML structure for application. Two HTML pages. One for login and one for voting. Hyperlinks to choice artifact.
- CSS - Application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast.
- React - Provides login, choice display, applying votes, display other users votes, and use of React for routing and components.
- Service - Backend service with endpoints for:
  - login
  - retrieving choices
  - submitting votes
  - retrieving vote status
- DB/Login - Store users, choices, and votes in database. Register and login users. Credentials securely stored in database. Can't vote unless authenticated.
- WebSocket - As each user votes, their votes are broadcast to all other users.
