import express from 'express';
import { authJwt } from '../middleware/authJwt.js';
import { getProfile, getAssignedOrders, getBuyer, updateStatus } from '../controller/delivery.js';
import { getOrderById } from '../controller/common.js';

const router = express.Router();

router.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.get(
    "/profile", [authJwt.verifyToken],
    getProfile
);

router.get(
    "/orders", [authJwt.verifyToken],
    getAssignedOrders
);

router.get(
    "/buyer/:id", [authJwt.verifyToken],
    getBuyer
);

router.patch(
    "/orderStatus", [authJwt.verifyToken],
    updateStatus
);

router.get(
    "/order/:id", [authJwt.verifyToken],
    getOrderById
);

export default router;