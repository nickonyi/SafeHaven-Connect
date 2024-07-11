import './PostEvent.scss'
import { AuthContext } from "../../context/AuthContext";
import { useContext } from 'react';
import NavigationMenu from '../../components/navigationMenu/NavigationMenu';

function CreateEvent() {
  const {currentUser} = useContext(AuthContext);
  
  return (
    <div>
      <NavigationMenu />
    </div>
  )
}

export default CreateEvent