import './Message.scss'

function Message({own}) {
  return (
    <div className={own?'message own':'message'}>
        <div className="message-top">
            <img src="https://images.pexels.com/photos/6457524/pexels-photo-6457524.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div className="message-bottom">1 hour ago</div>
    </div>
  )
}

export default Message