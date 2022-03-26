import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db.mjs';
import listings from './routes/listings.mjs'
import errorHandler from "./middlewares/errorHandler.mjs";

dotenv.config({ path: 'config/config.env' });



connectDB()

const app = express();

//body parser
app.use(express.json())

app.use('/api/v1/listings', listings)

// error handling middleware
app.use(errorHandler)


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
