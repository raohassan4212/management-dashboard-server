const yup = require('yup');


const taskSchema = yup.object().shape({
  title: yup
  .string()
  .required("Title is required")
  .min(1)
  .max(500),

  description: yup
  .string()
  .required("Description is required")
  .min(1)
  .max(1000),

  due_date: yup
  .date()
  .required("Due_date is required"),

  status: yup
  .string()
  .oneOf(['Open', 'In Progress', 'Completed'])
  .required(),

  last_updated: yup
  .string()
  .required()
  .matches(/^\d{1,2}\/\d{1,2}\/\d{2,4}$/),
});


module.exports =  taskSchema ;