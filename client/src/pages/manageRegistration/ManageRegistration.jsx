import NavigationMenu from '../../components/navigationMenu/NavigationMenu'
import './ManageRegistration.scss'
import { Card, Modal,Table } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {EventContext }from '../../context/EventContext';
import moment from 'moment';
import { AuthContext } from '../../context/AuthContext';


function ManageRegistration() {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [registrations, setRegistrations] = useState([]);
    const {getUserEvent} = useContext(EventContext);
    const {getUsersRegisteredForMyEvent} = useContext(AuthContext);

    useEffect(() => {
      fetchEvents();
    }, []);


    const fetchEvents = async () => {
      try {
        const response = await getUserEvent();
        setEvents(response.events);
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(() => {
      console.log(selectedEvent);
    }, []);

    const handleManageRegistrationsClick = async (eventId) => {
        setSelectedEvent(eventId);
        setIsLoading(true);
        try {
          const response = await getUsersRegisteredForMyEvent(eventId);
          setRegistrations(response);
        } catch (error) {
           console.log(error);
        }
        setIsLoading(false);
    }

  return (
    <div className='manage-registration'>
        <NavigationMenu />
        <div className="body">
          <div className="events-table shadow-lg">
           {events.length > 0 ? (
             events.map((event, index) => (
               <div key={index} className="event-row">
                 <div className="event-data">
                   <img src={event.image} alt={event.name} className="event-image" />
                   <div>
                     <h3 className="event-title">{event.name}</h3>
                     <p className="event-location">{event.location}</p>
                   </div>
                 </div>
                 <p className="event-date">{moment(event.date).format('MMMM D, YYYY')}</p>
                 <div className="event-action">
                   <button className="manage-registrations-button" onClick={() => handleManageRegistrationsClick(event._id)}>Manage Registrations</button>
                 </div>
           </div>
          ))
        ) : (
          <Card className='showmEventm'>
            <Card.Body>
              <Card.Img variant="top" src="/Personal files.gif" className='shownOdataimg' />
              <Card.Title>No events available for managing registrations</Card.Title>
              <Card.Text className='mb-3'>
                Create your first event now!
              </Card.Text>
              <Link to="/vertical/createEvent" className="btnShow">Create Event</Link>
            </Card.Body>
          </Card>
        )}
      </div>
      <Modal show={selectedEvent !== null} onHide={() => setSelectedEvent(null)}>
        <Modal.Header closeButton>
          <Modal.Title>User Registrated for This Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoading ? (
           <div className='d-flex justify-content-center align-items-center'>
             <div className="spinner-border text-danger" role="status">
            <span className="sr-only">Loading...</span>
          </div>
           </div>
          ) : (
            <div className="mt-4 ps-1 pe-1 pb-5 tab-body shadow-lg">
              {registrations && registrations.length > 0 ? (
                <>
                  <Table striped bordered hover className='shadow-lg tb'>
                    <thead>
                      <tr>
                        <th>User Name</th>
                        <th>Ticket Type</th>
                        <th>Status</th>
                        <th>Ticket Price</th>
                        <th>Number of Seats</th>
                        <th>Price Paid</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registrations.map((registration, index) => (
                        <tr key={index}>
                          <td>{registration.username}</td>
                          <td>{registration.ticketType}</td>
                          <td>{registration.status}</td>
                          <td>{registration.ticketPrice === 0 ? 'Free' : registration.ticketPrice}</td>
                          <td>{registration.numberOfSeats}</td>
                          <td>{registration.pricePaid}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </>
              ) : (
                <Card className='showmEventm'>
                  <Card.Body className='pb-5'>
                    <Card.Img variant="top" src="/No data-rafiki.png" className='shownOdataimg' />
                    <Card.Title>No registrations available</Card.Title>
                    <Card.Text className='mb-3'>
                      No users have registered for this event yet.
                    </Card.Text>
                  </Card.Body>
                </Card>
              )}
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
    </div>
  )
}

export default ManageRegistration