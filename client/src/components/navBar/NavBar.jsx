import './navBar.scss'
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { DarkModeContext } from '../../context/DarkModeContext';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';


function NavBar() {
const {toggle,darkMode} = useContext(DarkModeContext);
const {currentUser,login} = useContext(AuthContext);

  return (
    <div className='navbar'>
        <div className="left">
            <Link to="/" style={{textDecoration:"none"}}>
              <span>SafeHaven Connect</span>
              </Link>  
              <HomeOutlinedIcon/>
              {darkMode?<WbSunnyOutlinedIcon onClick ={toggle}/>:<DarkModeOutlinedIcon onClick ={toggle}/>}
              <GridViewOutlinedIcon/>
              <div className="search">
                <SearchOutlinedIcon />
                <input type="text" placeholder='search...' />
              </div>
             
        </div>
        <div className="right">
          <PersonOutlinedIcon />
          <EmailOutlinedIcon />
          <NotificationsOutlinedIcon />
          <div className="user">
            <img src={currentUser.profilePic} />
            <span>{currentUser.username}</span>
          </div>
        </div>
    </div>
  )
}

export default NavBar