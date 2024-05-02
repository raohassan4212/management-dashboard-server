const yup = require('yup');

const createAttendanceSchema = yup.object().shape({
  id: yup
  .number()
  .positive()
  .integer()
  .required("ID is required"),
  
  date: yup
  .date()
  .required("Date is required"),
  
  clock_in: yup
  .date()
  .required("Clock-In is required"),
  
  clock_out: yup
  .date()
  .required(),
  
  lng: yup
  .number()
  .required(),
  
  lat: yup
  .number()
  .required(),
});

module.exports = { createAttendanceSchema };
