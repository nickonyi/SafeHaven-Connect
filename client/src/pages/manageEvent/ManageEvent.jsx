import NavigationMenu from '../../components/navigationMenu/NavigationMenu'
import './ManageEvent.scss'
import { Card, Modal,Spinner } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { EventContext } from '../../context/EventContext';
import moment from 'moment';


function ManageEvent() {
 const [events, setEvents] = useState([]);
 const [loading,setLoading] = useState(true);
 const [selectedEvent, setSelectedEvent] = useState(null);
 const [selectedTicket, setSelectedTicket] = useState(null);
 const {getUserEvent,event} = useContext(EventContext);

 
 useEffect(()=>{
    fetchEvents();
 },[])

const fetchEvents = async () => {
    try {
        setLoading(true);
        await getUserEvent();
        const fetchedEvents = event || [];
        setEvents(fetchedEvents);
        setLoading(false);

        
    } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false);  
    }
}
  

    if (!event || event.length === 0) {
        return (
            <div className='manage-event'>
               <NavigationMenu />
               <Card className='showmEventm'>
                   <Card.Body>
                       <Card.Img variant="top" src="/Personal files.gif" className='shownOdataimg' />
                       <Card.Title>No event to manage </Card.Title>
                       <Card.Text className='mb-3'>
                           Create your first event now!
                       </Card.Text>
                       <Link to="/vertical/createEvent" className="btnShow">Create Event</Link>
                   </Card.Body>
               </Card>
             </div>  
        );
    }

  return (
    <div className='manage-event'>
       <NavigationMenu />
       <div className="body">
            {loading && (
                <div className="spinner-overlay">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            )}
            <div className="manage-events-page shadow-lg">
                <h1>Manage Events</h1>
                {events.map((eventItem, index) => (
                    <div key={index} className="manage-event-card">
                        <div className="manage-event-details">
                            <img src={eventItem.image} alt={eventItem.name} className="manage-event-image" />
                            <div className="manage-event-info">
                                <div className="manage-event-title">{eventItem.name}</div>
                                <div className="manage-event-location">{eventItem.location}</div>
                                <div className="manage-event-date-description">
                                    <p className="manage-event-date">{moment(eventItem.date).format('YYYY-MM-DD')}</p>
                                    <p className="manage-event-description">{eventItem.description.substring(0, 150)}...</p>
                                </div>
                                <div className="manage-event-actions">
                                    <button className="manage-update-button" onClick={() => handleUpdateEvent(eventItem)}>Update</button>
                                    <button className="manage-delete-button" onClick={() => handleDeleteEvent(eventItem._id)}>Delete</button>
                                    <button className="manage-show-ticket-button" onClick={() => handleToggleTicketVisibility(eventItem._id)}>
                                        {eventItem.showTickets ? 'Hide Tickets' : 'Show Tickets'}
                                    </button>
                                </div>
                            </div>
                        </div>
                        {eventItem.showTickets && (
                            <div className="manage-ticket-section flex-display">
                                {Ticket && Ticket.length > 0 && Ticket.filter(ticket => ticket.eventId === eventItem._id).map((ticket, ticketIndex) => (
                                    <div key={ticketIndex}>
                                        <Card className="manage-ticket-card">
                                            <div className="boder">
                                                <h1>{ticket.type}</h1>
                                            </div>
                                            <Card.Body>
                                                <Card.Img src="/price_icon.png" className='ticketImg' />
                                                {ticket.price === 0 ? (
                                                    <Card.Text>Free</Card.Text>
                                                ) : (
                                                    <Card.Text>₦{ticket.price}</Card.Text>
                                                )}
                                                <Card.Text>{`${ticket.sit} Tickets`}</Card.Text>
                                                <div className="d-flex align-items-center justify-content-center gap-3">
                                                    <button className="manage-update-ticket-button" onClick={() => handleOpenTicketUpdateModal(ticket)}>Update</button>
                                                    <button className="manage-delete-ticket-button" onClick={() => handleDeleteTicket(ticket)}>Delete</button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                ))}
                                {Ticket.filter(ticket => ticket.eventId === eventItem._id).length === 0 && (
                                    <p>No tickets available for this event.</p>
                                )}
                            </div>
                        )}
                    </div>
                ))}
                {selectedEvent && (
                    <UpdateEventModal
                        eventDetails={selectedEvent}
                        handleClose={handleCloseModal}
                    />
                )}
                {selectedTicket && (
                    <TicketUpdateModal
                        ticket
                        ={selectedTicket}
                        onClose={handleCloseTicketUpdateModal}
                        fetchTickets={fetchTicketsForEvent}
                    />
                )}
            </div>
        </div>
        
    </div>
  )
}

export default ManageEvent