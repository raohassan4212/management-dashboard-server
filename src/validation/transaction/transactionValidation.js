const yup = require("yup");

const transactionSchema = yup.object().shape({
  user_id: yup.string().required("User ID is required"),
  sale_id: yup.string().required("Sale ID is required"),
  payment_method: yup.string().required("Type is required"),
  time: yup.string().required("Time is required"),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .required("Amount is required"),
  outstanding: yup
    .number()
    .typeError("Outstanding must be a number")
    .required("Outstanding is required"),
  day: yup.string().required("Day is required"),
  month: yup.string().required("Month is required"),
  date: yup.date().required("Date is required"),
});

module.exports = transactionSchema;
