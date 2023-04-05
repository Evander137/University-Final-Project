import React from 'react'
import { useState, useEffect } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import Calendar from './components/Calendar'

export default function CalendarPage(props) {
    const [events, setEvents] = useState(null)

    function getData() {
        axios({
            method: "GET",
            url: "http://localhost:5001/get",
            headers: {
                Authorization: 'Bearer ' + props.token
            }
        })
            .then((response) => {
                console.log(response)
                const res = response.data
                // console.log(res)
                // res.access_token && props.setToken(res.access_token)
                setEvents(res)
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                }
            })
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            <Link to="/chat">CLICK HERE TO CHAT</Link>
            <Calendar
                events={events}
                getEvents={getData}
                token={props.token}
                setToken={props.setToken}
                userId={props.userId}
            />
        </div>
    )
}
