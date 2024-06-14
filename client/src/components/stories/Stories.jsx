import { useContext } from 'react';
import './stories.scss'
import { AuthContext } from '../../context/AuthContext';
import {useQuery} from '@tanstack/react-query';
import { makeRequest } from '../../axios';

//Temporary data
const stories = [
  {
    id: 1,
    profilePic: "https://images.pexels.com/photos/1080884/pexels-photo-1080884.jpeg",
    username: "SafakKocaoglu",
  },
  {
    id: 2,
    profilePic: "https://images.pexels.com/photos/1080884/pexels-photo-1080884.jpeg",
    username: "Janell Shrum",
  },
  {
    id: 3,
    profilePic: "https://images.pexels.com/photos/1080884/pexels-photo-1080884.jpeg",
    username: "Alex Durden",
  },
  {
    id: 4,
    profilePic: "https://images.pexels.com/photos/1080884/pexels-photo-1080884.jpeg",
    username: "Dora Hawks",
  }
];



function Stories() {
  const {currentUser} = useContext(AuthContext);

const userId = currentUser.id;
console.log(userId);
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
      {stories.map((story)=>(
        <div className="story" key={story.id}>
          <img src={story.profilePic} alt="" />
          <span>{story.username}</span>
        </div>
      ))}
    </div>
  )
  )
}

export default Stories