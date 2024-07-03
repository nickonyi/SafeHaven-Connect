import './EventNavBar.scss'
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';


function EventNavBar() {
  const [isNavVisible,setIsNavVisible] = useState(false);
  const [isDropDownVisible,setIsDropDownVisible] = useState(false);
     
    const handleToggleNav = ()=> {
           setIsNavVisible(!isNavVisible)
    }
  return (
    <div className="header">
        <div className="nav">
            <div>
            <Link to="/" style={{textDecoration:"none"}}>
              <span>SafeHaven Connect</span>
              </Link> 
              </div>
               <ul className={`${isNavVisible? 'nav-visible':''}`}>
               <Link className="a common-link-style" to="/Events/horizontal/"><li>Home</li></Link>
               <Link className="a common-link-style" to="/Events/horizontal/event"><li>Event</li></Link>
               <Link className="a common-link-style" to="/Events/vertical/createEvent"><li>Post an Event</li></Link>
                </ul> 

          <div className="menu">
            <MenuIcon  onClick = {handleToggleNav}/>
          </div>
            
        </div>
    </div>
  )
}

export default EventNavBar