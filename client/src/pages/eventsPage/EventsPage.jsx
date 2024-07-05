import './EventsPage.scss'
import Static from '../../components/static/Static'
import { AuthContext } from "../../context/AuthContext";
import { useContext } from 'react';

function EventsPage() {
  const {current} = useContext(AuthContext);

  console.log(current);
  return (
    <div className='event-page'>
    <Static title="EVENTS" title2="Events" />
    </div>
  )
}

export default EventsPage