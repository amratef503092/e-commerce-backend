const mongoose = require('mongoose');
// 1- Create Schema
const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Brand required'],
      unique: [true, 'Brand must be unique'],
      minlength: [3, 'Too short Brand name'],
      maxlength: [32, 'Too long Brand name'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { 
    timestamps: true ,
    toJSON: { virtuals: true ,
   

    },
    toObject: { virtuals: true }
  }
);
brandSchema.methods.toJSON = function () 
{
  const brand = this;
  const brandObject = brand.toObject();
  delete brandObject.__v;
  brandObject.id = brandObject._id;
  delete brandObject._id;
  return brandObject;
}
// 2- Create model
module.exports = mongoose.model('Brand', brandSchema);