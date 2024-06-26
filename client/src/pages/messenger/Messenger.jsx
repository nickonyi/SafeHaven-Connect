import './messenger.scss'
import Conversation from '../../components/conversation/Conversation'
import Message from '../../components/message/Message'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import { useContext,useEffect,useRef,useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { makeRequest } from '../../axios';
import  {io} from 'socket.io-client';




function Messenger() {

    const {currentUser} = useContext(AuthContext);
    const userId = currentUser.id;
    const [conversations, setConversations] = useState([]); 
    const [currentChat,setCurrentChat] = useState(null);
    const [messages,setMessages] = useState([]); 
    const [newMessages,setNewMessages] = useState("");
    const [onlineUsers,setOnlineUsers] = useState([]);
    const [arrivalMessages,setArrivalMessages]= useState(null);
    const socket = useRef();
    const scrollRef = useRef();

    useEffect (()=> {
      socket.current = io("ws://localhost:8900");
      socket.current.on("getMessages",(data)=> {
        
        setArrivalMessages({
          sender:data.senderId,
          text:data.text,
          createdAt:Date.now()
        })
      })
    },[])

    useEffect(()=>{
     
      arrivalMessages && 
      currentChat?.members.includes((arrivalMessages.sender).toString()) &&
      setMessages((prev) => [...prev,arrivalMessages])
      
    },[arrivalMessages,currentChat])

    useEffect(()=>{
      socket.current.emit("addUser",userId);
     
      socket.current.on("getUsers",(users)=> {
       setOnlineUsers(users)
      })
   },[currentUser])
       
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
    
   useEffect(()=>{
     scrollRef.current?.scrollIntoView({behavior:"smooth"});
   
   },[messages])

    if(!messages){
      return "Loading..."
    }
    
    const handleSubmit = async (e)=> {
       e.preventDefault();
       const message = {
        sender:userId,
        text:newMessages,
        conversationId:currentChat._id
       }
       
       
       const receiverId = parseInt(currentChat.members.find((member)=> parseInt(member) !== userId));

       socket.current.emit("sendMessage",{
        senderId:userId,
        receiverId,
        text:newMessages
       }); 

       
      

       try {
        const res = await makeRequest.post('/messages',message);
        setMessages([...messages,res.data]);
        setNewMessages("");
        
       } catch (error) {
          console.log(error);
       }
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

                  <div key={m._id} ref={scrollRef}>
                    <Message message={m} own={m.sender == userId}/>
                  </div>
                )
                }
                
              </div>
              <div className="chat-box-bottom">
                <textarea 
                placeholder='write something...' 
                onChange={(e)=> setNewMessages(e.target.value)}
                value={newMessages}
                >

                </textarea>
                <button onClick={handleSubmit}>Send</button>
              </div>
              
              </>: <span>Open a conversation to start a chat!</span>}
            </div>
            
          </div>
          <div className="chat-online">
            <div className="chat-online-wrapper">
               <ChatOnline
               onlineUsers={onlineUsers}
               currentId= {userId}
               setCurrentChat = {setCurrentChat}
               />
            </div>
          </div>
        </div>
    </>
  
    
  )
}

export default Messenger