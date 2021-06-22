const express = require('express');
const tutorials = require('./../controllers/tutorialController');

const router = express.Router();

router.get("/published", tutorials.getAllPublished);

router
  .route('/')
  .get(tutorials.getTutorialsByName)
  .post(tutorials.createTutorial)
  .delete(tutorials.deleteAll);

router
  .route('/:id')
  .get(tutorials.getTutorial)
  .patch(tutorials.updateTutorial)
  .delete(tutorials.deleteTutorial);



module.exports = router;