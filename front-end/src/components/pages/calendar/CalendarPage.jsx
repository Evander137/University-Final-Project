import React from 'react'
import { useState, useEffect } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import Calendar from './components/Calendar'
import APIServices from "../calendar/components/APIServices"

export default function CalendarPage(props) {
    const [events, setEvents] = useState(null)
    const [users, setUsers] = useState(null)

    const getUsers = () => {
        APIServices.GetUsers(props.token)
            .then(response => {
                setUsers(response)
            })
            .catch(err => console.log(err))
    }

    function getData() {
        axios({
            method: "GET",
            url: "http://localhost:5001/get",
            headers: {
                Authorization: 'Bearer ' + props.token
            }
        })
            .then((response) => {
                const res = response.data
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
        getUsers()
    }, [])

    return (
        <>
            <Calendar
                events={events}
                users={users}
                getEvents={getData}
                token={props.token}
                setToken={props.setToken}
                userId={props.userId}
            />
        </>
    )
}
