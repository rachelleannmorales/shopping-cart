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
        await Product.getById(productId);
        await service.deleteToCart(cartId, productId)
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
    deleteToCart: async (cartId: number, productId: number) => {
        await CartItem.deleteCartItem({cartId, productId})
        return Cart.getById(cartId);
    },
}

export default {
    handle,
    service
}