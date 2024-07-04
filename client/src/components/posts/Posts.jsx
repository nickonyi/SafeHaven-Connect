import Post from '../post/Post'
import {useQuery} from '@tanstack/react-query'
import { makeRequest } from '../../axios'

function Posts({userId}) {
 
  const {isLoading, error, data}= useQuery({
    queryKey: ['posts'],
    queryFn: () =>
      makeRequest.get('/posts?userId='+userId).then((res) => res.data),
}
)

  
  return (
    <div className='posts'>
      { error ? "Something went wrong" : isLoading ? "Loading..." :
        data.map((post)=>(
          <Post key={post.id} post={post}/> 
        ))
      }
    </div>
  )
}

export default Posts


