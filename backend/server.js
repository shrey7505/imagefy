import express from 'express';
const app = express();
import "dotenv/config";
import cors from 'cors';
import connectDB from './config/mongodb.js';
import userRoutes from './routes/userroutes.js';
import imageRouter from './routes/imagerouts.js';

const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/images', imageRouter);


connectDB();

app.get('/', (req, res) => {
  console.log("RZP_KEY_ID:", process.env.RZP_KEY_ID);
console.log("RZP_KEY_SECRET:", process.env.RZP_KEY_SECRET);

  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
export default app;
