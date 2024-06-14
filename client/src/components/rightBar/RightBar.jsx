import { useContext } from 'react';
import './rightBar.scss'
import { AuthContext } from '../../context/AuthContext';
import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import FollowButton from '../followButton/followButton.jsx';

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
console.log(data);

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
          
        <div className="item">
           <span>Latest activities</span>
           <div className="user">
            <div className="user-info">
              <img src={currentUser.profilePic} alt="" />
              <p>
              <span>{currentUser.name} </span> changed their cover picture
              </p>
            </div>
            <div className="buttons">
              <span>1 min ago</span>
            </div>
          </div>
          <div className="user">
            <div className="user-info">
              <img src={currentUser.profilePic} alt="" />
              <p>
              <span>Jane Doe  </span> changed their profile picture
              </p>
            </div>
            <div className="buttons">
              <span>1 min ago</span>
            </div>
          </div>
          <div className="user">
            <div className="user-info">
              <img src={currentUser.profilePic} alt="" />
              <p>
              <span>Jane Doe  </span> just came online
              </p>
            </div>
            <div className="buttons">
              <span>1 min ago</span>
            </div>
          </div>
        </div>
        <div className="item">
          <span>Online friends</span>
          <div className="user">
            <div className="user-info">
              <img src={currentUser.profilePic} alt="" />
              <div className="online"/>
                <span>Jane Doe </span>
            </div>
          </div>
          <div className="user">
            <div className="user-info">
              <img src={currentUser.profilePic} alt="" />
              <div className="online"/>
                <span>Jane Doe </span>
            </div>
          </div>
          <div className="user">
            <div className="user-info">
              <img src={currentUser.profilePic} alt="" />
              <div className="online"/>
                <span>Jane Doe </span>
            </div>
          </div>
          <div className="user">
            <div className="user-info">
              <img src={currentUser.profilePic} alt="" />
              <div className="online"/>
                <span>Jane Doe </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
)

}

export default RightBar