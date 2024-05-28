import { useContext } from 'react'
import './comments.scss'
import { AuthContext } from '../../context/AuthContext';

function Comments() {
  const comments = [{
    id: 1,
    desc: 'loreum ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    name: 'John Doe',
    userID:1,
    profilePic: 'https://www.w3schools.com/howto/img_avatar.png',
},
{
    id: 2,
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    name: 'John Doe',
    userID:2,
    profilePic: 'https://www.w3schools.com/howto/img_avatar.png',
},
{
    id: 3,
    desc: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    name: 'John Doe',
    userID:1,
    profilePic: 'https://www.w3schools.com/howto/img_avatar.png',
}
]
  const {currentUser}= useContext(AuthContext);

    return (
    <div className='comments'>
        <div className="write">
            <img src={currentUser.profilePic}alt="" />
            <input type="text" placeholder="Write a comment..." />
            <button>Send</button>
        </div>
        {
        comments.map(comment =>(
            <div className="comment">
                <img src={comment.profilePic} alt="" />
                <div className="info">
                    <span>{comment.name}</span>
                    <p>{comment.desc}</p>
                </div>
                <span className="date">1 hour ago</span>
            </div>
        ))
    }
    </div>
  )
}

export default Comments