
const mangoose = require('mongoose');


const productSchema = new mangoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Product name is required'],
            // unique: [true, 'Product name must be unique'],
            minLength: [3, 'Product name must be more than 3 characters'],
            maxLength: [100, 'Product name must be less than 100 characters']
        },
        slug: {
            type: String,
            required: true,
            lowercase: true,
        },
        description: {
            type: String,
            required: [true, 'Product description is required'],
            minLength: [10, 'Product description must be more than 10 characters'],
            maxLength: [1000, 'Product description must be less than 1000 characters']
        },
        price: {
            type: Number,
            required: [true, 'Product price is required'],
            min: [1, 'Product price must be more than 1'],
            max: [1000000, 'Product price must be less than 1000000']
        },
        discount: {
            type: {
                type: String,
                enum: ['fixed', 'percentage'],
                required: true
            },
            value: {
                type: Number,
                required: true,
                validate: {
                    validator: function (v) {
                        if (this.type === 'fixed') {
                            return v >= 0;
                        }

                        return v >= 0 && v <= 100;

                    },
                    message: props => props.path === 'fixed' ?
                        'Fixed discount amount must be greater than or equal to 0' :
                        'Discount percentage must be between 0 and 100'
                }
            }
        },
        stock: {
            type: Number,
            required: [true, 'Product stock is required'],
            min: [1, 'Product stock must be more than 1'],
            max: [10000, 'Product stock must be less than 10000']
        },
        imageCover: {
            type: String,
            required: [true, 'Product imageCover is required']
        },
        images: [String],
        colors: [String],
        sold: {
            type: Number,
            default: 0,
        },
        category: {
            type: mangoose.Schema.ObjectId,
            ref: 'Category',
            required: [true, 'Product category is required']
        },
        brand: {
            type: mangoose.Schema.ObjectId,
            ref: 'Brand',
            required: [true, 'Product brand is required']
        },
        rating: {
            type: Number,
            default: 0,
        },
        numReviews: {
            type: Number,
            default: 0,
        },
        subCategory: [{

            type: mangoose.Schema.ObjectId,

            ref: 'SubCategory',
            required: [true, 'Product subCategory is required']
        }],
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }

);
productSchema.pre('find', function (next) {
    this.populate('category', "name").populate('subCategory', "name").populate('brand', 'name');
    next();
});
const ProductModel = mangoose.model('Product', productSchema);

module.exports = ProductModel;

