import './Static.scss'
import { Link } from 'react-router-dom';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

function Static({title,title2}) {
  return (
    <div className='container-style'>
        <h1 className="title-style">{title}</h1>
        <ul>
            <Link className='a' to={'/Events'}><li>Home</li></Link>
            <li>
                <KeyboardArrowRightIcon />
            </li>
            <li>{title2}</li>
        </ul>
    </div>
  )
}

export default Static