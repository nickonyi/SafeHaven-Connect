import { useContext } from 'react';
import './stories.scss'
import { AuthContext } from '../../context/AuthContext';
import {useQuery} from '@tanstack/react-query';
import { makeRequest } from '../../axios';



function Stories() {
  const {currentUser} = useContext(AuthContext);

  const { isLoading:storiesLoading, data:storiesData } = useQuery({
    queryKey: ['stories'],
    queryFn: () =>
      makeRequest.get('/stories').then((res) => {
        return res.data
      })
  }
  );

  console.log(storiesData)




const userId = currentUser.id;

const {isLoading, error, data}= useQuery({
  queryKey: ['user'],
  queryFn: () =>
    makeRequest.get('/users/find/' + userId).then((res) => {
      return res.data
    })
}
)


  return ( isLoading?"Loading...":(
    <div className='stories'>
       <div className="story">
       <img src={"/uploads/" + data.profilePic} alt="" />
       <span>{data.username}</span>
       <button>+</button>
       </div>
      {storiesLoading?"Loading...":storiesData.map((story)=>(
        <div className="story" key={story.id}>
          <img src={"/uploads/"+story.img} alt="" />
          <span>{story.username}</span>
        </div>
      ))}
    </div>
  )
  )
}

export default Stories