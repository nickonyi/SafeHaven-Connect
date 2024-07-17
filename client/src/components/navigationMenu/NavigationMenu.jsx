import './NavigationMenu.scss'
import { Link } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import ElevatorOutlinedIcon from '@mui/icons-material/ElevatorOutlined';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function NavigationMenu() {
  return (
    <div className='nav'>
       <ul>
        <p>Main</p>
        <Link className='a' to="/Events/vertical/postEvent">
          <li> <AddIcon className='icon' /> Post an Event</li>
        </Link>
        <Link className='a' to="/Events/vertical/createTicket">
          <li><ListIcon/>Create Ticket</li>
        </Link>
        <Link className='a' to="/Events/vertical/manageEvent">
          <li><ElevatorOutlinedIcon /> Manage Event</li>
        </Link>
        <Link className='a' to="/Events/vertical/manageregistration">
          <li><AppRegistrationIcon/>Manage Registration</li>
        </Link>
        <Link className='a' to="/Events/vertical/transaction">
          <li><AppRegistrationIcon/>Transaction</li>
        </Link>
        <Link className='a' to="/Events/vertical/joinevent">
          <li><AspectRatioIcon/>Joined Event</li>
        </Link>
      </ul>
      <ul>
        <p>Account</p>
        <Link className='a' to="/vertical/editprofile">
          <li><PersonIcon/>Edit Profile</li>
        </Link>
        <Link className='a' to={"/"}> 
          <li><ExitToAppIcon />Logout</li>
        </Link>
      </ul>
    </div>
  )
}

export default NavigationMenu