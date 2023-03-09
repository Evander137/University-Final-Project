import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { io } from "socket.io-client"
import APIServices from './APIServices'
import HttpCall from "./HttpCall"
import WebSocketCall from "./WebSocketCall"

function Test() {

    // useEffect(() => {
    //     APIServices.GetEvents()
    //         .then(res => console.log(res))
    //         .catch(err => console.log(err))
    // }, [])

    const [socketInstance, setSocketInstance] = useState("")
    const [loading, setLoading] = useState(true)
    const [buttonStatus, setButtonStatus] = useState(false)

    useEffect(() => {
        if (buttonStatus === true) {
            const socket = io("localhost:5001/", {
                transports: ["websocket"],
                cors: {
                    origin: "http://localhost:3000/",
                },
            })

            setSocketInstance(socket)

            socket.on("connect", (data) => {
                console.log(data)
            })

            setLoading(false)

            socket.on("disconnect", (data) => {
                console.log(data)
            })

            return function cleanup() {
                socket.disconnect()
            }
        }
    }, [buttonStatus])

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

    const handleClick = () => {
        if (buttonStatus === false) {
            setButtonStatus(true)
        } else {
            setButtonStatus(false)
        }
    }


    return (
        <div>
            <div>
                <Link to="/profile">CLICK HERE TO SEE YOUR PROFILE</Link>
            </div>
            <button onClick={getProfile}>Get Profile</button>
            <button onClick={getEvents}>Get events</button>
            <button onClick={updateEvent}>Update id1</button>
            <button onClick={deleteEvent}>Delete id4</button>
            <button onClick={addEvent}>Add Fos</button>
            <h1>React/Flask App + socket.io</h1>
            <div className="line">
                <HttpCall />
            </div>
            {
                !buttonStatus ? (
                    <button onClick={handleClick}>turn chat on</button>
                ) : (
                    <>
                        <button onClick={handleClick}>turn chat off</button>
                        <div className="line">
                            geci
                            {!loading && <WebSocketCall socket={socketInstance} />}
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default Test