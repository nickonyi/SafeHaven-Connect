import './TicketUpdateModal.scss'
import React, { useContext, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { EventContext } from '../../context/EventContext';
import CloseIcon from '@mui/icons-material/Close';

function TicketUpdateModal({ ticket, onClose, fetchTickets }) {
    const [price, setPrice] = useState(ticket.price);
    const [sit, setSit] = useState(ticket.sit);
    const [isFree, setIsFree] = useState(ticket.price === 0);
    const {updateTicket} =  useContext(EventContext);
    
    
  const handleUpdate = async () => {
    const updatedTicket = {
        price,
        sit:parseInt(sit)
        };
       

        try {
           await updateTicket(ticket._id,updatedTicket);
           onClose();
           fetchTickets(ticket.eventId);  
        } catch (error) {
            console.error('Error updating ticket:', error);
        }
    }
  

  return (
    <Modal show={true} onHide={onClose}>
            <Modal.Header>
                <Modal.Title>Update Ticket</Modal.Title>
                <CloseIcon className='btn-close' onClick={onClose} />
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="formPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        value={isFree ? 0 : price}
                        onChange={(e) => {
                            setPrice(e.target.value);
                            setIsFree(parseFloat(e.target.value) === 0);
                        }}
                        disabled={isFree}
                    />
                </Form.Group>
                <Form.Group controlId="formSit">
                    <Form.Label>Number of Seats</Form.Label>
                    <Form.Control type="number" value={sit} onChange={(e) => setSit(e.target.value)} />
                </Form.Group>
                
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" style={buttonStyle} onClick={handleUpdate}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
  )
}

const buttonStyle = {
    padding: '6px 12px',
    backgroundColor: '#2b2baa',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '10px',
    cursor: 'pointer',
    fontWeight: '600',
    fontFamily: '"Poppins", sans-serif'
};
export default TicketUpdateModal