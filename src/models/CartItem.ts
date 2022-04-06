'use strict'

import {BaseModel} from "./BaseModel";
import {Model} from "objection";
import {Product} from "./Product";
import {ICartItem} from "./types/ICartItem";

export class CartItem extends BaseModel {
    public id: number;
    public quantity: number;
    public cartId: number;
    public productId: number;

    static get tableName () {
        return 'cartItem'
    }
    static get relationMappings () {
        return {
            product: {
                relation: Model.HasOneRelation,
                modelClass: Product,
                join: {
                    from: 'cartItem.product_id',
                    to: 'products.id',
                }
            },
        }
    }
    static async update ({ id, qty }: {id: number, qty: number}) {
        return this.query()
            .patchAndFetchById(
                id,
                {
                    quantity: qty
                }
            )
    }

    static async insert ({ cartId, productId, qty }: ICartItem) {
        return this.query()
            .insertAndFetch({
                cartId, productId, quantity: qty
            })
    }
}