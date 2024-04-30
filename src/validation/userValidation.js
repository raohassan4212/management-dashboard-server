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
  department: yup.string().required("Department is required."),
});

module.exports = userSchema;
