import { useContext } from 'react';
import './rightBar.scss'
import { AuthContext } from '../../context/AuthContext';

function RightBar() {
const {currentUser } = useContext(AuthContext);

  return (
    <div className='rightbar'>
      <div className="container">
        <div className="item">
          <span>Suggestions For you</span>
          <div className="user">
            <div className="user-info">
              <img src={currentUser.profilePic} alt="" />
              <span>{currentUser.name}</span>
            </div>
            <div className="buttons">
              <button>Follow</button>
              <button>Dismiss</button>
            </div>
          </div>
          <div className="user">
            <div className="user-info">
              <img src={currentUser.profilePic} alt="" />
              <span>{currentUser.name}</span>
            </div>
            <div className="buttons">
              <button>Follow</button>
              <button>Dismiss</button>
            </div>
          </div>
          <div className="user">
            <div className="user-info">
              <img src={currentUser.profilePic} alt="" />
              <span>{currentUser.name}</span>
            </div>
            <div className="buttons">
              <button>Follow</button>
              <button>Dismiss</button>
            </div>
          </div>
        </div>
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
  )
}

export default RightBar