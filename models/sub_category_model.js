
const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required : [true, 'Sub Category name is required'],
        trim : true,
        unique : true,
        maxlength : [32, 'Sub Category name cannot be more than 32 characters'],
        minlength : [3, 'Sub Category name cannot be less than 3 characters']
    },
    slug:{
        type: String,
        unique: true,
        lowercase: true,
    },
    category:
    {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: true
    },

},
{
    timestamps: true,
    toJSON: {
        virtuals: true,
  
    },
    toObject: { virtuals: true }
}

);
subCategorySchema.virtual('id').get(function () {
    return this._id.toHexString();
  });
const  SubCategoryModel = mongoose.model('SubCategory', subCategorySchema);
module.exports = SubCategoryModel;