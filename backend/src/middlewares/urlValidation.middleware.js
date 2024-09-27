import validateUrl from '../utils/urlValidator.js';
import errors from './error.middleware.js';

const urlValidator = (req, res, next) => {
  const { longUrl } = req.body;

  if(validateUrl(longUrl)) {
    req.longUrl = longUrl;
  } else {
    return errors.e400(req, res, { message: 'Invalid URL format.' });
  };

  next();
};

export default urlValidator;