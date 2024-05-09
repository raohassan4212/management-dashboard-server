const Project = require("../../models/Project/project");


const createProject = async (reqData) => {
  
    const newProject = await Project.create({
      title: reqData.title,
      description: reqData.description,
      due_date: reqData.due_date,
      pdf_link: reqData.pdf_link,
      type: reqData.type,
      last_updated: reqData.last_updated,
      status: reqData.status,
});
    
    
    return newProject;
 
};

const getProject = async (reqData, res) => {
  
   if (reqData){
    const projectData = await Project.findOne({where: {
        id: reqData,
      },
    });

    if (projectData) {
      return {
        code: 200,
        success: true,
        message: "project found",
        data: projectData,
      };
    }

    if (!projectData){
      return{
        code: 301,
        success: false,
        message: "project not found",
        data: null,
      };
    }

  }

  if (!reqData){
    const projectData = await Project.findAll();
    if(projectData) {
      return{
        code: 200,
        success: true,
        message: "all projects found",
        data: projectData,
      };
    }
    if(!projectData){
      return{
        code: 301,
        success: false,
        message: "project not found",
        data: null,
      };
    }
  }
 
};


const updateProject = async (reqData, res) => {
  let parameter = "data";

  if(reqData){
    const updatedData = await Project.upsert({...reqData});
    if (updatedData){
      return{
        code: 301,
        success: true,
        message: "project updated",
        data: updatedData,
      };
    }
    if(!updatedData){
      return{
        code: 301,
        success: false,
        message: "project not updated",
        data: updatedData,
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


const deleteProject = async (reqData, res) => {
  let parameter = "id";
  if(reqData){
    const deletedProject = await Project.destroy({ where: { id: reqData } });
  if (deletedProject){
    return{
      code: 200,
      success: true,
      message: "project deleted",
      data: deletedProject,
    };
  }
  if (!deletedProject) {
    return {
      code: 301,
      success: false,
      message: "project not deleted",
      data: null,
     };
    }
  }
  if (!reqData) {
    return {
      code: 301,
      success: false,
      message: `${parameter} missing value`,
      data: null,
    };
  }
};


module.exports =  {createProject, getProject, updateProject, deleteProject};