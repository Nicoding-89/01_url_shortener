import * as urlController from '../controllers/public/url.controller.js';
import { Router } from 'express';

const router = Router();

router.get('/:shortUrl', urlController.redirectUrl);

export default router;