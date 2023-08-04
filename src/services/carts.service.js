
const CartsDao = require("../model/DAOs/carts/carts.mongo.dao.js");
const ProductDao = require("../model/DAOs/products/products.mongo.dao.js");
const productDao = new ProductDao
const cartsDao = new CartsDao

class CartService {

    async createCart() {
        let newcart = await cartsDao.create()
        return newcart
    }

    async userCart(id) {
        let cartCountent = await cartsDao.findById(id)
        if (cartCountent.cart == '') {
            console.log('empty cart');
            let products = { empty: 'You have not added anything to the cart yet!' }
            return products
        }
        let products = cartCountent.cart.map((cart) => {
            return { title: cart.product.title, description: cart.product.description, price: cart.product.price, stock: cart.product.stock, quantity: cart.quantity }
        })
        return products
    }

    async addToCart(cartId, productId) {
        try {
            let foundCart = await cartsDao.addProduct(cartId)
            const foundProduct = foundCart.cart.find((item) => item.product._id == productId);
            let isAvaliable = await productDao.decreaseStock(productId)
            if (isAvaliable > 0) {
                if (foundProduct) {
                    foundProduct.quantity += 1;
                } else {
                    foundCart.cart.push({ product: productId, quantity: 1 });
                }
                await foundCart.save()
                return foundCart
            }
            return foundCart;
        } catch (e) {
            throw new Error('error en addtocart')
        }
    }

    async deleteProduct(cartId, productId) {
        try {
            return await cartsDao.deleteById(cartId, productId)
        } catch (e) {
            throw new Error(e.message)
        }
    }

    /*
    async updateCart(cartId, newProducts, newQuantity) {
        if (!newQuantity) {
            newQuantity = 1
        }
        let update = { product: newProducts, quantity: newQuantity }
        let targetCart = await cartsModel.findByIdAndUpdate(cartId, { cart: update }, { new: true })
        return await targetCart.save()
    }

    async updateProductQuantity(cartId, productId, quantity) {
        let targetCart = await cartsModel.findById(cartId);
        let targetProduct = targetCart.cart.find((item) => item.product == productId)
        targetProduct.quantity = JSON.parse(quantity)
        if (targetProduct.quantity === 0) {
            throw new Error('please type a number greater than 0')
        }
        return await targetCart.save()
    }
    */
}



module.exports = CartService;