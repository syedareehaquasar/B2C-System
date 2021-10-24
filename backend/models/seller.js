import validator from 'validator';
import mongoose from 'mongoose';

const sellerSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "Please enter your name"]
    },
    role: {
        type: String,
        default: "seller",
        required: [true, "Please enter your role"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        validate: [validator.isEmail, "Please enter a email"],
        unique: {
            args: true,
            msg: 'Email address already in use!'
        }
    },
    phone: {
        type: String,
        required: [true, "Please enter your Phone Number"],
        validate: [validator.isMobilePhone, "Please enter a phone"],
        unique: {
            args: true,
            msg: 'phone already in use!'
        }
    },
    shopName: {
        type: String,
        required: [true, "Please enter your Shop Name"],
    },
    shopAddress: {
        type: String,
        required: [true, "Please enter your Shop Address"],
    },
    password: {
        type: String,
        required: [true, "Please enter a password"]
    },
    description: {
        type: String,
        required: [true, "Please enter a password"]
    },
});

sellerSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('Incorrect password');
    }
    throw Error("Incorrect email");
};

const seller = mongoose.model('seller', sellerSchema);
export default seller;