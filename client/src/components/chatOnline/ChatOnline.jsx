import './chatOnline.scss'

function ChatOnline() {
  return (
    <div className='chatonline'>
        <div className="chat-online-friend">
            <div className="chat-online-img-container">
                <img src="https://images.pexels.com/photos/21050507/pexels-photo-21050507/free-photo-of-a-woman-with-an-umbrella-and-a-black-bag.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
                <div className="chat-online-badge"></div>
            </div>
            <span className="chat-online-name">John Doe</span>
        </div>
    </div>
  )
}

export default ChatOnline