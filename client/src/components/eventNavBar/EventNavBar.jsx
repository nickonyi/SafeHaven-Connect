import './EventNavBar.scss'
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';


function EventNavBar() {
    const handleToggleNav = ()=> {
           alert('hello')
    }
  return (
    <div className="header">
        <div className="nav">
            <div>
            <Link to="/" style={{textDecoration:"none"}}>
              <span>SafeHaven Connect</span>
              </Link> 
              </div>
               <ul>
               <Link className="a common-link-style" to="/Events/horizontal/"><li>Home</li></Link>
               <Link className="a common-link-style" to="/Events/horizontal/event"><li>Event</li></Link>
               <Link className="a common-link-style" to="/Events/vertical/createEvent"><li>Post an Event</li></Link>
                </ul> 

          <div className="menu">
            <MenuIcon onClick = {handleToggleNav}/>
          </div>
            
        </div>
    </div>
  )
}

export default EventNavBar