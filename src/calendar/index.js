import React from 'react';
import Day from '../day/index'

class Calendar extends React.Component {
    dateSelected(event) {
        console.log(event.target.value);
    }
    createEvent(){
        
    }
    render() {
        let date = new Date();
        let daysInMonth = (new Date(date.getFullYear(), date.getMonth(), 0)).getDate()
        let dates = [];
        for (let i = 1; i <= daysInMonth; i++){
           dates.push(i);
        }
        return (
            <div>
                <input 
                    type='date'
                    onChange={this.dateSelected}
                ></input>
                <button onClick={this.createEvent}>Create</button>
            <h1>
                {date.getDay()}
                {date.getDate()}
                {date.getMonth()}
                {date.toLocaleDateString()}
                -
                {daysInMonth}
            </h1>
            <ol>
                {
                dates.map((day, index) => {
                    return <Day key={index} dayNum={index}></Day>
                })
               }
        </ol>
        </div>
        )
    }
}

export default Calendar;