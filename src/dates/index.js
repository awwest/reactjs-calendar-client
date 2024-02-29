import React from 'react';
import Day from '../day/index'
import EventInput from '../eventinput'
import EventDetails from '../event-details';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Dates() {
    const today = new Date();
    today.setHours(0,0,0,0);
    const [currentDate, setCurrentDate] = useState(today.toISOString().split('T')[0]);
    const [eventList, setEventList] = useState([]);
    const [eventMap, setEventMap] = useState({});
    const [eventsPage, setEventsPage] = useState(1);

    useEffect(() => {
       fetchData();
    }, []);

    function fetchData() {
        axios.get(`/api/events/`).then((response) => {
            setEventMap(response.data ? response.data.reduce((map, evt) => {
                const dateKey = evt.date ? evt.date.split('T')[0] : undefined;
                map[dateKey] = map[dateKey] 
                    ? [ ...map[dateKey], evt ] 
                    : [evt];
                return map;
            }, {}) : {});
            let events = response.data.reduce((list, evt) => {
                evt.ms = new Date(new Date(evt.date).toLocaleString('en-US', { timeZone: 'UTC'})).getTime();
                if (evt.ms >= today.getTime()){
                    list.push(evt);
                }
                return list;
            }, []);
            events = events.sort((a, b) => {
                if (a.ms === b.ms) {
                    return a.time > b.time ? 1 : -1;
                }
                return a.ms > b.ms ? 1 : -1;
            })
            setEventList(events);
        });
    }

    function displayDate(date) {
        const dateString = date.toISOString().split('T')[0];
        if (currentDate !== dateString) {
            setCurrentDate(dateString);
        }
    }

    function loadNextPage() {
        setEventsPage(eventsPage + 1);
    }

    return (
        <div>
            
            <EventInput 
                updateEvent={setCurrentDate} 
                currentDate={currentDate}
                fetchData={fetchData}
            ></EventInput>
            <Calendar 
                onChange={displayDate}
                value={new Date(new Date(currentDate).toLocaleString('en-US', { timeZone: 'UTC'}))}
            ></Calendar>
            <p>{currentDate}:</p>
            <Day 
                eventList={eventMap[currentDate]}
                fetchData={fetchData}
            ></Day>
            <h3>Upcoming Events:</h3>
            {eventList.slice(0, eventsPage * 20).map((evt) => {
                return <EventDetails event={evt} fetchData={fetchData}></EventDetails>
            })}
            <button onClick={loadNextPage}>Show More</button>
        </div>
    )
}


export default Dates;