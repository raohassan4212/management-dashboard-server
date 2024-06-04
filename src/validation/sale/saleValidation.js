const yup = require("yup");

const salesSchema = yup.object().shape({
  user_id: yup.string().required("User ID is required"),
  service_id: yup.string().required("Service ID is required"),
  lead_id: yup.string().required("Lead ID is required"),
  type: yup.string().required("Type is required"),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .required("Amount is required"),
  day: yup.string().required("Day is required"),
  month: yup.string().required("Month is required"),
  date: yup.date().required("Date is required"),
});

module.exports = salesSchema;
