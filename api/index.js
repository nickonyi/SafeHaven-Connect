import express from 'express';
import userRoutes from './routes/users.js';
import commentRoutes from './routes/comments.js';
import postRoutes from './routes/posts.js';
import likeRoutes from './routes/likes.js';
import authRoutes from './routes/auth.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';


const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/api/users',userRoutes);
app.use('/api/comments',commentRoutes);
app.use('/api/posts',postRoutes);
app.use('/api/likes',likeRoutes);
app.use('/api/auth',authRoutes);

app.listen(8800, () => {
  console.log('Server running on port 8800');
});