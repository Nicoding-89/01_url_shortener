import * as urlController from '../controllers/public/url.controller.js';
import { Router } from 'express';
import urlValidator from '../middlewares/urlValidation.middleware.js';

const router = Router();

router.post('/', urlValidator, urlController.showShortUrl);

export default router;