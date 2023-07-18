import express from "express";
import expressAsyncHandler from "express-async-handler";
import { isAuth } from "../utilles";

import Product from "../models/productModel";

const productRouter = express.Router();

productRouter.get(
    "/",
    expressAsyncHandler(async (req, res) => {
        const products = await Product.find();
        res.send(products);
    })
);
productRouter.get(
    "/categories",
    expressAsyncHandler(async (req, res) => {
        const categories = await Product.find().distinct("category");
        res.send(categories);
    })
);

productRouter.get(
    "/token/:token",
    expressAsyncHandler(async (req, res) => {
        const { token } = req.params;
        const product = await Product.findOne({ token });
        product
            ? res.send(product)
            : res.status(404).send({ message: "Product not found" });
    })
);
productRouter.get(
    "/id/:id",
    expressAsyncHandler(async (req, res) => {
        const { id } = req.params;
        const product = await Product.findOne({ id });
        product
            ? res.send(product)
            : res.status(404).send({ message: "Product not found" });
    })
);



export default productRouter;
