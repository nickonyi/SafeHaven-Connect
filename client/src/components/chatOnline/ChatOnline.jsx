import { useState } from 'react'
import './chatOnline.scss'
import { makeRequest } from '../../axios';
import { useEffect } from 'react';

function ChatOnline({onlineUsers,currentId,setCurrentChat}) {
  const [friends,setFriends] = useState([]);
  const [onlineFriends,setOnlineFriends] = useState([]);


  useEffect(()=>{
  const getFriends = async ()=> {
    const res = await makeRequest.get("/relationships/friends/" + currentId);
    setFriends(res.data)
  }

  getFriends();
  },[currentId])

 useEffect(()=>{
   setOnlineFriends(friends.filter(friend => onlineUsers.some(user => user.userId === friend.id)));

 },[friends,onlineUsers]);

 console.log(onlineFriends);
  return (
    <div className='chatonline'>
     { onlineFriends.map((o)=> (
         <div className="chat-online-friend">
         <div className="chat-online-img-container">
             <img src={"/uploads/" + o.profilePic}  alt="" />
             <div className="chat-online-badge"></div>
         </div>
         <span className="chat-online-name">{o.username}</span>
     </div>
     ))} 
    </div>
  )
}

export default ChatOnline