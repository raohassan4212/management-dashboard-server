const TaskService = require('../../services/task/taskService');
const taskValidation = require ('../../validation/task/taskValidation');
const errorLogger = require("../../functions/Logger");



const createTask = async (req, res) => {
  try {
    const validatedTask = await taskValidation.validate(req.body);

    const newTask = await TaskService.createTask(validatedTask);

    return res.status(201).json({
      code: 201,
      success: true,
      message: 'Task created successfully',
      data: newTask,
    });
  } catch (error) {
    errorLogger('CREATE_TASK', 500, error, 'TASK', '1', 'Error creating task');

    return res.status(500).json({
      code: 500,
      success: false,
      message: 'Failed to create task',
      error: error.message,
    });
  }
};


const completeTask = async (req, res) => {
    try {
      const { id } = req.params;
  
      const completedTask = await TaskService.completeTask(id);
  
      if (!completedTask) {
        return res.status(404).json({
          code: 404,
          success: false,
          message: 'Task not found',
          data: null,
        });
      }
  
      return res.status(200).json({
        code: 200,
        success: true,
        message: 'Task marked as completed',
        data: completedTask,
      });
    } catch (error) {
      errorLogger('COMPLETE_TASK', 500, error, 'TASK', '1', 'Error completing task');
  
      return res.status(500).json({
        code: 500,
        success: false,
        message: 'Failed to complete task',
        error: error.message,
      });
    }
};


const deleteTask = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedTask = await TaskService.deleteTask(id);
  
      if (!deletedTask) {
        return res.status(404).json({
          code: 404,
          success: false,
          message: 'Task not found',
          data: null,
        });
      }
  
      return res.status(200).json({
        code: 200,
        success: true,
        message: 'Task deleted successfully',
        data: deletedTask,
      });
    } catch (error) {
      errorLogger('DELETE_TASK', 500, error, 'TASK', '1', 'Error deleting task');
  
      return res.status(500).json({
        code: 500,
        success: false,
        message: 'Failed to delete task',
        error: error.message,
      });
    }
};


const getTaskById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const task = await TaskService.getTaskById(id);
  
      if (!task) {
        return res.status(404).json({
          code: 404,
          success: false,
          message: 'Task not found',
          data: null,
        });
      }
  
      return res.status(200).json({
        code: 200,
        success: true,
        message: 'Task retrieved successfully',
        data: task,
      });
    } catch (error) {
      errorLogger('GET_TASK_BY_ID', 500, error, 'TASK', '1', 'Error retrieving task');
  
      return res.status(500).json({
        code: 500,
        success: false,
        message: 'Failed to retrieve task',
        error: error.message,
      });
    }
};


const getAllTasks = async (req, res) => {
  try {
    const tasks = await TaskService.getAllTasks();

    return res.status(200).json({
      code: 200,
      success: true,
      message: 'Tasks retrieved successfully',
      data: tasks,
    });
  } catch (error) {
    errorLogger('GET_ALL_TASKS', 500, error, 'TASK', '1', 'Error retrieving tasks');

    return res.status(500).json({
      code: 500,
      success: false,
      message: 'Failed to retrieve tasks',
      error: error.message,
    });
  }
};











module.exports = { createTask, getAllTasks, getTaskById, completeTask, deleteTask };
