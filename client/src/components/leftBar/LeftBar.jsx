import './leftBar.scss'
import Friends from "../../assets/1.png";
import Groups from "../../assets/2.png";
import Market from "../../assets/3.png";
import Watch from "../../assets/4.png";
import Memories from "../../assets/5.png";
import Events from "../../assets/6.png";
import Gaming from "../../assets/7.png";
import Gallery from "../../assets/8.png";
import Videos from "../../assets/9.png";
import Messages from "../../assets/10.png";
import Tutorials from "../../assets/11.png";
import Courses from "../../assets/12.png";
import Fund from "../../assets/13.png";
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import {useQuery} from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { Link } from 'react-router-dom';



function LeftBar() {
const {currentUser } = useContext(AuthContext);

const userId = currentUser.id;

const {isLoading, error, data}= useQuery({
  queryKey: ['user'],
  queryFn: () =>
    makeRequest.get('/users/find/' + userId).then((res) => {
      return res.data
    })
}
)


  return (
    <div className='leftbar'>
      <div className="container">
        <div className="menu">
          <div className="user">
           <img src={isLoading?"":"/uploads/" + data.profilePic} alt="" />
            <span>{isLoading?"":data.username}</span>
          </div>
          <Link to={`/messenger`} style={{textDecoration:'none',color:'inherit'}}>
          <div className="item">
            <img src={Messages} alt="" />
            <span>Messages</span>
          </div>
          </Link>
          <Link to={`/Events`} style={{textDecoration:'none',color:'inherit'}}>
          <div className="item">
            <img src={Events} alt="" />
            <span>Events</span>
          </div>
          </Link>
          <Link to={`/Resources`} style={{textDecoration:'none',color:'inherit'}}>
          <div className="item">
            <img src={Courses} alt="" />
            <span>Resources</span>
          </div>
          </Link>
          <div className="item">
            <img src={Memories} alt="" />
            <span>Memories</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Your shortcuts</span>
          <div className="item">
            <img src={Gaming} alt="" />
            <span>Gaming</span>
          </div>
          <div className="item">
            <img src={Gallery} alt="" />
            <span>Gallery</span>
          </div>
          <div className="item">
            <img src={Videos} alt="" />
            <span>Videos</span>
          </div>
        </div>
        <hr />
        <span>Others</span>
        <div className="menu">
        <div className="item">
            <img src={Tutorials} alt="" />
            <span>Tutorials</span>
          </div>
          <div className="item">
            <img src={Courses} alt="" />
            <span>Courses</span>
          </div>
          <div className="item">
            <img src={Fund} alt="" />
            <span>Funds</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftBar