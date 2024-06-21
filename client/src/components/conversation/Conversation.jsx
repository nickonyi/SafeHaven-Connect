import { useState,useEffect } from 'react'
import { makeRequest } from '../../axios';
import './Conversation.scss'
import dotenv from 'dotenv';

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
        <img src={"/uploads/" + user.profilePic} alt="" />
        <span>{user.username}</span>
    </div>
  )
}

export default Conversation