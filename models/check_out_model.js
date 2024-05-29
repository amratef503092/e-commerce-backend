const mongoes = require('mongoose');

const checkoutOrderSchema = new mongoes.Schema(
    {
        user:
        {
            type: mongoes.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        products:
            [
                {
                    productId:
                    {
                        type: mongoes.Schema.Types.ObjectId,
                        ref: 'Product',
                        required: true
                    },
                    quantity:
                    {
                        type: Number,
                        required: true
                    },

                }
            ],
        totalPrice:
        {
            type: Number,
            required: true
        },
        deliveryAddress: {
            type: String,
            required: true
        },
        status:
        {
            type: ['pending', 'completed', 'cancelled'],
            default: 'pending',
            required: true
        }
    },
    {
        timestamps: true
    },
    {
        toJSON:
        {
            virtuals: true,
        },
        toObject: { virtuals: true },
    }
);

// checkoutOrderSchema.pre('find', function (next) {
//     this.populate({
//         path: 'user',
//     }).populate
//         ({
//             path: 'products.productId',
//         });
//     next();
// });

const CheckoutOrder = mongoes.model('CheckoutOrder', checkoutOrderSchema);

module.exports = CheckoutOrder;