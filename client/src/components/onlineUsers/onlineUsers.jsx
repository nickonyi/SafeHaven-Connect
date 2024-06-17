import React, { useEffect, useState } from 'react';
import {useQuery} from '@tanstack/react-query'
import { makeRequest } from '../../axios'


const OnlineFollowingUsers = ({ userId }) => {
  
    const {isLoading, error, data}= useQuery({
        queryKey: ['onlineUsers'],  
        queryFn: () =>
          makeRequest.get('/lastActive/online-users').then((res) => res.data),
    }
    )

    console.log(data);

  return (isLoading?"Loading...":
    <>
        <div className="item">
        <span>Online friends</span>
      {
        data.map((user)=>(
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
