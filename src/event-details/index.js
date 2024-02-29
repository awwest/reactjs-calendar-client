import { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';

function EventDetails({ event, fetchData, isCreateForm }) {
  const [editing, setEditing] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');
  const apiUrl = '/api/events';

  if(isCreateForm && !editing) {
    setEditing(true);
  }

  function activateEditMode() {
    setEditing(true);
  }

  function cancelEditing() {
    setEditing(false);
  }

  function validate(values) {
    const errors = {};
    if (`${new Date(values.date)}` === 'Invalid Date') {
        console.log('Invalid Date');
        errors.date = 'You must enter a valid date'
    }
    return errors;
  }

  function deleteItem() {
    if (window.confirm(`Are you sure you want to delete ${event.name}?`)) {
        axios.delete(`${apiUrl}/${event._id}`).then((response)=> {
            fetchData();
        });
    }
  }


  if (event.date && event.date !== formattedDate) {
    const dateArray = event.date.split('T')[0].split('-');
    const dateYear = dateArray[0];
    let dateMonth = dateArray[1];
    let dateDay = dateArray[2];
    const updatedDate = `${dateYear}-${dateMonth}-${dateDay}`;
    if (updatedDate !== formattedDate) {
        setFormattedDate(updatedDate);
    }
  }

  function getTime(time) {
    if (!time) return;
    let hour = +time.split(':')[0];
    let minute = +time.split(':')[1];
    let displayTime = '';
    if (minute < 10) {
        minute = `0${minute}`;
    }
    if (hour > 12) {
        displayTime = `${hour - 12}:${minute}PM`;
    } else if (hour === 12) {
        displayTime = `${hour}:${minute}PM`;
    } else {
        if (hour === 0) {
            hour = 12;
        }
        displayTime = `${hour}:${minute}AM`;
    }
    return displayTime;
  }

  const formik = useFormik({

    initialValues: {

      name: event.name || '',

      date: formattedDate,

      time: event.time || '',

      description: event.description || '',

      invites: event.invites ? event.invites.toString() : ''

    },
    enableReinitialize: true,

    validate,

    onSubmit: (values, { resetForm }) => {
      let url = '/api/events';
      values.invites = values.invites.split(',');
      if(event._id) {
        url = url + '/' + event._id;
        axios.put(url, values).then((response)=> {
          fetchData();
        });
      } else {
        axios.post(url, values).then((response) => {
          resetForm();
          fetchData();
        });
      }
      setEditing(false);
    },

  });

  if(!editing){
    return (
        <div className='event-item'>
            <div>Name: {event.name}</div>
            <div>Date: {formattedDate}</div>
            <div>Time: {getTime(event.time)} </div>
            <div>Description: {event.description}</div>
            <div>Invites: {event.invites}</div>
            <button value={editing} onClick={activateEditMode}>Edit</button>
        </div>
    )
} else {  
        return (
            <div className='event-item edit'>
                <form onSubmit={formik.handleSubmit}>
                    <span>
                    <label htmlFor="name">Name:</label>
                    <input 
                        id="name" 
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    ></input>
                    </span>
                    <span>
                    <label htmlFor="date">Date:</label>
                    <input 
                        id="date" 
                        name="date" 
                        type="date" 
                        value={formik.values.date}
                        onChange={formik.handleChange}
                    ></input>
                    </span>
                    <span>
                    <label htmlFor="time">Time:</label>
                    <input
                        id="time"
                        name="time"
                        type="time"
                        value={formik.values.time}
                        onChange={formik.handleChange}
                    ></input>
                    </span>
                    <span>
                    <label htmlFor="description">description:</label>
                    <input 
                        id="description" 
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                    ></input>
                    </span>
                    <span>
                    <label htmlFor="invites">Invites:</label>
                    <input
                        id="invites"
                        name="invites"
                        value={formik.values.invites}
                        onChange={formik.handleChange}
                    ></input>
                    </span>
                    <p className="button-group">
                        <button type="submit">Save</button>
                        {isCreateForm ? '' : (<button className="cancel-button" type="button" onClick={cancelEditing}>Cancel</button>)}
                        { event._id ? (<button className="delete-button" type="button" onClick={deleteItem}>Delete</button>) : "" }
                    </p>
                </form>
            </div>
        )
    }
}

export default EventDetails