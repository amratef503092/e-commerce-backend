const mongoose = require('mongoose');

const checkoutItemsSchema = new
    mongoose.Schema(
        {
            checkout:
            {
                type: mongoose.Schema.ObjectId,
                ref: 'Checkout',
                required: true
            },
            product:
            {
                type: mongoose.Schema.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity:
            {
                type: Number,
                required: true
            },
            price:
            {
                type: Number,
                required: true
            }
        });

checkoutItemsSchema.pre(/^find/, function (next) 
{
    this.populate
        ({
            path: 'product',
        });
    next();
});

const checkoutItmes = mongoose.model('CheckoutItems', checkoutItemsSchema);

module.exports = checkoutItmes;
