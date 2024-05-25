const yup = require("yup");

const ticketSchema = yup.object().shape({
  title: yup.string().required("Title is required").min(1).max(500),
  description: yup
    .string()
    .required("Description is required")
    .min(1)
    .max(1000),
  serial: yup.string(),
  approved: yup.boolean().required("Approval"),
  approved_by: yup.string(),
  closed: yup.boolean(),
  created_by: yup.string(),
});

module.exports = { ticketSchema };
