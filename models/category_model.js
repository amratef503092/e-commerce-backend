
const mangoose = require('mongoose');

// 1- create schema
const categorySchema = new mangoose.Schema({
    name:
    {
        type: String,
        required: [true, 'Category name is required'],
        unique: [true, 'Category name must be unique'],
        minLength: [3, 'Category name must be more than 3 characters'],
        maxLength: [30, 'Category name must be less than 30 characters']

    },
    slug:
    {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    image:
    {
        type: String,
        // required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,

    },
    toObject: { virtuals: true }
}

);



// 2- create model
const CategoryModel = mangoose.model('Category', categorySchema);

module.exports = CategoryModel;