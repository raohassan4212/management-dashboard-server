const yup = require("yup");

const ticketSchema = yup.object().shape({
  title: yup.string().required("Title is required").min(1).max(500),

  description: yup
    .string()
    .required("Description is required")
    .min(1)
    .max(1000),

  approved: yup.boolean().required("Approval"),

  due_date: yup.date().required("Due_date is required"),

  last_updated: yup
    .string()
    .required()
    .matches(/^\d{1,2}\/\d{1,2}\/\d{2,4}$/),
});

module.exports = { ticketSchema };
