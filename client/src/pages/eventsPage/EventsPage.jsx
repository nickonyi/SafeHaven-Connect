import './EventsPage.scss'
import Static from '../../components/static/Static'
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from 'react';
import { EventContext } from '../../context/EventContext';
import EventsCards from '../../components/eventsCards/EventsCards';

function EventsPage() {
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const {getAllTheEvents} = useContext(EventContext);

  useEffect(() => {
    fetchAllEvents();
    console.log(allEvents);
  }, []);

  const fetchAllEvents = async () => {
      try {
        setLoading(true);
        const events = await getAllTheEvents();
        setAllEvents(events);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching all events:', error);
      }
  }


  return (
    <div className='event-page'>
    <Static title="EVENTS" title2="Events" />
    {loading? ( 
        <div className="d-flex justify-content-center align-items-center" style={{ paddingTop: '50px', paddingBottom: '50px' }}>
          <div className="spinner-border text-danger" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) :(
        <div className="eventsPageCard">
          <div className="carosel">
            {allEvents.map((event) => (
              <EventsCards key={event._id} event={event} />
            ))
            }
          </div>
         </div> 

      )}
    </div>
  )
}

export default EventsPage