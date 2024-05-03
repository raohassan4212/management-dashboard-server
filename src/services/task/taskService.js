const Task = require("../../models/Tasks/task");

const createTask = async (taskData) => {
  try {
    if (!taskData) {
      return {
        code: 301,
        success: false,
        message: "Task data is missing",
        data: null,
      };
    }

    // Create a new task in the database
    const newTask = await Task.create(taskData);

    if (newTask) {
      return {
        code: 301,
        success: true,
        message: "Task created successfully",
        data: newTask,
      };
    } else {
      return {
        code: 301,
        success: false,
        message: "Failed to create task",
        data: null,
      };
    }
  } catch (error) {
    console.error("Error creating task:", error);
    return {
      code: 500,
      success: false,
      message: "Internal server error",
      data: null,
    };
  }
};

const completeTask = async (taskId) => {
  try {
    // Find task by ID
    const taskToComplete = await Task.findOne({ where: { id: taskId } });

    if (!taskToComplete) {
      return {
        code: 404,
        success: false,
        message: "Task not found",
        data: null,
      };
    }

    // Update task status to Completed
    taskToComplete.status = "Completed";
    await taskToComplete.save();

    return {
      code: 200,
      success: true,
      message: "Task marked as completed",
      data: taskToComplete,
    };
  } catch (error) {
    console.error("Error completing task:", error);
    return {
      code: 500,
      success: false,
      message: "Internal server error",
      data: null,
    };
  }
};

const deleteTask = async (taskId) => {
  try {
    // Find task by ID
    const taskToDelete = await Task.findOne({ where: { id: taskId } });

    if (!taskToDelete) {
      return {
        code: 404,
        success: false,
        message: "Task not found",
        data: null,
      };
    }

    // Delete task from the database
    await taskToDelete.destroy();

    return {
      code: 200,
      success: true,
      message: "Task deleted successfully",
      data: taskToDelete,
    };
  } catch (error) {
    console.error("Error deleting task:", error);
    return {
      code: 500,
      success: false,
      message: "Internal server error",
      data: null,
    };
  }
};

const getTaskById = async (taskId) => {
  try {
    //Find task by Id
    const task = await Task.findOne({ where: { id: taskId } });

    if (!task) {
      return {
        code: 404,
        success: false,
        message: "Task not found",
        data: null,
      };
    }

    return {
      code: 200,
      success: true,
      message: "Task found",
      data: task,
    };
  } catch (error) {
    console.error("Error fetching task:", error);
    return {
      code: 500,
      success: false,
      message: "Internal server error",
      data: null,
    };
  }
};

const getAllTasks = async () => {
  try {
    // Find all tasks
    const tasks = await Task.findAll();

    return {
      code: 200,
      success: true,
      message: "Tasks found",
      data: tasks,
    };
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return {
      code: 500,
      success: false,
      message: "Internal server error",
      data: null,
    };
  }
};

module.exports = {
  createTask,
  completeTask,
  deleteTask,
  getTaskById,
  getAllTasks,
};
