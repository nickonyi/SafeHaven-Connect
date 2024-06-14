import { useState,useContext } from 'react'
import './update.scss'
import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { AuthContext } from '../../context/AuthContext';


function Update({setOpenUpdate,user}) {
    
    const [cover,setCover] = useState(null);
    const [profile,setProfile] = useState(null);

   

const {currentUser } = useContext(AuthContext);

const userId = currentUser.id;

const {isLoading, error, data}= useQuery({
  queryKey: ['user'],
  queryFn: () =>
    makeRequest.get('/users/find/' + userId).then((res) => {
      return res.data
    })
}
)

const [texts,setTexts] = useState({
  username:data.username,
  city:data.city,
  email:data.email
})

    const upload = async(file) => {
        try {
          const formData = new FormData();
          formData.append('file',file);
          const res = await makeRequest.post('/upload',formData);
          return res.data;
          
        } catch (error) {
          console.log(error);
        }
      }

    const handleChange = (e) => {
        setTexts({...texts,[e.target.name]:e.target.value});
    }
     

  
    const queryClient = useQueryClient();
    

    const mutation = useMutation({
      mutationFn: (user)=> {
        return makeRequest.put('/users',user)
      
      },
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['user'] })
      },
    })
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      let coverURL = user.coverPic;
      let profileURL = user.profilePic;
      
      
       coverURL = cover ?  await upload(cover): user.coverPic;
       profileURL = profile ? await upload(profile): user.profilePic;
      
      mutation.mutate({...texts,coverPic:coverURL,profilePic:profileURL})
      setOpenUpdate(false);
     
    }
  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        <form>
          <div className="files">
            <label htmlFor="cover">
              <span>Cover Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    cover
                      ? URL.createObjectURL(cover)
                      : "/upload/" + user.coverPic
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="cover"
              style={{ display: "none" }}
              onChange={(e) => setCover(e.target.files[0])}
            />
            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    profile
                      ? URL.createObjectURL(profile)
                      : "/upload/" + user.profilePic
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="profile"
              style={{ display: "none" }}
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </div>
          <label>Email</label>
          <input
            type="text"
            value={texts.email}
            name="email"
            onChange={handleChange}
            id='emailElement'
          />
          <label>username</label>
          <input
            type="text"
            value={texts.name}
            name="username"
            id='usernameElement'
            onChange={handleChange}
          />
          <label>Country / City</label>
          <input
            type="text"
            name="city"
            id='cityElement'
            value={texts.city}
            onChange={handleChange}
          />
          <button onClick={handleSubmit}>Update</button>
        </form>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          close
        </button>
      </div>
    </div>
  )
}

export default Update