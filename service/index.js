const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');
const { peerProxy } = require('./peerProxy.js');


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
  try {
    const authToken = req.cookies[authCookieName];
    const user = await DB.getUserByToken(authToken);

    const userId = user._id; // Ensure it's a string
    const educations = await DB.getEducations(userId);
    res.send(educations);
  } catch (error) {
    console.error('Error fetching education entries:', error);
    res.status(500).send({ error: 'Failed to fetch education entries' });
  }
});

// Add a new education entry
secureApiRouter.post('/education', async (req, res) => {
  try {
    // Ensure makeEducationEntry is passed the required parameters
    const education = await makeEducationEntry(req);
    await DB.addEducation(education);

    const authToken = req.cookies[authCookieName];
    const user = await DB.getUserByToken(authToken);
    const userId = user._id;

    const educations = await DB.getEducations(userId);
    res.send(educations);
  } catch (error) {
    console.error('Error adding education entry:', error.message); // Log error
    res.status(500).send({ error: error.message });
  }
});



async function makeEducationEntry(req) {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);

  if (!user) {
    throw new Error('User not authenticated');
  }

  const userId = user._id; // Ensure this is properly retrieved

  const { school, startDate, endDate, gpa, major } = req.body;

  if (!school || !startDate || !endDate || !gpa || !major) {
    throw new Error('Incomplete education entry');
  }

  return {
    ownerId: userId,
    school,
    startDate,
    endDate,
    gpa,
    major,
  };
}

// --- WORK --- 

// Get all work history entries
secureApiRouter.get('/work-history', async (req, res) => {
  try {
    const authToken = req.cookies[authCookieName];
    const user = await DB.getUserByToken(authToken);

    const userId = user._id; // Ensure it's a string
    const workHistories = await DB.getWorkHistories(userId);
    res.send(workHistories);
  } catch (error) {
    console.error('Error fetching workHistories entries:', error);
    res.status(500).send({ error: 'Failed to fetch workHistories entries' });
  }
});

// Add a new work history entry
secureApiRouter.post('/work-history', async (req, res) => {
  try {
    // Ensure makeWorkHistoriEntry is passed the required parameters
    const workHistory = await makeWorkHistoryEntry(req);
    await DB.addWorkHistory(workHistory);

    const authToken = req.cookies[authCookieName];
    const user = await DB.getUserByToken(authToken);
    const userId = user._id;

    const workHistories = await DB.getWorkHistories(userId);
    res.send(workHistories);
  } catch (error) {
    console.error('Error adding workHistories entry:', error.message); // Log error
    res.status(500).send({ error: error.message });
  }
});

async function makeWorkHistoryEntry(req) {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);

  if (!user) {
    throw new Error('User not authenticated');
  }

  const userId = user._id; // Ensure this is properly retrieved

  const { company, position, startDate, endDate, keyRoles } = req.body;

  if (!company || !position || !startDate || !endDate || !keyRoles) {
    throw new Error('Incomplete work history entry');
  }
  
  return {
    ownerId: userId,
    company,
    position,
    startDate,
    endDate,
    keyRoles
  };
  
}

// --- SKILLS ROUTES ---

// Get all skills
apiRouter.get('/skills', async (req, res) => {
  try {
    const authToken = req.cookies[authCookieName];
    const user = await DB.getUserByToken(authToken);

    if (!user) {
      return res.status(400).send({ msg: 'User not authenticated' });
    }

    const userId = user._id;
    const skills = await DB.getSkills(userId);
    res.send(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).send({ error: 'Failed to fetch skills' });
  }
});

secureApiRouter.post('/skills', async (req, res) => {
  try {
    // Ensure makeWorkHistoriEntry is passed the required parameters
    const skill = await makeSkillEntry(req);
    await DB.addSkill(skill);

    const authToken = req.cookies[authCookieName];
    const user = await DB.getUserByToken(authToken);
    const userId = user._id;

    const skills = await DB.getSkills(userId);
    res.send(skills);
  } catch (error) {
    console.error('Error adding skills entry:', error.message); // Log error
    res.status(500).send({ error: error.message });
  }
});
async function makeSkillEntry(req) {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);

  if (!user) {
    throw new Error('User not authenticated');
  }

  const userId = user._id; // Ensure this is properly retrieved

  const { skill } = req.body;

  if (!skill) {
    throw new Error('Incomplete work history entry');
  }
  
  return {
    ownerId: userId,
    skill
  };
  
}

// // --- LANGUAGES ROUTES ---

// Get all languages
apiRouter.get('/languages', async (req, res) => {
  try {
    const authToken = req.cookies[authCookieName];
    const user = await DB.getUserByToken(authToken);

    if (!user) {
      return res.status(400).send({ msg: 'User not authenticated' });
    }

    const userId = user._id;
    const languages = await DB.getLanguages(userId);
    res.send(languages);
  } catch (error) {
    console.error('Error fetching languages:', error);
    res.status(500).send({ error: 'Failed to fetch languages' });
  }
});

secureApiRouter.post('/languages', async (req, res) => {
  try {
    // Ensure language is passed the required parameters
    const language = await makeLanguageEntry(req);
    await DB.addLanguage(language);

    const authToken = req.cookies[authCookieName];
    const user = await DB.getUserByToken(authToken);
    const userId = user._id;

    const languages = await DB.getLanguages(userId);
    res.send(languages);
  } catch (error) {
    console.error('Error adding language entry:', error.message); // Log error
    res.status(500).send({ error: error.message });
  }
});

async function makeLanguageEntry(req) {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);

  if (!user) {
    throw new Error('User not authenticated');
  }

  const userId = user._id;

  const { language, proficiency } = req.body; // Get both language and proficiency

  if (!language || !proficiency) {
    throw new Error('Incomplete language entry');
  }
  
  return {
    ownerId: userId,
    language,
    proficiency
  };
}

// // --- AWARDS ROUTES ---

// Get all awards
apiRouter.get('/awards', async (req, res) => {
  try {
    const authToken = req.cookies[authCookieName];
    const user = await DB.getUserByToken(authToken);

    if (!user) {
      return res.status(400).send({ msg: 'User not authenticated' });
    }

    const userId = user._id;
    const awards = await DB.getAwards(userId);
    res.send(awards);
  } catch (error) {
    console.error('Error fetching awards:', error);
    res.status(500).send({ error: 'Failed to fetch awards' });
  }
});

secureApiRouter.post('/awards', async (req, res) => {
  try {
    // Ensure award is passed the required parameters
    const award = await makeAwardEntry(req);
    await DB.addAward(award);

    const authToken = req.cookies[authCookieName];
    const user = await DB.getUserByToken(authToken);
    const userId = user._id;

    const awards = await DB.getAwards(userId);
    res.send(awards);
  } catch (error) {
    console.error('Error adding award entry:', error.message); // Log error
    res.status(500).send({ error: error.message });
  }
});

async function makeAwardEntry(req) {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);

  if (!user) {
    throw new Error('User not authenticated');
  }

  const userId = user._id;

  const { title, date } = req.body; 

  if (!title || !date) {
    throw new Error('Incomplete award entry');
  }
  
  return {
    ownerId: userId,
    title,
    date
  };
}


// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});
// app.use((_req, res) => {
//   res.sendFile('C:/Users/boden/CS260/startup/index.html');
// });
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

peerProxy(httpService);




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