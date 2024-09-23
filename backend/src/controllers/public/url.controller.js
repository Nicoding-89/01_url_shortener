import 'dotenv/config';
import * as urlModel from '../../models/url.model.js';
import errors from '../../middlewares/error.middleware.js';
import { nanoid } from 'nanoid';

const BASE_URL = process.env.BASE_URL || 'http://localhost:4000';

export const showShortUrl = async (req, res) => {
  const shortUrl = nanoid(8);
  const { longUrl } = req;

  try {
    const newShortUrl = await urlModel.createShortUrl(longUrl, shortUrl);

    if (!newShortUrl) {
      return errors.e500(req, res, { message: 'Error retrieving the new URL.' });
    };

    res.json({...newShortUrl, short_url: `${BASE_URL}/${newShortUrl.short_url}`});
  } catch (error) {
    let message = error.dbMessage || 'An unexpected error occurred while creating the short URL.';
    errors.e500(req, res, { message });    
  };
};

export const redirectUrl = async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const { longUrl, id } = await urlModel.getLongUrlByShortUrl(shortUrl);

    if (!longUrl) {
      return errors.e404(req, res, { message: 'Long URL not found in the database.' });
    } else if (!id) {
      return errors.e404(req, res, { message: 'Id not found in the database.' });
    } else {
      await urlModel.incrementCounter(id);
      res.redirect(longUrl);
    };

  } catch (error) {
    let message = error.dbMessage || 'Error redirecting to the requested URL. Please try again later.';
    errors.e500(req, res, { message });
  };
};