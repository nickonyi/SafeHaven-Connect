import Post from '../post/Post'
import './posts.scss'
import {useQuery} from '@tanstack/react-query'
import { makeRequest } from '../../axios'

function Posts() {
 
  const {isLoading, error, data}= useQuery({
    queryKey: ['posts'],
    queryFn: () =>
      makeRequest.get('/posts').then((res) => res.data),
}
)



console.log(data);
  
  return (
    <div className='posts'>
      
    </div>
  )
}

export default Posts


