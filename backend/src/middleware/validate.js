import { AppError } from './errorHandler.js';

const validate = (schema, source = 'body') => {
  return (req, res, next) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      const messages = result.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join('. ');
      return next(new AppError(messages, 400));
    }

    req[source] = result.data;
    next();
  };
};

export default validate;
