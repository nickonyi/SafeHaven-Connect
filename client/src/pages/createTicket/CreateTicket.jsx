import './CreateTicket.scss'
import NavigationMenu from '../../components/navigationMenu/NavigationMenu'
import { EventContext } from '../../context/EventContext';
import { Card, Modal } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { AuthContext } from '../../context/AuthContext'

function CreateTicket() {

    const [ticketType, setTicketType] = useState('Regular');
    const [sit, setSit] = useState('');
    const [price, setPrice] = useState(0);
    const [paymentOption, setPaymentOption] = useState('Free');
    const [showModal, setShowModal] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const {getUserEvent, event,createTicket} = useContext(EventContext);
    const {currentUser} = useContext(AuthContext);

    const userId = currentUser.id;

    useEffect(()=>{
      handleGetUserEvent();
    },[])

    const handleGetUserEvent = async ()=> {
       await getUserEvent();
    }
    const handleSubmit= async (e)=> {
       e.preventDefault();

       const formData = {
        eventId: selectedEventId,
        userId: userId,
        type: ticketType,
        price:0,
        sit:sit
      };

      setIsLoading(true);
      await createTicket(formData);
      setIsLoading(false);

      setTicketType('Regular');
      setPaymentOption('Free');
      setPrice(0);
      setSit('');

      setShowModal(false);
    }

    const handleAddTicketClick = (eventId)=> {
      setSelectedEventId(eventId);
      setShowModal(true);
    }

    const handleClose = ()=> {
      setShowModal(false);
  }

    if (!event || event.length === 0) {
        return (
            <div className='create-ticket'>
              <NavigationMenu />
              <Card className='showmEventm'>
                  <Card.Body>
                    <Card.Img variant="top" src="/Personal files.gif" className='shownOdataimg' />
                    <Card.Title>No event to add ticket</Card.Title>
                    <Card.Text className='mb-3'>
                      Create your first event now!
                    </Card.Text>
                    <Link to="/Events/vertical/PostEvent" className="btnShow">Create Event</Link>
                  </Card.Body>
                </Card>
            </div>
          
        );
      }
    
  return (
    <div className='create-ticket'>
        <NavigationMenu />
        <div className="body">
      <div className="events-table  shadow-lg">
        <h1>Create Ticket For Event</h1>
        {event.map((event, index) => (
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
              <button className="add-ticket-button" onClick={() => handleAddTicketClick(event._id)}>Add Ticket</button>
            </div>
          </div>
        ))}
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header >
          <Modal.Title>Add Ticket</Modal.Title>
          <CloseIcon className='btn-close' onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="ticketType" className="form-label">Ticket Type</label>
              <select id="ticketType" className="form-select" value={ticketType} onChange={(e) => setTicketType(e.target.value)}>
                <option value="Regular">Regular</option>
                <option value="VIP">VIP</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="sit" className="form-label">Avaliable Seat</label>
              <input type="text" className="form-control" id="sit" value={sit} onChange={(e) => setSit(e.target.value)} />
            </div>
            <div className="mb-3 form-parent">
              <label className="form-label">Payment Option</label>
              <div className="form-check">
                <input
                  type="radio"
                  id="free"
                  className="form-check-input"
                  value="Free"
                  checked={paymentOption === 'Free'}
                  onChange={() => setPaymentOption('Free')}
                />
                <label htmlFor="free" className="form-check-label">Free</label>
              </div>
            </div>
            {paymentOption === 'Paid' && (
              <div className="mb-3">
                <label htmlFor="price" className="form-label">Price:₦</label>
                <input type="number" className="form-control" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
              </div>
            )}
            {paymentOption === 'Paid' && (
              <>
                <div className="mb-3">
                  <label htmlFor="bankName" className="form-label">Bank Name</label>
                  <input type="text" className="form-control" id="bankName" value={bankName} onChange={(e) => setBankName(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="bankAccount" className="form-label">Bank Account</label>
                  <input type="text" className="form-control" id="bankAccount" value={bankAccount} onChange={(e) => setBankAccount(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="bankHolderName" className="form-label">Bank Holder Name</label>
                  <input type="text" className="form-control" id="bankHolderName" value={bankHolderName} onChange={(e) => setBankHolderName(e.target.value)} />
                </div>
              </>
            )}
            <button className="gap-2 d-flex align-items-center add-submit-button" type="submit" disabled={isLoading}>
              {isLoading ? (
                <span className="spinner-grow spinner-grow-sm me-2" role="status" aria-hidden="true"></span>
              ) : (
                <span>Submit</span>
              )}
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
        
    </div>
  )
}

export default CreateTicket