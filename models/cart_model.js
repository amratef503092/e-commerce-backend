const mongoose = require("mongoose");
const CalculatePrice = require('../utility/helper/price_helpers');

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
        toObject: { virtuals: true },

    }
);


cartSchema.pre(/^find/, function (next) {

    this.populate
        ({
            path: 'products.productId',
        });



    next();
});
cartSchema.methods.toJSON = function () {
    const cart = this;
    const cartObject = cart.toObject();
    cartObject.products = cartObject.products.map(product => {
        const productModel = product.productId;
        const { price } = productModel;
        const totalPriceAfterDiscount = CalculatePrice.calculateDiscountPrice(productModel) * product.quantity;
        const priceProductWithDiscount = CalculatePrice.calculateDiscountPrice(productModel);
        const discount = CalculatePrice.getDiscountedPrice(productModel);
        const priceProduct = price * product.quantity;
        return {
            ...product,
            totalPriceAfterDiscount,
            priceProductWithDiscount,
            discount,
            priceProduct
        };
    });

    return cartObject;
};


cartSchema.virtual('totalPriceBeforeDiscount').get(function () {
    let total = 0;
    this.products.forEach(product => {
        const productModel = product.productId;
        const price = productModel.price;
        total += price * product.quantity;
    });
    return total;
});

// i want add virtual field to calculate total price
cartSchema.virtual('totalPriceAfterDiscount').get(function () {
    let total = 0;
    this.products.forEach(product => {
        const productModel = product.productId;
        const discountedPrice = CalculatePrice.calculateDiscountPrice(productModel);
        total += discountedPrice * product.quantity;
    });
    return total;
});

// i want add virtual field to calculate total price



// i want add total price for each product

// price each product 



const CartModel = mongoose.model('cart', cartSchema);
// 3- hash password


module.exports = CartModel;