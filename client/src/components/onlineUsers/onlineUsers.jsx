import React, { useEffect, useState,useRef } from 'react';
import  {io} from 'socket.io-client';
import {useQuery} from '@tanstack/react-query'
import { makeRequest } from '../../axios'


const OnlineFollowingUsers = ({ userId,currentUser }) => {
  const [onlineUsers,setOnlineUsers] = useState([]);
  const [friends,setFriends] = useState([]);
  const [onlineFriends,setOnlineFriends] = useState([]);
  const socket = useRef();



  useEffect (()=> {
    socket.current = io("ws://localhost:8900");
    
  },[])
  
  useEffect(()=>{
    socket.current.emit("addUser",userId);
   
    socket.current.on("getUsers",(users)=> {
       setOnlineUsers(users);
    })
  },[currentUser])

  console.log(onlineUsers);
  
 
  console.log(onlineFriends);
  
  useEffect(()=>{
    const getFriends = async ()=> {
      const res = await makeRequest.get("/relationships/friends/" + userId);
      setFriends(res.data)
    }
  
    getFriends();
    },[userId])

    console.log(friends);
  
  
    useEffect(()=>{
      setOnlineFriends(friends.filter(friend => onlineUsers.some(user => user.userId === friend.id)));
   
    },[friends,onlineUsers]);

    console.log(onlineFriends);
  
    

  
  return (
    <>
        <div className="item">
        <span>Online friends</span>
      {
        onlineFriends.map((user)=>(
            <div className="user" key={user.id}>
                 <div className="user-info">
                   <img src={"/uploads/"+ user.profilePic} alt="" />
                   <div className="online"/>
                     <span>{user.username}</span>
                 </div> 
                 </div>   
        ))
      } 
      </div>
         
    </>
     
)
};

export default OnlineFollowingUsers;
