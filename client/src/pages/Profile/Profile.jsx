import './profile.scss'
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts"
import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { useLocation } from 'react-router-dom';
import { useState,useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Button } from '@mui/material';
import Update from '../../components/update/update';



function Profile() {
  
  const[openUpdate,setOpenUpdate] = useState(false);

  const userId = parseInt(useLocation().pathname.split('/')[2]);
  
  const {currentUser} = useContext(AuthContext);
  const {isLoading, error, data}= useQuery({
    queryKey: ['user'],
    queryFn: () =>
      makeRequest.get('/users/find/' + userId).then((res) => {
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



const queryClient = useQueryClient();

const mutation = useMutation({
  mutationFn: (following)=> {
    if(following) return makeRequest.delete('/relationships?userId='+userId)
    return makeRequest.post('/relationships',{userId:userId})
  },
  onSuccess: () => {
    // Invalidate and refetch
    queryClient.invalidateQueries({ queryKey: ['relationship'] })
  },
})


  const handleFollow =()=>{
    mutation.mutate(relationshipData.includes(currentUser.id));
  }

  

  return (
    <div className='profile'>
      <div className="images">
        <img src={isLoading?"":"/uploads/" + data.coverPic} alt="" className="cover" />
        <img src={isLoading?"":"/uploads/" + data.profilePic} alt="" className="profile" />
        </div>
        <div className="profile-container">
          <div className="user__info">
            <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon fontSize="large" />
            </a>
            </div>
            <div className="center">
              <span>{isLoading?"":data.username}</span>
              <div className="info">
                <div className="item">
                  <PlaceIcon />
                  <span>{isLoading?"":data.city}</span>
                </div>
                <div className="item">
                <EmailOutlinedIcon />
                  <span>{isLoading?"":data.email}</span>
                </div>
              </div>
             { rIsLoading?"Loading...":userId === currentUser.id?
             (<button onClick={()=> setOpenUpdate(true)}>Update</button>):
             (<button onClick={handleFollow}>
              {relationshipData.includes(currentUser.id)?"Following":"Follow"}
             </button>)}
            </div>
            <div className="right">
              <EmailOutlinedIcon />
              <MoreVertIcon />
            </div>
          </div>
          <Posts userId={userId} />
        </div>
        {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  )
}

export default Profile