import './post.scss'
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from 'react-router-dom';

function Post({post}) {
  return (
    <div className="post">
      <div className="container">
      <div className="user">
            <div className="user-info">
                <img src={post.photo} alt="" />
                <div className="details">
                    <Link to={`/Profile/${post.userID}`} style={{textDecoration:'none',color:'inherit'}}>
                    <span className='name'>{post.name}</span>
                    </Link>
                    <span className="date">1 min ago</span>
                </div>
            </div>
             <MoreHorizIcon />
        </div>
        <div className="content">
            <p>{post.desc}</p>
            <img src={post.photo} alt="" />
        </div>
        <div className="info"></div>
      </div>
        
    </div>
  )
}

export default Post