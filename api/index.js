import Express from 'express';
import userRoutes from './routes/users.js';

const app = Express();

app.use('/api/v1/users',userRoutes);

app.listen(8800, () => {
  console.log('Server running on port 8800');
});