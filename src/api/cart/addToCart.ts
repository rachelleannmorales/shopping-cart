import {Request, Response} from "express";
import {Cart} from "../../models/Cart";
import {CartItem} from "../../models/CartItem";
import {Product} from "../../models/Product";

export const handle = async (req:Request, res: Response) => {
    const cartId = parseInt(req.params.id);
    const params = req.body;
    const { productId } = params;
    try {
        if (await service.isProductExist(productId)) {
            await service.addToCart(cartId, params)
                .then((cart: Cart) => {
                    res.json(cart)
                }).catch((e) => res.json(e))
        } else {
            res.status(404).send("Product does not exist");
        }
    }
    catch (e) {
        res.status(500).send('Something went wrong!')
    }
}

const service = {
    addToCart: async (cartId: number, params: any) => {
        const { productId, qty, } = params;
        const cartItem: CartItem = await CartItem.query()
            .where('cartId', cartId)
            .where('productId', productId).first();
        if (cartItem) {
            await CartItem.update({id: cartItem.id, qty: qty + cartItem.quantity})
        } else {
            await CartItem.insert({cartId, productId, qty});
        }
        return Cart.getById(cartId);
    },
    isProductExist: (productId: number) => {
        const product = Product.query().findById(productId);
        return !product;
    }
}

export default {
    handle,
    service
}