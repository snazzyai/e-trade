import express from 'express';
import dotenv from 'dotenv';
import listings from './routes/listings.mjs';
import morgan from 'morgan';
import connectDB from './db.mjs'

dotenv.config({ path: 'config/config.env' });

//connect to mongodb server
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// Mount routes


if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}
app.use('/api/v1/listings', listings);
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
