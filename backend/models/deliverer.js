import mongoose from 'mongoose';
import validator from 'validator';

const delivererSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "Please enter your name"]
    },
    role: {
        type: String,
        default: "deliverer"
    },
    phone: {
        type: String,
        required: [true, "Please enter your Phone Number"],
        validate: [validator.isMobilePhone, "Please enter a phone"],
        unique: {
            args: true,
            msg: 'Phone already in use!'
        }
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "seller"
    }
});

const deliverer = mongoose.model('deliverer', delivererSchema);
export default deliverer;