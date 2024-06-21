import './Message.scss'
import moment from 'moment'

function Message({message,own}) {
  return (
    <div className={own?'message own':'message'}>
        <div className="message-top">
            <img src="https://images.pexels.com/photos/6457524/pexels-photo-6457524.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
            <p>{message.text}</p>
        </div>
        <div className="message-bottom">{moment(message.createdAt).fromNow()}</div>
    </div>
  )
}

export default Message