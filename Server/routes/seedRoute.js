import express from "express";
import data from "../data.js";

import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";

const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
    try{
        await Product.deleteMany({}); // delete all products
        console.log("delete all products");
        const createdProducts = await Product.insertMany(data.products); // insert all products from data.js
        console.log("insert all products");

        await User.deleteMany({}); // delete all users
        console.log("delete all users");
        const createdUsers = await User.insertMany(data.users); // insert all users from data.js
        console.log("insert all users");

        await Order.deleteMany({}); // delete all orders
        console.log("delete all orders");
        // there are no orders to seed!

        res.status(200).send({createdProducts , createdUsers});
        console.log("seeding complete");
    }catch(e){
        console.log("failed to seed data "+ e.message);
    }
});

export default seedRouter;