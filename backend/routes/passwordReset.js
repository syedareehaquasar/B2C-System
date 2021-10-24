import { reset } from "../controller/passwordReset.js";
import { reset as dreset } from "../controller/dpasswordReset.js";
import { reset as sreset } from "../controller/spasswordReset.js";
import express from 'express';

const router = express.Router();

router.patch('/', reset);
router.patch('/delivery', dreset);
router.patch('/seller', sreset);

export default router;