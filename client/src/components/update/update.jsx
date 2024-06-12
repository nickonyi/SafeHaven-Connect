import { useState } from 'react'
import './update.scss'
import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query';
import { makeRequest } from '../../axios';

function Update({setOpenUpdate,user}) {
    
    const [coverPic,setCoverPic] = useState(null);
    const [profilePic,setProfilePic] = useState(null);

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
      
      
       coverURL = coverPic ?  await upload(coverPic): user.coverPic;
       profileURL = profilePic ? await upload(profilePic): user.profilePic;
    
      mutation.mutate({...texts,coverPic:coverURL,profilePic:profileURL})
      setOpenUpdate(false);
     
    }
  return (
    <div className='update'>
        <form>
            <input type="file" onChange={(e)=> setCoverPic(e.target.files[0])} />
            <input type="file" onChange={(e)=> setProfilePic(e.target.files[0])} />
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