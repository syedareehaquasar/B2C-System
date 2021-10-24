import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "buyer"
    },
    products: [{
        productId: String,
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity can not be less then 1.'],
            default: 1
        },
        name: String,
        price: Number,
        img: String,
    }],
    bill: {
        type: Number,
        required: true,
        default: 0
    }
});

const cart = mongoose.model('cart', cartSchema);
export default cart;