import React from 'react'
import APIServices from './APIServices'
import HttpCall from "./HttpCall"

function Test() {

    const getEvents = () => {
        APIServices.GetEvents()
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    const updateEvent = () => {
        APIServices.UpdateEvent(1, { "name": 'new Name' })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    const deleteEvent = () => {
        APIServices.DeleteEvent(4)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    const addEvent = () => {
        APIServices.AddEvent({ "name": 'gigaAdded fos' })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    const getProfile = () => {
        APIServices.GetProfile()
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }


    return (
        <div>
            <button onClick={getProfile}>Get Profile</button>
            <button onClick={getEvents}>Get events</button>
            <button onClick={updateEvent}>Update id1</button>
            <button onClick={deleteEvent}>Delete id4</button>
            <button onClick={addEvent}>Add Fos</button>
            <h1>React/Flask App + socket.io</h1>
            <div className="line">
                <HttpCall />
            </div>
        </div>
    )
}

export default Test