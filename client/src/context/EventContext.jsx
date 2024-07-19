import {  createContext } from "react"
import { makeRequest } from '../axios';
import { useState } from "react";
import InfoMessage from "../components/infoMessage/InfoMessage";


export const EventContext = createContext();

export const EventProvider = ({children})=> {
  const [message, setMessage] = useState({ content: "", status: "" });
  const apiUrl = import.meta.env.VITE_apiUrl;

  const createEvent = async({formData,token})=> {
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
    const values = {createEvent}
    return (
      <EventContext.Provider value={values}>
          {children}
          {message.content && <InfoMessage content={message.content} status={message.status} />}
      </EventContext.Provider>
    )
}

 
export default EventProvider