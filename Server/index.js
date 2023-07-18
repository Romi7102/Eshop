import dotenv from 'dotenv'
import express  from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import userRouter from './routes/userRoute.js';
import seedRouter from './routes/seedRoute.js';
import productRouter from './routes/productRouter.js';
import orderRouter from './routes/orderRoute.js';

dotenv.config();

const port = process.env.PORT || 5001

const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRouter)
app.use('/api/seed', seedRouter)
app.use('/api/orders', orderRouter)
app.use('/api/products', productRouter)

mongoose.connect(process.env.MONGO_DB_URI)
.then(()=>{
    app.listen(port);
    console.log("Server is running on port" + port);
})





