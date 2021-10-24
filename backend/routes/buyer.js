import express from 'express';
import { authJwt } from '../middleware/authJwt.js';
import { CODPayment, getBuyer, getSellers, getProductsByName, getBuyerOrders, createOrder, getBuyerCart, modifyProductCart, deleteProductCart, sellerProducts, getProduct, getProducts, deleteCart, checkout, paymentVerify } from "../controller/buyer.js"

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
    getBuyer
);

router.get(
    "/sellers", [authJwt.verifyToken],
    getSellers
);

router.get(
    "/search/:name", [authJwt.verifyToken],
    getProductsByName
);

router.get(
    "/search", [authJwt.verifyToken],
    getProductsByName
);


router.get(
    "/products/idSearch/:id", [authJwt.verifyToken],
    getProduct
);

router.get(
    "/seller/products/:id", [authJwt.verifyToken],
    sellerProducts
);

router.get(
    "/order", [authJwt.verifyToken],
    getBuyerOrders
);

// router.post(
//     "/order/:id", [authJwt.verifyToken],
//     createOrder
// );

router.get(
    "/cart", [authJwt.verifyToken],
    getBuyerCart
);

router.post(
    "/cart/add", [authJwt.verifyToken],
    modifyProductCart
);

router.delete(
    "/cart/remove/:productId", [authJwt.verifyToken],
    deleteProductCart
);

router.delete(
    "/cart/remove", [authJwt.verifyToken],
    deleteCart
);

router.get(
    "/products", [authJwt.verifyToken],
    getProducts
);

router.post(
    "/checkout", [authJwt.verifyToken],
    checkout
);

router.post(
    "/payment/verify", [authJwt.verifyToken],
    paymentVerify
);

router.get(
    "/COD", [authJwt.verifyToken],
    CODPayment
);

export default router;