import {  createContext } from "react"



export const EventContext = createContext();

export const EventProvider = ({children})=> {
    const values = {}
    return (
      <EventContext.Provider values={values}>
          {children}
      </EventContext.Provider>
    )
}

 
export default EventProvider