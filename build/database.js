const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);

const db = client.db('startup');

const userCollection = db.collection('user');
const scoreCollection = db.collection('score');
const contactCollection = db.collection('contact');
const educationCollection = db.collection('education');
const workHistoryCollection = db.collection('workHistory');
const skillCollection = db.collection('skill');
const languageCollection = db.collection('language');
const awardCollection = db.collection('award');
const websiteCollection = db.collection('website');


// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

async function addScore(score) {
  return scoreCollection.insertOne(score);
}

function getHighScores() {
  const query = { score: { $gt: 0, $lt: 900 } };
  const options = {
    sort: { score: -1 },
    limit: 10,
  };
  const cursor = scoreCollection.find(query, options);
  return cursor.toArray();
}


async function addEducation(education) {
  return educationCollection.insertOne(education);
}
async function getEducations(userId) {
  const query = { ownerId: userId }; // Correct query syntax
  const cursor = educationCollection.find(query);
  return cursor.toArray();
}

async function addWorkHistory(workHistory) {
  return workHistoryCollection.insertOne(workHistory);
}
async function getWorkHistories(userId) {
  const query = { ownerId: userId }; // Correct query syntax
  const cursor = workHistoryCollection.find(query);
  return cursor.toArray();
}

async function addSkill(skill) {
  return skillCollection.insertOne(skill);

}
async function getSkills(userId) {
  const query = { ownerId: userId }; // Make sure this is correct
  console.log('Fetching skills for userId:', userId);  // Log userId
  const cursor = skillCollection.find(query);

  const skills = await cursor.toArray();
  console.log('Fetched skills:', skills);  // Log the returned skills
  return skills;
}

async function addLanguage(language) {
  return languageCollection.insertOne(language);
}
async function getLanguages(userId) {
  const query = { ownerId: userId }; // Correct query syntax
  const cursor = languageCollection.find(query);
  return cursor.toArray();
}

async function addAward(language) {
  return awardCollection.insertOne(language);
}
async function getAwards(userId) {
  const query = { ownerId: userId }; // Correct query syntax
  const cursor = awardCollection.find(query);
  return cursor.toArray();
}

async function addWebsite(website) {
  return websiteCollection.insertOne(website);
}
async function getWebsites(userId) {
  const query = { ownerId: userId }; // Correct query syntax
  const cursor = websiteCollection.find(query);
  return cursor.toArray();
}

async function getContactInfo(userId) {
  const query = { userId };
  return contactCollection.findOne(query);
}

async function upsertContactInfo(contactInfo) {
  const query = { userId: contactInfo.userId };
  const update = { $set: contactInfo };
  const options = { upsert: true }; // If not found, create a new entry
  return contactCollection.updateOne(query, update, options);
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  addScore,
  getHighScores,
  addEducation,
  getEducations,
  addWorkHistory,
  getWorkHistories,
  addSkill,
  getSkills,
  addLanguage,
  getLanguages,
  addAward,
  getAwards,
  addWebsite,
  getWebsites,
  getContactInfo,
  upsertContactInfo
  };
