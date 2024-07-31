import './Resource.scss'
import Blog from '../../components/blog/Blog'
import { useEffect, useState } from 'react'
import { makeRequest } from '../../axios';

function Resource() {
  const [blogs,setBlogs] = useState([]);

  useEffect(()=>{
   fetchBlog();
  },[]);

  const fetchBlog = async ()=> {
    const response = await makeRequest.get("/posts/blog");
    setBlogs(response.data)
  }

  return (
    <div className='resource'>
      {
        blogs.length > 0 && blogs.map((blog) =>(
          <Blog {...blog} />
        ))
      }
    </div>
  )
}

export default Resource