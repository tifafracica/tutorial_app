const Tutorial = require('../models/tutorialModel');

exports.createTutorial = async (req, res) => {
  try {
    const document = await Tutorial.create(req.body);
    res.status(201).json({
      status: 'sucess',
      data: {
        document
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error || "Some error occurred while creating the Tutorial."
    })
  }
};

exports.getTutorialsByName = async (req, res) => {
  const title = req.query.title;
  //$regex Provides regular expression capabilities for pattern matching strings in queries.
  // $options are available for use with regular expression, i => Case insensitivity to match upper and lower cases.
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  try {
    const tutorials = await Tutorial.find(condition);
    res.status(200).json({
      status: 'sucess',
      data: {
        tutorials
      }
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error || "Some error occurred while retrieving tutorials."
    });
  }
};

exports.getAllPublished = async (req, res) => {
  try {
    const tutorialPublished = await Tutorial.find({ published: true })
    res.status(200).json({
      status: 'success',
      data: {
        tutorials: tutorialPublished
      }
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
    });
  }
};

exports.getTutorial = async (req, res) => {
  try {
    const tutorial = await Tutorial.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tutorial
      }
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
    });
  }
};

exports.updateTutorial = async (req, res) => {
  try {
    const tutorial = await Tutorial.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: {
        tutorial
      }
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
    });
  }
};

exports.deleteTutorial = async (req, res) => {
  try {
    await Tutorial.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 'success',
      message: 'Tutorial was deleted successfully!',
      data: null
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
    });
  }
}

exports.deleteAll = async (req, res) => {
  try {
    await Tutorial.deleteMany({});

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
    });
  }
}