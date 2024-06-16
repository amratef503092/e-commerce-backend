
const mongoes = require('mongoose');

const ReviewProductSchema = 
new mongoes.Schema({
    product: 
    {
        type: mongoes.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    user: 
    {
        type: mongoes.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    review: 
    {
        type: String,
        required: true
    },

    rating: 
    {
        type: Number,
        required: true
    }
});



const ReviewProductModel = mongoes.model('ReviewProduct', ReviewProductSchema);

module.exports = ReviewProductModel;