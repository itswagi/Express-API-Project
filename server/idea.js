const ideasRouter = require('express').Router();

module.exports = ideasRouter;

const {
  addToDatabase,
  getAllFromDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require('./db');

const checkMillionDollarIdea = require('./checkMillionDollarIdea');

ideasRouter.param('ideaId', (req, res, next, id) => {
  const idea = getFromDatabaseById('ideas', id);
  if(idea){
    req.idea = idea;
    next();
  } else {
    res.status(404).send();
  }
})

//get an array of all ideas
ideasRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('ideas'));
})

//create a new idea and save it to the database
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
  const newIdea = addToDatabase('ideas', req.body);
  res.status(201).send(newIdea);
})

//get a single idea by id
ideasRouter.get('/:ideaId', (req, res, next) => {
  res.send(req.idea);
})

//update a single idea by id
ideasRouter.put('/:ideaId', (req, res, next) => {
  let updatedIdea = updateInstanceInDatabase('ideas', req.body);
  res.send(updatedIdea);
});

//delete a single idea by id
ideasRouter.delete('/:ideaId', (req, res, next) => {
  const deletedIdea = deleteFromDatabasebyId('ideas', req.params.ideaId);
  if (deletedIdea) {
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
})
