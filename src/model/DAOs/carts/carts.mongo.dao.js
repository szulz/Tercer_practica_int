const cartsModel = require("../../schemas/carts.schema");

class CartsDao {
    async create() {
        let newcart = new cartsModel();
        return newcart.save();
    }

    async findById(id) {
        return await cartsModel.findById(id).populate('cart.product')
    }

    async addProduct(cartId, productId) {
        //agrego al carro, checkeo si hay stock (isAvaliable) y decremento, aumento la quantity en el carro
        //falta avisar que si no hay stock, no aparece en el carro FIJARSE EN EL VIEW.JS
        //CUANDO AGREGO AL CARRO CHECKEE SI EL PROD DEL ID TIENE STOCK Y HACER UN IF
        let existingCart = await this.findById(cartId)
        return existingCart
    }

    async deleteById(cartId, productId) {
        let targetCart = await this.findById(cartId)
        const targetProduct = targetCart.cart.find((item) => item.product._id == productId);
        console.log(targetProduct);
        if (targetProduct.quantity > 1) {
            targetProduct.quantity -= 1
        } else {
            await targetCart.cart.pull({ product: targetProduct.product._id })
        }
        await targetCart.save();
        return targetCart
    }

}

module.exports = CartsDao