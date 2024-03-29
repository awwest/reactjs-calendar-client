import { useState } from "react";
import EventDetails from "../event-details";


function EventInput({ updateEvent, fetchData, currentDate }) {
    const [selectedDate, setSelectedDate] = useState('');

    const dateSelected = (event) => {
        updateEvent(event.target.value);
        setSelectedDate(event.target.value);
    }

    if (currentDate !== selectedDate) {
        setSelectedDate(currentDate);
    }

    return (
        <div>
            <p>Create new event:</p>
            <EventDetails 
                event={{ date: selectedDate }}
                fetchData={fetchData}
                isCreateForm={true}
            ></EventDetails>
            <div>Select Date:</div>
                <input
                type='date'
                value={currentDate}
                onChange={dateSelected}
                ></input>
            </div>
        )
}

export default EventInput;
