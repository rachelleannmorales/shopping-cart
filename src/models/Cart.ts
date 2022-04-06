'use strict'

import {BaseModel} from "./BaseModel";
import {Model} from "objection";
import {CartItem} from "./CartItem";

export class Cart extends BaseModel {
    private items: CartItem[];
    static get tableName () {
        return 'carts'
    }

    static get virtualAttributes () {
        return ['totalAmount']
    }

    get totalAmount () {
        let totalAmount = 0;
        this.items.map((item: CartItem) => totalAmount+=item.amount);
        return totalAmount;
    }

    static get relationMappings () {
        return {
            items: {
                relation: Model.HasManyRelation,
                modelClass: CartItem,
                join: {
                    from: 'carts.id',
                    to: 'cartItem.cartId',
                }
            },
        }
    }

    static async getById (id: number) {
        return this.query()
            .findById(id)
            .throwIfNotFound({
                message: 'Cart does not exist',
            })
            .withGraphJoined('items')
            .withGraphJoined('items.product');
    }
}