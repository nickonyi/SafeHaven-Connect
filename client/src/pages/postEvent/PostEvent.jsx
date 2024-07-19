import './PostEvent.scss'
import { AuthContext } from "../../context/AuthContext";
import { useContext } from 'react';
import NavigationMenu from '../../components/navigationMenu/NavigationMenu';
import { useState } from 'react';
import InfoMessage from '../../components/infoMessage/InfoMessage';
import { EventContext } from '../../context/EventContext';
import Loading from '../../components/loading/Loading';


function PostEvent() {
  const {currentUser} = useContext(AuthContext);
  const {createEvent} = useContext(EventContext);
  const [message, setMessage] = useState({ content: '', status: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    date: '',
    venue: '',
    image: null,
    description: '',
  });  

  

  const handleChange = (e)=> {
     const {name,value}=e.target
     setFormData ((prev)=> ({
      ...prev,
      [name]:value
     }))
  }

  const handleFileChange = (e)=> {
    const imageFile = e.target.files[0];
    setFormData((prev)=> ({
      ...prev,
      image:imageFile
    }))
  }

  const validateForm = ()=> {
    const areAllFieldsfilled = Object.values(formData).every((value)=> {
       if(typeof value === 'string') return value.trim() !== '';
       return value !== null;
    })

    if(!areAllFieldsfilled){
      setMessage({ content: 'Please fill in all fields.', status: 'fail' });
    }

    return areAllFieldsfilled;
  }

  const handleSubmit = async (e)=> {
     e.preventDefault();

     if(!validateForm()){
      return;
     }
   
     setIsLoading(true);
     await createEvent({formData});
     setIsLoading(false);

     setFormData({
      name: '',
      category: '',
      location: '',
      date: '',
      venue: '',
      image: null,
      description: '',
    });
  }
  
  return (
    <div className='vertical'>
      <NavigationMenu />
      <div className='body'>
      <form className="event shadow-lg" onSubmit={handleSubmit} encType="multipart/form-data">
        <h1>Post an event</h1>
        <div className="flex">
          <div className="formGroup">
            <label htmlFor="name">Event Name</label>
            <input type="text" id="name" placeholder='Event Name' name="name" value={formData.name} onChange={handleChange} />
          </div>
        </div>
        <div className="flex">
          <div className="formGroup">
            <label htmlFor="location">Location</label>
            <input type="text" id="location" name="location" placeholder='Location' value={formData.location} onChange={handleChange} />
          </div>
          <div className="formGroup">
            <label htmlFor="date">Date</label>
            <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} />
          </div>
        </div>
        <div className="flex">
          <div className="formGroup">
            <label htmlFor="venue">Venue</label>
            <input type="text" id="venue" name="venue" placeholder='Venue' value={formData.venue} onChange={handleChange} />
          </div>
          <div className="formGroup">
            <label htmlFor="image">Image</label>
            <input type="file" id="image" name="image" accept="image/*" onChange={handleFileChange} />
          </div>
        </div>
        <div className="formGroup">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" placeholder='Description' rows="4" value={formData.description} onChange={handleChange}></textarea>
        </div>
        <button className="gap-2 d-flex align-items-center" type="submit">
        {isLoading ? (
            <Loading />
          ) : (
            <span>Post an event</span>
          )}
        </button>
      </form>
      {message.content && <InfoMessage content={message.content} status={message.status} />}
    </div>
    </div>
  )
}

export default PostEvent