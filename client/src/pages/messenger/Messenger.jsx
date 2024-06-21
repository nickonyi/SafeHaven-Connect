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
    const [currentChat,setCurrentChat] = useState(null);
    const [messages,setMessages] = useState([]); 
    
    console.log(userId);
   
    useEffect(() => {
      const fetchData = async () => {
        const res = await makeRequest.get('/conversations/' + userId);
        setConversations(res.data);
      };
      fetchData();
    }, [userId]);

    useEffect(()=>{
      const getMessages = async ()=> {
        try {
          const res = await makeRequest.get('/messages/' + currentChat._id);
          setMessages(res.data)
        } catch (error) {
          console.log(error);
        }
      }

      getMessages();
    },[currentChat])
    
    console.log(messages);

    if(!messages){
      return "Loading..."
    }
    
  
  return (
    <>
        <div className='messenger'>
          <div className="chat-menu">
            <div className="chat-menu-wrapper">
              <input placeholder='search for friends' type="text" className="chat-menu-input" />
              {conversations.map((c) => (
                    <div key={c._id} onClick={()=> setCurrentChat(c)}>
                   <Conversation conversation ={c} currentUser ={currentUser}  />
                   </div>
              ))}  
            </div>
          </div>
          <div className="chat-box">
            <div className="chat-box-wrapper">
              {currentChat ? 
              <>
              <div className="chat-box-top">
                {
                messages.map((m)=>

                  <div key={m._id}>
                    <Message message={m} own={m.sender == userId}/>
                  </div>
                )
                }
                
              </div>
              <div className="chat-box-bottom">
                <textarea placeholder='write something...'></textarea>
                <button>Send</button>
              </div>
              
              </>: <span>Open a conversation to start a chat!</span>}
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