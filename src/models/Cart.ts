'use strict'

import {BaseModel} from "./BaseModel";
import {Model} from "objection";
import {CartItem} from "./CartItem";

export class Cart extends BaseModel {
    static get tableName () {
        return 'carts'
    }

    static get relationMappings () {
        return {
            products: {
                relation: Model.HasManyRelation,
                modelClass: CartItem,
                join: {
                    from: 'carts.id',
                    to: 'cart_item.id',
                }
            },
        }
    }
}