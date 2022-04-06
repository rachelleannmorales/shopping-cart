import {Request, Response} from "express";
import {Cart} from "../../models/Cart";
import {CartItem} from "../../models/CartItem";
import {Product} from "../../models/Product";

export const handle = async (req:Request, res: Response) => {
    const cartId = parseInt(req.params.id);
    const params = req.body;
    const { productId, qty } = params;
    try {
        await Cart.getById(cartId);
        const product = await Product.getById(productId);
        await service.addToCart(cartId, product, qty)
            .then((cart: Cart) => {
                res.json(cart)
            }).catch((e) => res.json(e.message))
    }
    catch (e) {
        if (e.type === 'NotFound') {
            res.status(e.statusCode).send(e.data.message);
        } else res.status(500).send('Something went wrong');
    }
}

const service = {
    addToCart: async (cartId: number, product: Product, qty: number) => {
        const cartItem: CartItem = await CartItem.getCartItem({cartId, productId: product.id});
        if (cartItem) {
            const updatedQty = qty + cartItem.quantity;
            if (!product.$hasStockAvailable(updatedQty)) throw new Error(`Not enough stock left: ${product.quantity}`)
            await CartItem.update({id: cartItem.id, qty: updatedQty})

        } else {
            if (!product.$hasStockAvailable(qty)) throw new Error(`Not enough stock left: ${product.quantity}`)
            await CartItem.insert({cartId, productId: product.id, qty});
        }
        return Cart.getById(cartId);
    },
}

export default {
    handle,
    service
}