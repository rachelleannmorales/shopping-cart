'use strict'
import {BaseModel} from "./BaseModel";

export class Category extends BaseModel {
    static get tableName () {
        return 'categories'
    }
}
