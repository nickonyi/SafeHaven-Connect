import {  createContext } from "react"
import { makeRequest } from '../axios';
import { useState } from "react";


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
      return response.data.message;
   } catch (error) {
      const errorMessage = error.response?.data?.message;
      setMessage({content:errorMessage,status:'fail'});
   }   
  }
    const values = {createEvent}
    return (
      <EventContext.Provider value={values}>
          {children}
      </EventContext.Provider>
    )
}

 
export default EventProvider