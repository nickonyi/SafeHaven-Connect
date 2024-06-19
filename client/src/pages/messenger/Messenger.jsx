import './messenger.scss'
import Conversation from '../../components/conversation/Conversation'
import Message from '../../components/message/Message'



function Messenger() {

    
  return (
    <>
        <div className='messenger'>
          <div className="chat-menu">
            <div className="chat-menu-wrapper">
              <input placeholder='search for friends' type="text" className="chat-menu-input" />
              <Conversation />
              <Conversation />
              <Conversation />
              <Conversation />
            </div>
          </div>
          <div className="chat-box">
            <div className="chat-box-wrapper">
              <div className="chat-box-top">
                <Message/>
                <Message own={true}/>
                <Message/>
                <Message/><Message/><Message/><Message/><Message/><Message/><Message/><Message/><Message/><Message/><Message/>
              </div>
              <div className="chat-box-bottom">
                <textarea placeholder='write something...'></textarea>
                <button>Send</button>
              </div>
            </div>
          </div>
          <div className="chat-online">
            <div className="chat-online-wrapper">
              online
            </div>
          </div>
        </div>
    </>
    
  )
}

export default Messenger