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

 const handleClick = async(user)=> {
    try {
       const res = await makeRequest.get(`/conversations/find/${currentId}/${user.id}`)
       if (res.data) {
        // Conversation found
        setCurrentChat(res.data);
    } else {
        // Conversation not found, create a new one
        const newConversation = {
            senderId: currentId.toString(),
            receiverId: user.id.toString()
        };
        const createRes = await makeRequest.post('/conversations', newConversation);
        setCurrentChat(createRes.data);
    }
    } catch (error) {
        console.log(error);
    }
 }

 


  return (
    <div className='chatonline' >
     { onlineFriends.map((o)=> (
         <div className="chat-online-friend" onClick={()=> handleClick(o)}>
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