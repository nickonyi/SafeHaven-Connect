import './followButton.scss'
import { useState } from 'react'
import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query';
import { makeRequest } from '../../axios';

function FollowButton({followingId,initialFollowStatus}) {
    const [isFollowing,setIsFollowing] = useState(initialFollowStatus);

const queryClient = useQueryClient();

    const handleFollow = async () => {
        try {
              await makeRequest.post('/relationships',{userId:followingId});
              setIsFollowing(true);
        } catch (error) {
            
        }
    }
    
    const handleUnfollow = async () => {
        try {
            await makeRequest.delete('/relationships?userId='+followingId)
            setIsFollowing(false);
      } catch (error) {
          
      }
    }
  return (
    <button onClick={isFollowing? handleUnfollow : handleFollow }>
        {isFollowing ? "unfollow" : "follow"}
    </button>
  )
}

export default FollowButton