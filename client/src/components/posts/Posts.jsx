import Post from '../post/Post'
import {useQuery} from '@tanstack/react-query'
import { makeRequest } from '../../axios'

function Posts({userId}) {
  
 
  const {isLoading, error, data}= useQuery({
    queryKey: ['posts',userId],
    queryFn: () =>
      makeRequest.get('/posts?userId='+userId).then((res) => res.data),
}
)

 

  const uniquePosts = data ? Array.from(new Set(data.map(post => post.id))).map(id => {
    return data.find(post => post.id === id);
  }) : [];

  
  return (
    <div className='posts'>
      { error ? "Something went wrong" : isLoading ? "Loading..." :
        uniquePosts.map((post,index)=>(
          <Post key={`${post.id}-${index}`} post={post}/> 
        ))
      }
    </div>
  )
}

export default Posts


