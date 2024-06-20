import express from 'express';
import userRoutes from './routes/users.js';
import commentRoutes from './routes/comments.js';
import postRoutes from './routes/posts.js';
import likeRoutes from './routes/likes.js';
import authRoutes from './routes/auth.js';
import relationshipRoutes from './routes/relationships.js';
import lastUserRoutes from './routes/lastActive.js';
import storyRoutes from './routes/stories.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import multer from 'multer';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';


const app = express();
dotenv.config();

//middlewares
app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Credentials',true);
  next();
})
app.use(helmet());
app.use(morgan('common'));
app.use(express.json());
app.use(
  cors({
  origin:'http://localhost:5173'
})
);
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/uploads/')
  },
  filename: function (req, file, cb) {
    
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })

app.post('/api/upload',upload.single('file'),(req,res)=>{
  const file = req.file;
  res.status(200).json(file.filename);
})

app.use('/api/users',userRoutes);
app.use('/api/comments',commentRoutes);
app.use('/api/posts',postRoutes);
app.use('/api/likes',likeRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/stories',storyRoutes);
app.use('/api/relationships',relationshipRoutes);
app.use('/api/lastActive',lastUserRoutes);





app.listen(8800, () => {
  console.log('Server running on port 8800');
});

mongoose.connect(process.env.MONGO_URL).then(()=> console.log('Connected to MongoDB')).catch((err)=> console.log(err));