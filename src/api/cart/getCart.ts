import {Request, Response} from "express";
import {Cart} from "../../models/Cart";

export const handle = async (req:Request, res: Response) => {
    try {
        const cart = await service.getCart(req.params)
        res.json(cart);
    } catch (e) {
        if (e.type === 'NotFound') {
            res.status(e.statusCode).send(e.data.message);
        } else res.status(500).send('Something went wrong');
    }
}

const service = {
    getCart: async (param: any) => {
        const { id } = param;
        return Cart.getById(id);
    }
}

export default {
    handle,
    service
}