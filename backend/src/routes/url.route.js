import * as urlController from '../controllers/public/url.controller.js';
import { Router } from 'express';
import urlValidator from '../middlewares/urlValidation.middleware.js';

const router = Router();

router.post('/', urlValidator, urlController.showShortUrl);
router.delete('/:id', urlController.deleteShortUrl);

export default router;