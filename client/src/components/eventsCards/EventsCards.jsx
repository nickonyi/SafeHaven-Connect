import './EventsCards.scss'
import { Link } from 'react-router-dom';

function EventsCards({event}) {
    if (!event) {
        return (
            <div class="spinner-grow text-danger text-align-center p-5" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        );
    }

    const shortDescription = event.description.slice(0, 25);
    const eventDate = new Date(event.date);
    const formattedDate = `${eventDate.toLocaleString('default',{month:'short'})} ${eventDate.getDate()}, ${eventDate.getFullYear()}`;

  return (
    <div className='Eventcards shadow-md'>
       <Link className='Links' to={`/Events/horizontal/event/${event._id}`}>
            <div className="eventimagetop">
                <img src={event.image} alt={event.name} />
            </div>
        </Link>
        <div className="blur-container">
          <div className="eventtexts">
          <Link className='Links' to={`/Events/horizontal/event/${event._id}`}>
            <h4>{event.name}</h4>
            <p className='eventcardD'>{shortDescription}...</p>
          </Link>
          </div>  
          <div className="eventcardbottoms">
             <Link to={`/horizontal/event/${event.id}`} className='Links'>
                 <h5>{formattedDate}</h5>
             </Link>
             <p className="eventcardprice">{event.price}</p>
         </div>
        </div>
    </div>
  )
}

export default EventsCards