import { useEffect, useState } from 'react'
import './InfoMessage.scss'

function InfoMessage({content,status}) {
     const [isVisible,setIsVisible] = useState(false);

     useEffect(()=>{
        setIsVisible(true);
        
        const hideTimeOut = setTimeout(()=>{
            setIsVisible(false);
        },4000)

      return ()=> clearTimeout(hideTimeOut);
     },[content,status]);

     if(!content){
        return null;
     }

  return (
    <div className={`message-info ${status} ${isVisible ? '' : 'hide'}`}>
      <div className="content">{content}</div>
    </div>
  )
}

export default InfoMessage