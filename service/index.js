const express = require('express');
const uuid = require('uuid');
const app = express();

let users = {};
let educations = [];
let workHistories = [];
let skills = [];
let languages = [];

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));



// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);


// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
    const user = users[req.body.email];
    if (user) {
      res.status(409).send({ msg: 'Existing user' });
    } else {
      const user = { email: req.body.email, password: req.body.password, token: uuid.v4() };
      users[user.email] = user;
  
      res.send({ token: user.token });
    }
  });
  
// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
    const user = users[req.body.email];
    if (user) {
        if (req.body.password === user.password) {
        user.token = uuid.v4();
        res.send({ token: user.token });
        return;
        }
    }
    res.status(401).send({ msg: 'Unauthorized' });
});
  
  // DeleteAuth logout a user
apiRouter.delete('/auth/logout', (req, res) => {
    const user = Object.values(users).find((u) => u.token === req.body.token);
    if (user) {
      delete user.token;
    }
    res.status(204).end();
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});






// --- EDUCATION --- 

// Get all education entries
apiRouter.get('/education', (req, res) => {
  res.send(educations);
});

// Add a new education entry
apiRouter.post('/education', (req, res) => {
  const newEducation = { id: uuid.v4(), ...req.body };
  educations.push(newEducation);
  res.send(newEducation);
});

// Update an existing education entry
apiRouter.put('/education/:id', (req, res) => {
  const { id } = req.params;
  const index = educations.findIndex((edu) => edu.id === id);
  if (index !== -1) {
    educations[index] = { ...educations[index], ...req.body };
    res.send(educations[index]);
  } else {
    res.status(404).send({ msg: 'Education entry not found' });
  }
});

// Delete an education entry
apiRouter.delete('/education/:id', (req, res) => {
  const { id } = req.params;
  educations = educations.filter((edu) => edu.id !== id);
  res.status(204).end();
});

// --- WORK --- 

// Get all work history entries
apiRouter.get('/work-history', (req, res) => {
  res.send(workHistories);
});

// Add a new work history entry
apiRouter.post('/work-history', (req, res) => {
  const newWorkHistory = { id: uuid.v4(), ...req.body };
  workHistories.push(newWorkHistory);
  res.send(newWorkHistory);
});

// Update an existing work history entry
apiRouter.put('/work-history/:id', (req, res) => {
  const { id } = req.params;
  const index = workHistories.findIndex((work) => work.id === id);
  if (index !== -1) {
    workHistories[index] = { ...workHistories[index], ...req.body };
    res.send(workHistories[index]);
  } else {
    res.status(404).send({ msg: 'Work history entry not found' });
  }
});

// Delete a work history entry
apiRouter.delete('/work-history/:id', (req, res) => {
  const { id } = req.params;
  workHistories = workHistories.filter((work) => work.id !== id);
  res.status(204).end();
});


// --- SKILLS ROUTES ---

// Get all skills
apiRouter.get('/skills', (req, res) => {
  res.send(skills);
});

// Add a new skill
apiRouter.post('/skills', (req, res) => {
  const { skill } = req.body; // Destructure skill from the body
  if (!skill) {
    return res.status(400).send({ msg: 'Skill is required' });
  }
  skills.push(skill);
  res.send({ skill });
});


// Delete a skill
apiRouter.delete('/skills/:id', (req, res) => {
  const { id } = req.params;
  const index = skills.findIndex(skill => skill.id === id); // Assuming skill objects have 'id'
  if (index !== -1) {
    skills.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).send({ msg: 'Skill not found' });
  }
});


// --- LANGUAGES ROUTES ---


// Get all languages
apiRouter.get('/languages', (req, res) => {
  res.send(languages);
});

// Add a new language
apiRouter.post('/languages', (req, res) => {
  const newLanguage = req.body; // Assuming req.body contains language and proficiency
  languages.push(newLanguage);
  res.send(newLanguage);
});

// Update an existing language entry
apiRouter.put('/languages/:id', (req, res) => {
  const { id } = req.params;
  const index = languages.findIndex((lang) => lang.id === id);
  if (index !== -1) {
    languages[index] = { ...languages[index], ...req.body }; // Update language
    res.send(languages[index]);
  } else {
    res.status(404).send({ msg: 'Language entry not found' });
  }
});

// Delete a language entry
apiRouter.delete('/languages/:id', (req, res) => {
  const { id } = req.params;
  languages = languages.filter((lang) => lang.id !== id); // Remove language by ID
  res.status(204).end();
});