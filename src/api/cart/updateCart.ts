import {Request, Response} from "express";
import {Cart} from "../../models/Cart";
import {CartItem} from "../../models/CartItem";
import {Product} from "../../models/Product";

export const handle = async (req:Request, res: Response) => {
    const cartId = parseInt(req.params.id);
    const params = req.body;
    const { productId, qty } = params;
    try {
        const product = await Product.getById(productId);
        if (product) {
            await service.updateCartItem(cartId, product, qty)
                .then((cart: Cart) => {
                    res.json(cart)
                }).catch((e) => res.json(e.message))
        } else {
            res.status(404).send("Product does not exist");
        }
    }
    catch (e) {
        res.status(500).send(e.message());
    }
}

const service = {
    updateCartItem: async (cartId: number, product: Product, qty: number) => {
        const cartItem: CartItem = await CartItem.getCartItem({cartId, productId: product.id});
        if (cartItem) {
            if (product.$hasStockAvailable(qty)) {
                await CartItem.update({id: cartItem.id, qty})
            } else throw new Error(`Not enough stock left: ${product.quantity}`);
        }
        return Cart.getById(cartId);
    },
}

export default {
    handle,
    service
}