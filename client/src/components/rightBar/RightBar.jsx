import { useContext,useRef,useEffect, useState } from 'react';
import './rightBar.scss'
import { AuthContext } from '../../context/AuthContext';
import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import FollowButton from '../followButton/followButton.jsx';
import OnlineFollowingUsers from '../onlineUsers/onlineUsers.jsx';


function RightBar() {
const {currentUser } = useContext(AuthContext);
const userId = currentUser.id;


const {isLoading, error, data}= useQuery({
  queryKey: ['suggestions'],
  queryFn: () =>
    makeRequest.get('/relationships/suggestions/' + userId).then((res) => {
      return res.data
    })
}
)


const {isLoading:rIsLoading,data:relationshipData}= useQuery({
  queryKey: ['relationship'],
  queryFn: () =>
    makeRequest.get('/relationships?followedUserId=' + userId).then((res) => {
      return res.data
    })
}
)




  

  return ( isLoading?"Loading...":(
    <div className='rightbar'>
      <div className="container">
        <div className="item">
          <span>Suggestions For you</span>
          {data.map((user)=>(
            <div className="user" key={user.id}>
            <div className="user-info">
              <img src={"/uploads/"+ user.profilePic} alt="" />
              <span>{user.username}</span>
            </div>
            <div className="buttons">
              <FollowButton followingId = {user.id} initialFollowStatus={false}/>
              <button>Dismiss</button>
            </div>
            </div>
          )
        )
        }

         <OnlineFollowingUsers key={userId} userId={userId} currentUser={currentUser}/>
      
      </div>
    </div>
  </div>
  )
)

}

export default RightBar