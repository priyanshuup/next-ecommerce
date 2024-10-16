import { models } from "mongoose";

const { model } = require("mongoose");
const { Schema } = require("mongoose");

const ProductSchema = new Schema({
    title : {type: String, required: true},
    description: {type : String},
    price : {type: Number, required: true},
    images : [{type: String}],
});

export const Product = models.Product || model("Product", ProductSchema)