import './post.scss'
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from 'react-router-dom';
import { FavoriteBorderOutlined } from '@mui/icons-material';
import Comments from '../comments/Comments';
import { useState } from 'react';

function Post({post}) {

  const liked = false;
  const [comentisOpen, setComentisOpen] = useState(false);
  return (
    <div className="post">
      <div className="container">
      <div className="user">
            <div className="user-info">
                <img src={post.profilePic} alt="" />
                <div className="details">
                    <Link to={`/Profile/${post.userID}`} style={{textDecoration:'none',color:'inherit'}}>
                    <span className='name'>{post.username}</span>
                    </Link>
                    <span className="date">1 min ago</span>
                </div>
            </div>
             <MoreHorizIcon />
        </div>
        <div className="content">
            <p>{post.desc}</p>
            <img src={"./uploads/" + post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {liked? <FavoriteOutlinedIcon /> :<FavoriteBorderOutlined />}
            12 likes
          </div>
          <div className="item" onClick={()=> setComentisOpen(!comentisOpen)}>
            <TextsmsOutlinedIcon />
            2 comments
        </div>
        <div className="item">
            <ShareOutlinedIcon />
            Share
         </div>   
    </div>
    {comentisOpen && (<Comments postId={post.id} />)}  
  </div>
 </div>
  )
}

export default Post