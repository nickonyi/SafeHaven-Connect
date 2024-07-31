import { useEffect, useState } from 'react'
import './BlogPage.scss'
import { makeRequest } from '../../axios';
import { useParams } from 'react-router-dom';
import moment from 'moment';

function BlogPage() {
    const [blogInfo, setBlogInfo] = useState([]);
    const {id} = useParams();
    
    useEffect(()=>{
        fetchBlogs();
    },[]);
    
    
    const fetchBlogs = async () => {
        const response = await makeRequest.get(`/posts/blog/${id}`);
        setBlogInfo(response.data.postDoc);
    }

    if (!blogInfo) return '';
  return (
    <div className='blog-page'>
        <h1>{blogInfo.title}</h1>
        <div className="time">{moment(new Date(blogInfo.createdAt)).format('MMMM Do YYYY')}</div>
        <div className="author">by {blogInfo.author}</div>
        <div className="image">
        <img src={"/uploads/" + blogInfo.img} alt=""/>
      </div>
      <div className="content" dangerouslySetInnerHTML={{__html:blogInfo.content}} />
    </div>
  )
}

export default BlogPage