const Report = require("../../models/Report/report");

const createReport = async (reqData) => {
  const newReport = await Report.create({
    day: reqData.day,
    month: reqData.month,
    year: reqData.Data.year,
    period_start: reqData.period_start,
    period_end: reqData.period_end,
    total_sales: reqData.total_sales,
    total_profit: reqData.total_profit,
    total_expenses: reqData.total_expenses,
    is_archived: reqData.is_archived,
  });
  return newReport;
};

const getReports = async (reqData, res) => {
    if (reqData){
      const ReportData = await Report.findOne({where:{id: reqData,},});

      if (ReportData){
        return{
          code:200,
          sucess:true,
          message:"Report Found",
          data: ReportData,
        };
      }
      if (!ReportData){
        return{
          code:301,
          sucess:false,
          message:"Report not Found",
          data: null,
        };
      }
    }

    if(!reqData){
      const ReportData = await Report.findAll();
      if (ReportData){
        return{
          code:200,
          success:true,
          message:"All Reports Found",
          data: ReportData
        };
      }
      if(!ReportData){
        return{
          code: 301,
          success: false,
          message: "Report not found",
          data: null,
        };
      }
    }
   
  };

const updateReport = async (reqData, res) =>{
  let parameter = "data";
  if(reqData){
    const updatedData = await Report.upsert({...reqData});
    if (updatedData) {
      return{
        code:301,
        success:true,
        message:"Report Updated",
        data: updatedData, 
      };
    }
    if(!updatedData){
      return{
        code: 301,
        success: false,
        message: "Report not updated",
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
} ;

const deleteReport = async (reqData, res) => {
 let parameter= "id";
 if(reqData){
  const deletedReport = await Report.destroy({where: { id: reqData }});
  if(deletedReport){
    return{
      code: 200,
      success: true,
      message: "Report deleted",
      data: deletedReport,
    };
  }
  if(!deletedReport){
    return{
      code: 301,
      success: false,
      message: "Report not deleted",
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

module.exports = {
  createReport,
  getReports,
  updateReport,
  deleteReport,
};
