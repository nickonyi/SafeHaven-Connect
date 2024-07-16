import './PostEvent.scss'
import { AuthContext } from "../../context/AuthContext";
import { useContext } from 'react';
import NavigationMenu from '../../components/navigationMenu/NavigationMenu';

function PostEvent() {
  const {currentUser} = useContext(AuthContext);

  const handleSubmit = ()=> {

  }

  const formData = {
    category:"",
  }

  const handleChange = ()=> {

  }

  const handleFileChange = ()=> {}
  
  return (
    <div className='vertical'>
      <NavigationMenu />
      <div className='body'>
      <form className="event shadow-lg" onSubmit={handleSubmit}>
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
          <span>Post an event</span>
        </button>
      </form>
    </div>
    </div>
  )
}

export default PostEvent