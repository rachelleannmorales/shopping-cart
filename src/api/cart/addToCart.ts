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
            await service.addToCart(cartId, product, qty)
                .then((cart: Cart) => {
                    res.json(cart)
                }).catch((e) => res.json(e.message))
        } else {
            res.status(404).send("Product does not exist");
        }
    }
    catch (e) {
        res.status(401).send(e.message());
    }
}

const service = {
    addToCart: async (cartId: number, product: Product, qty: number) => {
        const cartItem: CartItem = await CartItem.getCartItem({cartId, productId: product.id});
        if (cartItem) {
            const updatedQty = qty + cartItem.quantity;
            if (product.$hasStockAvailable(updatedQty)) {
                await CartItem.update({id: cartItem.id, qty: updatedQty})
            } else throw new Error(`Not enough stock left: ${product.quantity}`);
        } else {
            if (product.$hasStockAvailable(qty)) {
                await CartItem.insert({cartId, productId: product.id, qty});
            } else throw new Error(`Not enough stock left: ${product.quantity}`);
        }
        return Cart.getById(cartId);
    },
}

export default {
    handle,
    service
}