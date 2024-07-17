import {  createContext } from "react"



export const EventContext = createContext();

export const EventProvider = ({children})=> {

  const createEvent = async({formData,token})=> {
      console.log(formData);
      console.log(JSON.parse(token));
  }
    const values = {createEvent}
    return (
      <EventContext.Provider value={values}>
          {children}
      </EventContext.Provider>
    )
}

 
export default EventProvider