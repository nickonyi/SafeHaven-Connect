import { useContext, useEffect, useState } from 'react'
import './EventDetailsPage.scss'
import Static from '../../components/static/Static';
import { EventContext } from '../../context/EventContext';
import { useParams } from 'react-router-dom';


function EventDetailsPage() {
   const [eventDetails, setEventDetails] = useState(null);
   const {getSingle,eventTicket,Ticket} = useContext(EventContext);
   const {eventId} = useParams();

   useEffect(() => {
    handleGetSingleEvent();
   }, [eventId]);

   useEffect(() => {
    console.log(eventDetails);
  }, [eventDetails]);

   const handleGetSingleEvent = async () => {
    try {
       const event = await getSingle(eventId);
       setEventDetails(event);
        
    } catch (error) {
        console.log('Error getting event details:', error);
    }
   }

  return (
    <div>
        {
            eventDetails?
            <div>
             <Static title={eventDetails.name} title2={eventDetails.name} />
             <div className="detailsevent">
               <div className="eventdatailpimg shadow-md">
                <img src={eventDetails.image} alt="" />
               </div>
             </div>
            </div> 
             :
              (
                <div className="d-flex justify-content-center align-items-center" style={{ paddingTop: '150px', paddingBottom: '50px' }}>
                  <div className="spinner-border text-danger" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )
        }
    </div>
  )
}

export default EventDetailsPage