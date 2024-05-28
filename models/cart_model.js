const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        user:
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true
        },
        products:
            [
                {
                    productId:
                    {
                        type: mongoose.Schema.ObjectId,
                        ref: 'Product',
                        required: true
                    },
                    quantity:
                    {
                        type: Number,
                        required: true
                    }
                }
            ]
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
        toObject: { virtuals: true }
    }
);


cartSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'products.productId',
    });
    next();
});




const CartModel = mongoose.model('cart', cartSchema);
// 3- hash password


module.exports = CartModel;