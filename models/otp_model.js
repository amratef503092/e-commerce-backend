const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    otp: {
        type: String,
        required: [true, 'OTP is required'],
        minLength: [4, 'OTP must be 4 characters'],
        maxLength: [4, 'OTP must be 4 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        minLength: [3, 'Email must be more than 3 characters'],
        maxLength: [30, 'Email must be less than 30 characters']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300 // 5 minutes
    }

});

otpSchema.methods.toJSON = function () {
    const otpObject = this.toObject();
    delete otpObject._id;
    delete otpObject.__v;
    return otpObject;
};

otpSchema.methods.checkOTP = function (otp) {
    try {
        if (otp === this.otp && this.createdAt.getTime() + 300000 > Date.now()) {
            return true;
        }
    } catch (error) {
        throw new Error('Invalid OTP or OTP expired');
    }


};


const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;