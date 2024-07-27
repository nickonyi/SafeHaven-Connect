import { useContext, useEffect, useState } from 'react'
import './EventDetailsPage.scss'
import Static from '../../components/static/Static';
import { EventContext } from '../../context/EventContext';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';


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

   const formatDate = (dateString) => {
    const options = { month: 'short', day: '2-digit', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
   }



  return (
    <div className='event-detales'>
        {
            eventDetails?
            <div>
             <Static title={eventDetails.name} title2={eventDetails.name} />
             <div className="detailsevent">
               <div className="eventdatailpimg shadow-md">
                <img src={eventDetails.image} alt="" />
                <div>
                    {
                        eventDetails.description
                    }
                </div>
               </div>
               <div className="locationandmap shadow-md">
                <div className="locationandmaptop">
                  <div className="locationandmaptilte">
                    <h3>EVENT DETAIL</h3>
                    <FontAwesomeIcon icon={faInfoCircle} className="event-detail-icon" />
                  </div>
                  <div className="locationandmapflex">
                    <h4>Date:</h4>
                    <p>{formatDate(eventDetails.date)}</p>
                  </div>
                  <div className="locationandmapflex">
                  <h4>Venue:</h4>
                  <p>{eventDetails.venue}</p>
                  </div>
                  <div className="locationandmapflex">
                    <h4>Location:</h4>
                    <p>{eventDetails.location}</p>
                  </div>
               </div>
              </div>   
             </div>

            <div className="ticketdisplay">
              <h4 className='ticketdisplayh4'>TICKET&PRICE</h4>
              <div className="ticketshow">
              {Ticket && Ticket.length > 0 ? 
              (
                <div className="ticketshow">
                  {Ticket.map((ticket) => (
                    <div className="ticketbody" key={ticket._id}>
                      <button className="ticketbodybtn">{ticket.type}</button>
                      <img src="/price_icon.png" alt="" className="ticketbodyImg" />
                      <h4 className="ticketbodyh4">{ticket.price === 0 ? "Free" : `₦${ticket.price}`}</h4>
                      <p className="ticketbodyp">{ticket.sit} Tickets</p>
                      <button
                        className="registerforevent"
                        onClick={() => handleRegisterForEvent(ticket._id, ticket.type)}
                      >
                        REGISTER EVENT
                      </button>
                    </div>
                  ))}
                </div>
              ):
              ( <p>No tickets available</p>)
              }
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