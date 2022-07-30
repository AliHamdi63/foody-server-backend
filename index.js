import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import uploadRouter from './routes/upload.js';
import mealRouter from './routes/meal.js';

//routes
import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';

dotenv.config(); //to make env File to save sensitive data

const PORT = process.env.PORT || 5000;
const MONGOOSEDB = process.env.MONGOOSE_DB_CONNECTION;
const app = express();

//connect to mongoose database
mongoose.connect(MONGOOSEDB, (err) => {
    !err ? console.log(`connected to mongoDB successfully`) : console.log(err.message);
})

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.static('public'));

//EndPoints
app.use('/auth', authRouter);
app.use('/user', userRouter);


//this endPoint is used to upload image to public/images folder
app.use('/upload', uploadRouter);


//connect to server
app.listen(PORT, (err) => {
    !err ? console.log(`server is running on port ${PORT}`) : console.log(err.message);
})

