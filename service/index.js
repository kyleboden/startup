const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');

const authCookieName = 'token';

// The service port may be set on the command line
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the applications static content
app.use(express.static('public'));

// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.email, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// secureApiRouter verifies credentials for endpoints
const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});



// GetScores
secureApiRouter.get('/scores', async (req, res) => {
  const scores = await DB.getHighScores();
  res.send(scores);
});

// SubmitScore
secureApiRouter.post('/score', async (req, res) => {
  const score = { ...req.body, ip: req.ip };
  await DB.addScore(score);
  const scores = await DB.getHighScores();
  res.send(scores);
});

// Get all education entries
secureApiRouter.get('/education', async (req, res) => {
  const educations = await DB.getEducations();
  res.send(educations);
});

// Add a new education entry
secureApiRouter.post('/education', async (req, res) => {
  const education = { ...req.body, ip: req.ip };
  await DB.addEducation(education);
  const educations = await DB.getEducations();
  res.send(educations);
});


// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
// app.use((_req, res) => {
//   res.sendFile('index.html', { root: 'public' });
// });
app.use((_req, res) => {
  res.sendFile('C:/Users/boden/CS260/startup/index.html');
});
// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});





// let users = {};
// let educations = [];
// let workHistories = [];
// let skills = [];
// let languages = [];

// // --- EDUCATION --- 

// // Get all education entries
// apiRouter.get('/education', (req, res) => {
//   res.send(educations);
// });

// // Add a new education entry
// apiRouter.post('/education', (req, res) => {
//   const newEducation = { id: uuid.v4(), ...req.body };
//   educations.push(newEducation);
//   res.send(newEducation);
// });

// // Update an existing education entry
// apiRouter.put('/education/:id', (req, res) => {
//   const { id } = req.params;
//   const index = educations.findIndex((edu) => edu.id === id);
//   if (index !== -1) {
//     educations[index] = { ...educations[index], ...req.body };
//     res.send(educations[index]);
//   } else {
//     res.status(404).send({ msg: 'Education entry not found' });
//   }
// });

// // Delete an education entry
// apiRouter.delete('/education/:id', (req, res) => {
//   const { id } = req.params;
//   educations = educations.filter((edu) => edu.id !== id);
//   res.status(204).end();
// });

// // --- WORK --- 

// // Get all work history entries
// apiRouter.get('/work-history', (req, res) => {
//   res.send(workHistories);
// });

// // Add a new work history entry
// apiRouter.post('/work-history', (req, res) => {
//   const newWorkHistory = { id: uuid.v4(), ...req.body };
//   workHistories.push(newWorkHistory);
//   res.send(newWorkHistory);
// });

// // Update an existing work history entry
// apiRouter.put('/work-history/:id', (req, res) => {
//   const { id } = req.params;
//   const index = workHistories.findIndex((work) => work.id === id);
//   if (index !== -1) {
//     workHistories[index] = { ...workHistories[index], ...req.body };
//     res.send(workHistories[index]);
//   } else {
//     res.status(404).send({ msg: 'Work history entry not found' });
//   }
// });

// // Delete a work history entry
// apiRouter.delete('/work-history/:id', (req, res) => {
//   const { id } = req.params;
//   workHistories = workHistories.filter((work) => work.id !== id);
//   res.status(204).end();
// });


// // --- SKILLS ROUTES ---

// // Get all skills
// apiRouter.get('/skills', (req, res) => {
//   res.send(skills);
// });

// // Add a new skill
// apiRouter.post('/skills', (req, res) => {
//   const { skill } = req.body; // Destructure skill from the body
//   if (!skill) {
//     return res.status(400).send({ msg: 'Skill is required' });
//   }
//   skills.push(skill);
//   res.send({ skill });
// });


// // Delete a skill
// apiRouter.delete('/skills/:id', (req, res) => {
//   const { id } = req.params;
//   const index = skills.findIndex(skill => skill.id === id); // Assuming skill objects have 'id'
//   if (index !== -1) {
//     skills.splice(index, 1);
//     res.status(204).end();
//   } else {
//     res.status(404).send({ msg: 'Skill not found' });
//   }
// });


// // --- LANGUAGES ROUTES ---


// // Get all languages
// apiRouter.get('/languages', (req, res) => {
//   res.send(languages);
// });

// // Add a new language
// apiRouter.post('/languages', (req, res) => {
//   const newLanguage = req.body; // Assuming req.body contains language and proficiency
//   languages.push(newLanguage);
//   res.send(newLanguage);
// });

// // Update an existing language entry
// apiRouter.put('/languages/:id', (req, res) => {
//   const { id } = req.params;
//   const index = languages.findIndex((lang) => lang.id === id);
//   if (index !== -1) {
//     languages[index] = { ...languages[index], ...req.body }; // Update language
//     res.send(languages[index]);
//   } else {
//     res.status(404).send({ msg: 'Language entry not found' });
//   }
// });

// // Delete a language entry
// apiRouter.delete('/languages/:id', (req, res) => {
//   const { id } = req.params;
//   languages = languages.filter((lang) => lang.id !== id); // Remove language by ID
//   res.status(204).end();
// });