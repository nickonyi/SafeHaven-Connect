import { useState,useEffect } from 'react'
import { makeRequest } from '../../axios';
import './Conversation.scss'

function Conversation({conversation, currentUser}) {
const [user,setUser] = useState(null);

useEffect(() => {
  const friendId = conversation.members.find((m) => m !== currentUser.id);
  console.log(friendId);

  const getUser = async ()=> {
     try {
      const res = await makeRequest.get('/users/find/' + friendId);
      setUser(res.data);
     } catch (error) {
       console.log(error);
     }
  }

  getUser();
  
},[currentUser,conversation])

console.log(user);

  return (
    <div className='conversation'>
        <img src="https://images.pexels.com/photos/24879566/pexels-photo-24879566/free-photo-of-a-mountain-with-green-grass-and-rocks.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
        <span>{user.username}</span>
    </div>
  )
}

export default Conversation