import './CreateEvent.scss'
import { AuthContext } from "../../context/AuthContext";
import { useContext } from 'react';

function CreateEvent() {
  const {currentUser} = useContext(AuthContext);
  
  return (
    <div>
      { currentUser && <div>CreateEvent</div>}
    </div>
  )
}

export default CreateEvent