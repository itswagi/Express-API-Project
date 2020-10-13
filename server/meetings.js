const meetingsRouter = require('express').Router();

module.exports = meetingsRouter;

const {
  addToDatabase,
  getAllFromDatabase,
  createMeeting,
  deleteAllFromDatabase
} = require('./db');

//get an array of all meetings
meetingsRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('meetings'));
})

//create a new meeting and save it to the database
meetingsRouter.post('/', (req, res, next) => {
  const meetingAdded = addToDatabase('meetings', createMeeting());
  res.status(201).send(meetingAdded);
})

//delete all meetings from the database
meetingsRouter.delete('/', (req, res, next) => {
  deleteAllFromDatabase('meetings');
  res.status(204).send();
})
