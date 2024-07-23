import {  createContext } from "react"
import { makeRequest } from '../axios';
import { useState } from "react";
import InfoMessage from "../components/infoMessage/InfoMessage";


export const EventContext = createContext();

export const EventProvider = ({children})=> {
  const [message, setMessage] = useState({ content: "", status: "" });
  const [event, setEvent] = useState();
  const apiUrl = import.meta.env.VITE_apiUrl;

  const createEvent = async({formData})=> {
   try {
      const response = await makeRequest.post(`${apiUrl}/event/createEvent`,formData,{
        headers: {
         'Content-Type': 'multipart/form-data',
      }
      });
      setMessage({ content: response.data.message, status: response.data.status });
   } catch (error) {
      const errorMessage = error.response?.data?.message;
      setMessage({content:errorMessage,status:'fail'});
   }   
  }

  const getUserEvent = async () => {
       try {
          const response = await makeRequest.get(`${apiUrl}/users/my-events`, {
                headers: {
                    'Content-Type': 'application/json',
                }
       });
              
       setEvent(response.data.events);
       
       return response.data;
       } catch (error) {
        const errorMessage = error.response?.data?.message;
        setMessage({content:errorMessage,status:'fail'});
        
       }
  }
  
  
    
    const values = {createEvent,getUserEvent,event}
    return (
      <EventContext.Provider value={values}>
          {children}
          {message.content && <InfoMessage content={message.content} status={message.status} />}
      </EventContext.Provider>
    )
}

 
export default EventProvider