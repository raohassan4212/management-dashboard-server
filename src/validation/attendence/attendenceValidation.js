const yup = require("yup");

const createAttendanceSchema = yup.object().shape({
  user_id: yup.string().required("user ID is required"),

  date: yup.date().required("Date is required"),

  clock_in: yup.string().required("Clock-In is required"),

  clock_out: yup.string().required("Clock-In is required"),

  lng: yup.number().required(),

  lat: yup.number().required(),
});

module.exports = createAttendanceSchema;
