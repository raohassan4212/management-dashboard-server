const yup = require("yup");

const profileSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email address.")
    .required("Email is required."),
  phone: yup
    .string()
    .min(11, "Number must be at least 8 characters long.")
    .max(11, "Number must be at least 8 characters long.")
    .required("Number is required."),
  address: yup.string(),
  age: yup.number().min(10).max(30, "Age must be valid."),
  designation: yup.string().required("Designation is required."),
  joined: yup.date().required("Joined is required."),
  disjoined: yup.date(),
  warning: yup.boolean().required("Warning is required."),
  authorized: yup.boolean().required("Authorized is required."),
});

module.exports = profileSchema;
