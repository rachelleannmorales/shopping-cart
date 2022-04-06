'use strict'
import { Model } from "objection";

export class BaseModel extends Model {
    created_at: string;
    updated_at: string;

    $beforeUpdate () {
        this.updated_at =  new Date().toISOString()
    }

    $beforeInsert () {
        this.created_at = new Date().toISOString()
        this.updated_at = new Date().toISOString()
    }
}