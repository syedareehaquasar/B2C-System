import seller from "../models/seller.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async(req, res) => {
    const { email, password, confirmPassword, fullname, phone, shopName, shopAddress, description } = req.body;
    try {
        const existingSeller = await seller.findOne({ email });
        if (existingSeller) {
            return res.status(400).json({ message: "Seller already exist." });
        }
        if (password !== confirmPassword)
            return res.status(400).json({ message: "Passwords don't match." });
        const encryptedPassword = await bcrypt.hash(password, 12);
        const result = await seller.create({ email, password: encryptedPassword, fullname, phone, shopName, shopAddress, description });
        const token = jwt.sign({ fullname: result.fullname, email: result.email, id: result._id, phone: result.phone, shopName: result.shopName, shopAddress: result.shopAddress, description: result.description }, 'test', { expiresIn: "30d" });
        res.status(200).json({ result: result, token: token });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong." });
    }
};

export const signin = async(req, res) => {
    const { phone, password } = req.body;
    try {
        const existingSeller = await seller.findOne({ phone });
        if (!existingSeller)
            return res.status(404).json({ message: "seller doesn't exist." });
        const isPasswordCorrect = await bcrypt.compare(password, existingSeller.password);
        if (!isPasswordCorrect)
            return res.status(400).json({ message: "Invalid credentials." });
        const token = jwt.sign({ fullname: existingSeller.fullname, email: existingSeller.email, id: existingSeller._id, phone: existingSeller.phone, shopName: existingSeller.shopName, shopAddress: existingSeller.shopAddress, description: existingSeller.description }, 'test', { expiresIn: "30d" });
        res.status(200).json({ result: existingSeller, token: token });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong." });
    }
};