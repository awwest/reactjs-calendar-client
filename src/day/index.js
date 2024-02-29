import React from "react";
import EventDetails from "../event-details";

function Day({ eventList, fetchData }) {
    const events = eventList || [];
    
    return events.length ? events.map((item) => {
        return <EventDetails event={item} fetchData={fetchData}></EventDetails>
    }) : <p>No events for this date</p>;
}

export default Day;