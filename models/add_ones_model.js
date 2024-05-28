
const mongoes = require('mongoose');



const addOnesSchema = 

new mongoes.Schema
({
    name:
    {
        type: String,
        required: [true, 'Please provide name'],
        trim: true
    },
    price:
    {
        type: Number,
        required: [true, 'Please provide price'],
    },
    description:
    {
        type: String,
        required: [true, 'Please provide description'],
        trim: true
    },
    quantity:
    {
        type: Number,
        required: [true, 'Please provide quantity'],
    },
    maxQuantity:
    {
        type: Number,
        required: [true, 'Please provide maxQuantity'],
    },
    type:
    {
        type: String,
        required: [true, 'Please provide type'],
    },
    required:
    {
        type: Boolean,
        required: [true, 'Please provide required'],
    },
    
});

