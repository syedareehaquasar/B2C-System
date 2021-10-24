import { signup, signin } from "../controller/deliveryAuth.js";
import { authJwt } from '../middleware/authJwt.js';
import express from 'express';

const router = express.Router();

router.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.post(
    "/signup", [authJwt.verifyToken],
    signup
);

router.post('/signin', signin);

export default router;