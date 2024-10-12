import 'dotenv/config';
import * as urlModel from '../../models/url.model.js';
import errors from '../../middlewares/error.middleware.js';
import { nanoid } from 'nanoid';

const BASE_URL = process.env.BASE_URL || 'http://localhost:4000';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

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
    const result = await urlModel.getLongUrlByShortUrl(shortUrl);
    if (!result) {
      return res.redirect(`${FRONTEND_URL}/error`);
    };
    
    const { longUrl, id } = result; 
    
    if (!longUrl || !id) {
      const errorMessage = !longUrl 
        ? 'Long URL not found in the database.' 
        : 'Id not found in the database.';
      return res.redirect(`${FRONTEND_URL}/error?status=404&error=${encodeURIComponent('Not found.')}&message=${encodeURIComponent(errorMessage)}`);
    };

    await urlModel.incrementCounter(id);
    res.redirect(longUrl);

  } catch (error) {
    const message = encodeURIComponent(error.dbMessage || 'Error redirecting to the requested URL. Please try again later.');
    res.redirect(`${FRONTEND_URL}/error?status=500&error=${encodeURIComponent('Internal server error.')}&message=${message}`);
  };
};

export const deleteShortUrl = async (req, res) => {
  const { id } = req.params;

  try {
    await urlModel.deleteUrl(id);
    res.status(204).send();
  } catch (error) {
    let message = error.dbMessage || 'Error deleting the URL. Please try again later.';
    errors.e500(req, res, { message });
  };
};