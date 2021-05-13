const { check, validationResult} = require('express-validator');

const validateTodo = [
  check('title').exists()
    .withMessage('The title can not be empty')
    .bail().isString()
    .withMessage('The title contains invalid characters'),
  check('description').exists()
    .withMessage('There are invalid characters in description')
    .bail().isString()
    .withMessage('There are invalid characters in description name'),
  check('date', 'Invalid date')
    .optional()
    .custom((datetime) => (String(new Date(datetime)) !== 'Invalid Date')),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        errors: errors.array(),
      });
    }
    return next();
  },
];

module.exports = {
  validateTodo,
};
