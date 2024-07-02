import './EventNavBar.scss'
import { Link, useLocation } from 'react-router-dom';

function EventNavBar() {
  return (
    <div className="header">
        <div className="nav">
            <div>
            <Link to="/" style={{textDecoration:"none"}}>
              <span>SafeHaven Connect</span>
              </Link> 
               <ul>
               <Link className="s" to="/Events/horizontal/"><li>HOME</li></Link>
               <Link className="s" to="/Events/horizontal/event"><li>EVENT</li></Link>
                </ul> 
            </div>
        </div>
    </div>
  )
}

export default EventNavBar