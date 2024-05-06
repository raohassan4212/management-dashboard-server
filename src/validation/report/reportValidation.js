const yup = require("yup");

const reportSchema = yup.object().shape({
  
    day: yup
  .string()
  .required("Day is required"),
  
  month: yup
  .string()
  .required("Month is required"),
  
  year: yup
  .string()
  .required("Year is required"),
  
  period_start: yup
  .date()
  .required("Period start date is required"),
  
  period_end: yup
  .date()
  .required("Period end date is required"),
  
  total_sales: yup
  .number()
  .required("Total sales is required")
  .positive("Total sales must be a positive number"),
  
  total_profit: yup
  .number()
  .required("Total profit is required")
  .positive("Total profit must be a positive number"),
  
  total_expenses: yup
  .number()
  .required("Total expenses is required")
  .positive("Total expenses must be a positive number"),
  
  is_archived: yup
  .boolean()
  .required("Archive status is required"),
});

module.exports = reportSchema;
