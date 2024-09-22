import validateUrl from '../utils/urlValidator.js';
import errors from './error.middleware.js';

const urlValidator = (req, res, next) => {
  const { longUrl } = req.body;

  if(validateUrl(longUrl)) {
    req.longUrl = longUrl;
  } else {
    let error = { message: 'Invalid URL format.' };
    return errors.e400(req, res, error);
  };

  next();
};

export default urlValidator;