const ReportService = require('../../services/report/reportService');
const reportValidation = require('../../validation/report/reportValidation');
const errorLogger = require('../../functions/Logger');

const createReport = async (req, res) => {
try{
  const validatedReport = await reportValidation.validate(req.body);
  const newReport = await ReportService.createReport(validatedReport);

  return res.status(201).json({
    code: 201,
    success: true,
    message: "Report created successfully ",
    data: newReport,
  });
}catch (error){
  let statuscode = 500;
  let errorMessage = "Error creating Report";

  errorLogger("POST", statuscode, error, "PROJECT", "1", errorMessage);
  return res.status(statuscode).josn({
    code: statuscode,
    success: false,
    message: errorMessage,
  });
}
};

const getReports = async (req, res) => {
try{
  const {id} = req.query;
  if(id){
    const response = await ReportService.getReports(id);
    return res.status(response.code).json({
      code: response.code,
      success: response.success,
      message: response.message,
      data: response.data,
    });
  }
  if(!id){
    const response = await ReportService.getReports(null);
    return res.status(response.code).json({
      code: response.code,
      success: response.success,
      message: response.message,
      data: response.data,
    });
  }
} catch(error){
  let statuscode = 500;
    let errorMessage = "Error founding Report";

    errorLogger("POST", statuscode,error,"REPORT", "1", errorMessage);
    return res.status(statuscode).josn({
      code: statuscode,
      success: false,
      message: errorMessage,
    });
}
};

const updateReport = async (req, res) => {
  try{
    let {id} = req.body;
     if(id == undefined || id ==null){
      return res.status(422).json({
        code: 422,
        success: false,
        message: "Required parameter is missing: id",
        error: "Mission Parameter",
      });
     }

     const response = await ReportService.updateReport(req.body);
     if(!response){
      return res.status(201).json({
        code: 404,
        success: false,
        message: "Report not updated",
        data: null,
      });
     }
     return res.status(201).josn({
      code: 201,
      success: true,
      message: "Report updated successfully",
      data: response,
     });
  } catch (error){
    let statusCode = 500;
  let errorMessage = "Error updating Report";

  errorLogger("UPDATE", statusCode, error, "REPORT", "1", errorMessage);
  return res.status(statusCode).json({
    code: statusCode,
    success: false,
    message: errorMessage,
  });
  }
};

const deleteReport = async (req, res) => {
  try{
    const {id} = req.params;
    if(!id){
      return res.status(422).josn({
        code: 422,
        success: false,
        message: "Missing required parameter: id",
      });
    }

    const deletedReport = await ReportService.deleteReport(id);
    if(!deletedReport.success){
      return res.status(200).json({
        code: 404,
        success: false,
        message: "Report not deleted",
      });
    }
    if(deletedReport.success){
      return res.status(200).josn({
        code: 200,
        success: true,
        message: "Report deleted successfully",
        data: deletedReport,
      });
    }
  } catch (error){
    let statusCode = 500;
    let errorMessage = "Error deleting project";

    errorLogger("DELETE", statusCode, error, "REPORT", "1", errorMessage);
    return res.status(statusCode).json({
      code: statusCode,
      success: false,
      message: errorMessage,
    });

  }
};


module.exports = {
  createReport,
  getReports,
  updateReport,
  deleteReport,
};
