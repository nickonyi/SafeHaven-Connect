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


function NavBar() {
const {toggle,darkMode} = useContext(DarkModeContext);

  return (
    <div className='navbar'>
        <div className="left">
            <Link to="/Home" style={{textDecoration:"none"}}>
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
            <img src="https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" />
            <span>John Wafula</span>
          </div>
        </div>
    </div>
  )
}

export default NavBar