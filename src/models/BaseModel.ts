'use strict'
import { Model } from "objection";

export class BaseModel extends Model {
    private updatedAt: string = '';
    private createdAt: string = '';

    $beforeUpdate () {
        this.updatedAt =  new Date().toISOString()
    }

    $beforeInsert () {
        this.createdAt = new Date().toISOString()
        this.updatedAt = new Date().toISOString()
    }
}