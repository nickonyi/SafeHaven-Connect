import './messenger.scss'
import Conversation from '../../components/conversation/Conversation'
import Message from '../../components/message/Message'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import { useContext,useEffect,useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { makeRequest } from '../../axios';




function Messenger() {

    const {currentUser} = useContext(AuthContext);
    const userId = currentUser.id;
    const [conversations, setConversations] = useState([]);  
    
    
    console.log(userId);
    useEffect(() => {
      const fetchData = async () => {
        const res = await makeRequest.get('/conversations/' + userId);
        setConversations(res.data);
      };
      fetchData();
    }, [userId]);
    
    console.log(conversations);
  
  return (
    <>
        <div className='messenger'>
          <div className="chat-menu">
            <div className="chat-menu-wrapper">
              <input placeholder='search for friends' type="text" className="chat-menu-input" />
              {conversations.map((c) => (
                   <Conversation conversation ={c} currentUser ={currentUser}  />
              ))}
              
              
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
               <ChatOnline/>
               <ChatOnline/>
               <ChatOnline/>
               <ChatOnline/>
            </div>
          </div>
        </div>
    </>
  
    
  )
}

export default Messenger