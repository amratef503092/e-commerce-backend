const CartModel = require('../../models/cart_model');
const ProductModel = require('../../models/product_model');

class CalculatePrice 
{

    static calculateDiscountPrice(productModel) 
    {
        const discountType = productModel.discount.type;
        const discountValue = productModel.discount.value;
        const { price } = productModel;
        if (discountType === 'fixed') 
            {
            return price - discountValue;
        }
        return price - (price * discountValue / 100);

    }

    static getDiscountedPrice(productModel) {
        const discountType = productModel.discount.type;
        const discountValue = productModel.discount.value;
        if (discountType === 'fixed') 
        {
            return discountValue;
        }
        return discountValue / 100;
    }

    static calculateTotalPrice(cart) 
    {
        const totalPrice = 0;
        const { products } = cart;

        products.forEach(product => 
        {
            const productModel = product.productId;
            const discountedPrice = CalculatePrice.calculateDiscountPrice(productModel);
            console.log(discountedPrice);
        });
        return totalPrice;
    }

}
module.exports = CalculatePrice;