const Task = require("../models/Task");
const asyncWrapper = require("../middleware/asyncWrapper");

// const getAllTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find();
//     res.status(200).json({
//       numberOfTask: tasks.length,
//       tasks
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: err
//     });
//   }
// };

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json({
    numberOfTask: tasks.length,
    tasks
  });
});

const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({ id: req.param.id });
    if (!task) {
      res.status(404).json({
        message: `No task with ID ${req.param.id}`
      });
    }
    res.status(200).json({ task });
  } catch (err) {
    res.status(500).json({
      message: err
    });
  }
};

// const createTask = async (req, res) => {
//   try {
//     const task = await Task.create(req.body);
//     res.status(200).json({ task });
//   } catch (err) {
//     res.status(500).json({
//       message: err
//     });
//   }
// };
const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(200).json({ task });
});

/**
 * PUT: item is REPLACED. WHole item is replaced meaning that empty properties without default values will be omitted
 * PATCH: item is updated. ie empty values without default values (ie not part of the edit) will still retain their old values
 */
// using PATCH
const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate({ id: req.param.id }, req.body, {
      new: true, //returns the object after its been updated
      runValidators: true //validations are enabled when updating a document
    });
    res.status(200).send({ task });
  } catch (err) {
    res.status(404).json({
      message: err
    });
  }
};
//
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ id: req.param.id });
    if (!task) {
      res.status(404).json({
        message: `No task with ID ${req.param.id}`
      });
    }
    res.status(204).send("Task deleted");
  } catch (err) {
    res.status(500).json({
      message: err
    });
  }
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
};
