import jwt from 'jsonwebtoken';

import deliverer from '../models/deliverer.js';
import seller from "../models/seller.js";

export const signup = async(req, res) => {
    const { phone, fullname } = req.body;
    const sellerId = req.user.id;
    const Seller = await seller.findOne({ _id: sellerId });
    if (!Seller) {
        res.status(401).json({ message: "Unauthorised User. Only a seller is Allowed to signup delivery person." })
    } else {
        try {
            const existingDeliverer = await deliverer.findOne({ phone: phone });
            if (existingDeliverer) {
                return res.status(400).json({ message: "Deliverer already exist." });
            }
            const result = await deliverer.create({ fullname: fullname, phone: phone, sellerId: sellerId });
            const token = jwt.sign({ fullname: result.fullname, _id: result._id, phone: result.phone, sellerId: result.sellerId }, 'test', { expiresIn: "30d" });
            res.status(200).json({ result: result, token: token });
        } catch (error) {
            return res.status(500).json({ message: "Something went wrong.", error: error });
        };
    };
};

export const signin = async(req, res) => {
    const { fullname, phone } = req.body;
    try {
        const existingDeliverer = await deliverer.findOne({ phone: phone });
        if (!existingDeliverer)
            return res.status(404).json({ message: "Deliverer doesn't exist." });
        const token = jwt.sign({ fullname: existingDeliverer.fullname, id: existingDeliverer._id, phone: existingDeliverer.phone }, 'test', { expiresIn: "30d" });
        res.status(200).json({ result: existingDeliverer, token: token });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong." });
    }
};