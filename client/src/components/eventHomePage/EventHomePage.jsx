import { useState } from 'react'
import './EventHomePage.scss'

function EventHomePage() {
    const [loading,isLoading] = useState(false);

    const handleSearchButtonClick = ()=> {

    }

  return (
    <div className='event-home-page'>
            <h2>Walking street under the tunnel</h2>
            <h3>Get Ready For The Next Event</h3>
            <button className='home-btn'>Buy Ticket</button>

            <div className="search">
                <input 
                type="text" 
                name ="text" 
                id ="text"
                placeholder='Enter a name...' 
                />

                <select name="" id="" className="homepage-select">
                    <option value="today">Today</option>
                    <option value="tomorrow">Tomorrow</option>
                    <option value="this_week">This Week</option>
                    <option value="next_week">Next Week</option>
                    <option value="next_month">Next Month</option>
                    <option value="future">Future</option>
                </select>
                <button className='homepage-button' onClick={handleSearchButtonClick}>
                    {loading ? (
                      <span>Loading...</span>
                    ) : (
                      <span>Search</span>
                    )}
                </button>
            </div>
        </div>
   
  )
}

export default EventHomePage