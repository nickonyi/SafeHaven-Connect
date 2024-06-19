import './messenger.scss'
import Conversation from '../../components/conversation/Conversation'



function Messenger() {

    
  return (
    <>
        <div className='messenger'>
          <div className="chat-menu">
            <div className="chat-menu-wrapper">
              <input placeholder='search for friends' type="text" className="chat-menu-input" />
              <Conversation />
            </div>
          </div>
          <div className="chat-box">
            <div className="chat-box-wrapper">
              box
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