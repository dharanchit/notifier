import express from 'express';
import publishController from '../controller/publisherController';

const router = express.Router();

// For authentication, middleware can be introduced
router.post("/", publishController);

export default router;