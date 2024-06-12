import './post.scss'
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from 'react-router-dom';
import { FavoriteBorderOutlined } from '@mui/icons-material';
import Comments from '../comments/Comments';
import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import moment from 'moment';

function Post({post}) {
  const [comentisOpen, setComentisOpen] = useState(false);
  const {currentUser} = useContext(AuthContext); 

  

  const {isLoading, error, data}= useQuery({
    queryKey: ['likes',post.id],
    queryFn: () =>
      makeRequest.get('/likes?postId=' + post.id).then((res) => {
        return res.data
      })
}
)

const {isLoading:isCommentLoading, data:commentData}= useQuery({
  queryKey: ['comments',post.id],
  queryFn: () =>
    makeRequest.get('/comments?postId=' + post.id).then((res) => {
      return res.data
    })
}
)



const queryClient = useQueryClient();

const mutation = useMutation({
  mutationFn: (liked)=> {
    if(liked) return makeRequest.delete('/likes?postId='+post.id)
    return makeRequest.post('/likes',{postId:post.id})
  },
  onSuccess: () => {
    // Invalidate and refetch
    queryClient.invalidateQueries({ queryKey: ['likes'] })
  },
})


  const handleLike =()=>{
    mutation.mutate(data.includes(currentUser.id));
  }
  return (
    <div className="post">
      <div className="container">
      <div className="user">
            <div className="user-info">
                <img src={'/uploads/' + post.profilePic} alt="" />
                <div className="details">
                    <Link to={`/Profile/${post.userId}`} style={{textDecoration:'none',color:'inherit'}}>
                    <span className='name'>{post.username}</span>
                    </Link>
                    <span className="date">{moment(post.createdAt).fromNow()}</span>
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
            {isLoading?'Loading...'
            :data.includes(currentUser.id)?
            (<FavoriteOutlinedIcon style={{color:"red"}} onClick={handleLike} />) 
  :(<FavoriteBorderOutlined onClick={handleLike} />)}
            {isLoading?"0":data.length == 1?"1 like":data.length + " likes"  }
            
          </div>
          <div className="item" onClick={()=> setComentisOpen(!comentisOpen)}>
            <TextsmsOutlinedIcon />
            {isCommentLoading?"Loading..":commentData.length == 1?"1 Comment":commentData.length + " Comments"}
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