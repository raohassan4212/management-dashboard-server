const TaskService = require('../../services/task/taskService');
const taskValidation = require ('../../validation/task/taskValidation');
const errorLogger = require("../../functions/Logger");



const createTask = async (req, res) => {
try{
  const validatedTask = await taskValidation.validate(req.body);
  const newTask = await TaskService.createTask(validatedTask);

  return res.status(201).json({
    code: 201,
    success: true,
    message: "Task created successfully ",
    data: newTask,
  });
} catch(error){
  let statuscode = 500;
  let errorMessage = "Error creating Task";

  errorLogger("POST", statuscode, error, "TASK", "1", errorMessage);

  return res.status(statuscode).json({
    code: statuscode,
    success: false,
    message: errorMessage,
  });
 }
};

const updateTask = async (req, res) => {
  try{
    let {id} = req.body;

    if(id == undefined || id == null){
      return res.status(422).json({
        code: 422,
        success: false,
        message: "Required parameter is missing: id",
        error: "Mission Parameter",
      });
    }

    const response = await TaskService.updateTask(req.body);
    if(!response){
      return res.status(201).json({
        code: 404,
        success: false,
        message: "Task not updated",
        data: null,
      });
    }
    return res.status(201).json({
      code: 201,
      success: true,
      message: "Task updated successfully",
      data: response,
    });
  } catch (error){
    let statusCode = 500;
    let errorMessage = "Error updating task";

    errorLogger("UPDATE", statusCode, error, "TASK", "1", errorMessage);
    return res.status(statusCode).json({
      code: statusCode,
      success: false,
      message: errorMessage,
  });
  }
};

const deleteTask = async (req, res) => {
  try{
    const {id} = req.params;
    if(!id){
      return res.status(422).json({
        code: 422,
        success: false,
        message: "Missing required parameter: id",
      });
    }
    const deletedTask = await TaskService.deleteTask(id);
    if(!deleteTask.success){
      return res.status(200).json({
        code: 404,
        success: false,
        message: "Task not deleted",
      });
    }
    if(deletedTask.success){
      return res.status(200).json({
        code: 200,
        success: true,
        message: "Task deleted successfully",
        data: deletedTask,
      });
    }
  } catch (error){
    let statusCode = 500;
    let errorMessage = "Error deleting Task";

    errorLogger("DELETE", statusCode, error, "TASK", "1", errorMessage);
    return res.status(statusCode).json({
      code: statusCode,
      success: false,
      message: errorMessage,
    });
  }
};

const getTask = async (req, res) => {
try{
  const {id} = req.query;
  if(id){
    const response = await TaskService.getTask(id);
    return res.status(response.code).json({
      code: response.code,
      success: response.success,
      message: response.message,
      data: response.data,
    });
  }
  if(!id){
    const response = await TaskService.getTask(null);
    return res.status(response.code).json({
      code: response.code,
      success: response.success,
      message: response.message,
      data: response.data,
    });
  }
} catch (error){
  let statuscode = 500;
  let errorMessage = "Error founding Task";

  errorLogger("POST", statuscode, error, "TASK", "1", errorMessage);

  return res.status(statuscode).json({
    code: statuscode,
    success: false,
    message: errorMessage,
  });
}
};


module.exports = { createTask, getTask, updateTask, deleteTask };