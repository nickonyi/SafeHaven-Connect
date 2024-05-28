import { useContext } from 'react';
import './stories.scss'
import { AuthContext } from '../../context/AuthContext';

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
  const {currentUser} = useContext(AuthContext)
  return (
    <div className='stories'>
       <div className="story">
       <img src={currentUser.profilePic} alt="" />
       <span>{currentUser.name}</span>
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
}

export default Stories