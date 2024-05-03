const yup = require('yup');

const salesSchema = yup.object().shape({
  user_id: yup
    .string()
    .required('User ID is required'),
  amount: yup
    .number()
    .typeError('Amount must be a number')
    .required('Amount is required'),
  description: yup
    .string()
    .required('Description is required'),
  date: yup
    .date()
    .required('Date is required'),
  sale_type: yup
  .string()
    .required('Sale type is required'),
  platform: yup
    .string()
    .required('Platform is required'),
  platform_id: yup
    .string()
    .required('Platform ID is required'),
  client_link: yup
    .string()
    .url('Client link must be a valid URL')
    .required('Client link is required'),
  client_username: yup
    .string()
    .required('Client username is required'),
  total: yup
    .number()
    .typeError('Total must be a number')
    .required('Total is required'),
});

module.exports = salesSchema;
