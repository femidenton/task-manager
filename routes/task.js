const express = require("express");
const {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} = require("../controllers/taskController");
const router = express.Router();

//Routes
router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

/**
 * PUT: item is REPLACED. WHole item is replaced meaning that empty properties without default values will be omitted
 * PATCH: item is updated. ie empty values without default values (ie not part of the edit) will still retain their old values
 */
module.exports = router;
