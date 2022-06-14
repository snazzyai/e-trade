import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import connectDB from './db.mjs';
import listings from './routes/listings.mjs'
import auth from "./routes/auth.mjs";
import errorHandler from "./middlewares/errorHandler.mjs";


dotenv.config({ path: 'config/config.env' });

connectDB()

const app = express();

//body parser
app.use(express.json())

//use cookie parser
app.use(cookieParser())

//Mount the routers
app.use('/api/v1/listings', listings)
app.use('/api/v1/auth', auth)

// error handling middleware
app.use(errorHandler)


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
