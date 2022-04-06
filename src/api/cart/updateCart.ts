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
        await service.updateCartItem(cartId, product, qty)
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
    updateCartItem: async (cartId: number, product: Product, qty: number) => {
        const cartItem: CartItem = await CartItem.getCartItem({cartId, productId: product.id});
        if (cartItem) {
            if (!product.$hasStockAvailable(qty)) throw new Error(`Not enough stock left: ${product.quantity}`)
            await CartItem.update({id: cartItem.id, qty})
        }
        return Cart.getById(cartId);
    },
}

export default {
    handle,
    service
}