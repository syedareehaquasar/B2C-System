import express from 'express';
import { authJwt } from '../middleware/authJwt.js';
import { signup } from "../controller/deliveryAuth.js";
import { addProduct, getProducts, getDeliverers, getSeller, deleteProduct, searchProductById, searchProductByName, updateProduct, assignOrders, getOrders, getBuyer } from '../controller/seller.js';
import { getOrderById } from '../controller/common.js';

const router = express.Router();

router.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.post(
    "/products/add", [authJwt.verifyToken],
    addProduct
);

router.get(
    "/products", [authJwt.verifyToken],
    getProducts
);

router.get(
    "/deliverers", [authJwt.verifyToken],
    getDeliverers
);

router.post(
    "/deliverers/add", [authJwt.verifyToken],
    signup
);

router.get(
    "/profile", [authJwt.verifyToken],
    getSeller
);

router.delete(
    "/products/delete/:id", [authJwt.verifyToken],
    deleteProduct
);

router.patch(
    "/products/update/:id", [authJwt.verifyToken],
    updateProduct
);

router.get(
    "/products/:id", [authJwt.verifyToken],
    searchProductById
);

router.get(
    "/products/:name", [authJwt.verifyToken],
    searchProductByName
);

router.get(
    "/orders", [authJwt.verifyToken],
    getOrders
);

router.patch(
    "/assignOrder", [authJwt.verifyToken],
    assignOrders
);

router.get(
    "/buyer/:id", [authJwt.verifyToken],
    getBuyer
);

router.get(
    "/order/:id", [authJwt.verifyToken],
    getOrderById
);


export default router;