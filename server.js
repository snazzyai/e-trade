import express from 'express';
import dotenv from 'dotenv';

dotenv.config({ path: 'config/config.env' });

const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
