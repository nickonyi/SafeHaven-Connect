import mongoose from 'mongoose';
const {Schema,model} = mongoose;

const BlogSchema = new Schema({
  title:String,
  summary:String,
  content:String,
  img:String,
  author:String,
}, {
  timestamps: true,
});

const BlogModel = model('Blog',  BlogSchema );

export default BlogModel;