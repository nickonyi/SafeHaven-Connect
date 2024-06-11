import { useState } from 'react'
import './update.scss'
import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query';
import { makeRequest } from '../../axios';

function Update({setOpenUpdate,user}) {
    
    const [coverPic,setCoverPic] = useState(user.coverPic);
    const [profilePic,setProfilePic] = useState(user.profilePic);

    const [texts,setTexts] = useState({
        username:'',
        city:'',
        email:''
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
    console.log(user);

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
      
      console.log(coverURL,profileURL);
       coverURL = coverPic && await upload(coverPic);
       profileURL = profilePic && await upload(profilePic);
       console.log(coverURL,profileURL);
      mutation.mutate({...texts,coverPic:coverURL,profilePic:profileURL})
      setOpenUpdate(false);
     
    }
  return (
    <div className='update'>
        <form>
            <input type="file" />
            <input type="file" />
            <input type="text" name="username" onChange={handleChange}  />
            <input type="text" name="city" onChange={handleChange}  />
            <input type="text" name="email" onChange={handleChange}  />
            <button onClick={handleSubmit}>Update</button>
        </form>
       <button onClick={()=> setOpenUpdate(false)}>x</button>
    </div>
  )
}

export default Update