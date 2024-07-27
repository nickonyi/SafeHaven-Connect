import { useContext, useEffect, useState } from 'react'
import './EventDetailsPage.scss'
import Static from '../../components/static/Static';
import { EventContext } from '../../context/EventContext';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, Form } from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';
import { AuthContext } from '../../context/AuthContext';


function EventDetailsPage() {
    const [eventDetails, setEventDetails] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedTicketId, setSelectedTicketId] = useState(null);
    const [selectedTicketType, setSelectedTicketType] = useState(null);
    const [email, setEmail] = useState('');
    const [numberOfSeats, setNumberOfSeats] = useState(1);
    const [loading, setLoading] = useState(false);
    const {getSingle,eventTicket,Ticket} = useContext(EventContext);
    const {eventId} = useParams();
    const {currentUser} = useContext(AuthContext);
    const {registerForevent} = useContext(AuthContext);

   useEffect(() => {
    handleGetSingleEvent();
    fetchTicketsForEvent(eventId);
   }, [eventId]);

 

   const handleGetSingleEvent = async () => {
    try {
       const event = await getSingle(eventId);
       setEventDetails(event);
        
    } catch (error) {
        console.log('Error getting event details:', error);
    }
   }

   const fetchTicketsForEvent = async (eventId) => {
    try {
      const ticketsData = await eventTicket(eventId);
    } catch (error) {
      console.error('Error fetching tickets for event:', error);
    }
  };

   const formatDate = (dateString) => {
    const options = { month: 'short', day: '2-digit', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
   }

   const handleRegisterForEvent = async (ticketId, ticketType) => {
            setShowModal(true);
            setSelectedTicketId(ticketId);
            setSelectedTicketType(ticketType);
   }


   const handleSubmit = async (e) => {
       e.preventDefault();
       setLoading(true);

         const formData = {
            email,
            numberOfSeats,
            ticketId: selectedTicketId,
            eventId,
            userId: currentUser.id,
            ticketType: selectedTicketType
         }


         const regisrationResponse = await registerForevent(formData);
         console.log(regisrationResponse);
         setLoading(false);

         window.location.href = '/Events/vertical/joinevent';

   }
   const handleClose = () => {
    setShowModal(false);
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

<Modal show={showModal} className='registermodal' onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>Register for Event</Modal.Title>
          <CloseIcon className='btn-close' onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label
              >Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="numberOfSeats">
              <Form.Label>Number of Seats</Form.Label>
              <Form.Control type="number" min="1" value={numberOfSeats} onChange={(e) => setNumberOfSeats(e.target.value)} required />
            </Form.Group>
            <Button className='register' type="submit" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default EventDetailsPage