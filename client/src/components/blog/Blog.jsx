import './Blog.scss'
import {Link} from "react-router-dom";
import moment from 'moment';
 
const Blog = ({_id,title,summary,cover,img,createdAt,author})=> {

  return (
    <div className="blog">
      <div className="image">
        <Link to={`/Resources/article/${_id}`}>
          <img src={'/uploads/'+ img} alt=""/>
        </Link>
      </div>
      <div className="texts">
        <Link to={`/Resources/article/${_id}`}>
        <h2>{title}</h2>
        </Link>
        <p className="info">
          <a className="author">{author}</a>
          <div className='time'>{moment(new Date(createdAt)).format('MMMM Do YYYY')}</div>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}


export default Blog