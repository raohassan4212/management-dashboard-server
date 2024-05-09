const { reach } = require("yup");
const Task = require("../../models/Tasks/task");

const createTask = async (reqData) => {
const newTask = await Task.create({
  title: reqData.title,
  description: reqData.description,
  due_date: reqData.due_date,
  last_updated: reqData.last_updated,
  status: reqData.status,
});

return newTask;
};


const updateTask = async (reqData, res) => {
if(reqData){
  const updatedTask = await Task.upsert({...reqData});
  if(updatedTask){
    return{
      code: 301,
      success: true,
      message: "Task updated",
      data: updatedTask,
    };
  }
  if(!updatedTask){
    return{
      code:301,
      success:false,
      message: "Task not updated",
        data: updatedTask,
    };
  }
}
if(!reqData){
  return{
    code: 301,
      success: false,
      message: `${parameter} missing value`,
      data: null,
  };
}
};

const deleteTask = async (reqData, res) => {
  let parameter = "id";
  if(reqData){
    const deletedTask = await Task.destroy({where:{id: reqData}});
    if(deletedTask){
      return{
        code: 200,
        success: true,
        message: "Task deleted",
        data: deletedTask,
      };
    }
    if(!deletedTask){
      return{
        code: 301,
        success: false,
        message: "Task not deleted",
        data: null,
      };
    }
  } 
  if(!reqData){
    return{
      code: 301,
      success: false,
      message: `${parameter} missing value`,
      data: null,
    };
  }
};

const getTask = async (reqData, res) => {
if (reqData){
  const taskData = await Task.findOne({where:{id: reqData,},});

  if(taskData){
    return {
      code: 200,
      success: true,
      message: "Task found",
      data: taskData,
    };
  }
  if(!taskData){
    return {
      code: 301,
      success: false,
      message: "Task not found",
      data: null,
    };
  }
}

if(!reqData){
  const taskData = await Task.findAll();
  if(taskData){
    return{
      code: 200,
      success: true,
      message: "All Tasks Found",
      data: taskData,
    };
  }
  if(!taskData){
    return {
      code: 301,
      success: false,
      message: "Task not found",
      data: null,
    };
  }
}
};

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  getTask,
};