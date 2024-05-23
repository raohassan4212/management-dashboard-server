const yup = require("yup");

const createLeadSchema = yup.object().shape({
  id: yup.string(),
  serial: yup.string(),
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  query: yup.string().required("Query is required"),
  email: yup.string().required("Email is required"),
  phone: yup.string().required("Phone is required"),
  post: yup.string().required("Post is required"),
  status: yup.string().required("Status is required"),
  city: yup.string().required("City is required"),
  country: yup.string().required("Country is required"),
  source: yup.string().required("Source is required"),
  source_link: yup.string().required("Source_lin is required"),
  type: yup.string().required("Type is required"),
  comments: yup.string().required("Comments is required"),
  day: yup.string().required("Day is required"),
  month: yup.string().required("Month is required"),
  date: yup.date().required("Date is required"),
  unit_id: yup.string(),
  user_id: yup.string(),
});

module.exports = createLeadSchema;
