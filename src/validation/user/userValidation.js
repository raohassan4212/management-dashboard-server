const yup = require("yup");

const userSchema = yup.object().shape({
  name: yup.string().required("Name is required."),
  email: yup
    .string()
    .email("Must be a valid email address.")
    .required("Email is required."),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .required("Password is required."),
  role: yup.string().required("Role is required."),
  has_salary: yup.boolean().required("Salary is required."),
  has_commission: yup.boolean().required("Commission is required."),
  phone: yup
    .string()
    .min(11, "Number must be at least 8 characters long.")
    .max(11, "Number must be at least 8 characters long.")
    .required("Number is required."),
  address: yup.string(),
  designation: yup.string().required("Designation is required."),
  joined: yup.date().required("Joined is required."),
  disjoined: yup.date(),
  warning: yup.boolean().required("Warning is required."),
  authorized: yup.boolean().required("Authorized is required."),
});

module.exports = userSchema;
