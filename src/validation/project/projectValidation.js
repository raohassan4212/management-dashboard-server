const yup = require("yup");

const projectSchema = yup.object().shape({
  title: yup
  .string()
  .required("Title is required"),

  description: yup
  .string()
  .required("Description is required"),
  
  due_date: yup
  .date()
  .required("Due date is required"),
  
  status: yup
    .string()
    .required("Status is required")
    .oneOf(["Open", "In Progress", "Completed"], "Invalid status"),
  
  pdf_link: yup
  .string()
  .required("PDF link is required"),
  
  type: yup
    .string()
    .required("Type is required")
    .oneOf(
      [
        "Development",
        "Design",
        "Marketing",
        "AI",
        "Cyber Security",
        "Branding",
        "Digital Marketing",
      ],
      "Invalid type"
    ),
  last_updated: yup.string().required("Last updated is required"),
});


module.exports = projectSchema;