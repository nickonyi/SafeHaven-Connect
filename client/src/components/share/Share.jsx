import './share.scss'
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import {useMutation,useQueryClient} from '@tanstack/react-query'
import { makeRequest } from '../../axios';

function Share() {

  const {currentUser}= useContext(AuthContext);
  
  const [file,setFile] = useState(null);
  const [desc,setDesc] = useState('');


  const upload = async() => {
    try {
      const formData = new FormData();
      formData.append('file',file);
      const res = await makeRequest.post('/upload',formData);
      return res.data;
      
    } catch (error) {
      console.log(error);
    }
  }

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newPost)=> {
      return makeRequest.post('/posts',newPost)
    
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  const handleClick = async (e) => {
    e.preventDefault();
    let imgURL = '';
    if(file) imgURL = await upload();
    mutation.mutate({desc,img:imgURL})
    setDesc(' ');
    setFile(null);
   
  }

  return (
    <div className='share'>
      <div className="container">
        <div className="top">
          <img className="shareImg" src={currentUser.profilePic} alt="" />
          <input placeholder={`What's in your mind? ${currentUser.username}`} value={desc} onChange={(e)=> setDesc(e.target.value)} />
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{display:"none"}} onChange={(e)=> setFile(e.target.files[0])}/>
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friend</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Share