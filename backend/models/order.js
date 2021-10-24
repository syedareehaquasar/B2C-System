import mongoose from 'mongoose';

const ordersSchema = new mongoose.Schema({
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
    },
    date: {
        type: Date,
        default: Date.now
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "seller"
    },
    deliverer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "deliverer"
    },
    orderDetails: {
        type: Array
    },
    status: {
        type: String
    },
    shopName: {
        type: String
    },
    quantity: {
        type: Number
    },
    buyer: Array
});

const order = mongoose.model('order', ordersSchema);
export default order;