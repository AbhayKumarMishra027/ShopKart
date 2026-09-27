import express from 'express';

import upload  from "../middlewares/upload.middleware.js"
import { testUpload } from '../controllers/cloudinary.controller.js';

const router=express.Router();

router.post('/',upload.single("image"),testUpload);

export default router;