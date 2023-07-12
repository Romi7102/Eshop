import express from "express";
import expressAsyncHandler from "express-async-handler";
import { isAuth } from "../utilles";

import Product from "../models/productModel";

const orderRouter = express.Router();

orderRouter.get(
    "/:id",
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const { id } = req.params;
        const order = await Order.findById(id);

        if (order) {
            return res.send(order); // send the order back in json format
        } else {
            res.status(404).send({ message: "Order not found" });
        }
    })
);

orderRouter.get(
    "/",
    isAuth, //check if user is logged in
    expressAsyncHandler(async (req, res) => {
        try {
            const newOrder = new Order({
                orderItems: req.body.orderItems.map((item) => ({
                    //...item, //! this may be removed in the future
                    product: item._id,
                })),
                shippingAddress: req.body.shippingAddress,
                paymentMethod: req.body.paymentMethod,
                itemsPrice: req.body.itemsPrice,
                shippingPrice: req.body.shippingPrice,
                taxPrice: req.body.taxPrice,
                totalPrice: req.body.totalPrice,
                user: req.user._id
            });
            const order = await newOrder.save();
            res.status(201).send({ message: "Order Created", order });
        } catch (err) {
            res.status(500).send({ message: err.message });
        }

    })
);

export default orderRouter;
