import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { io } from "socket.io-client"
// import Test from './test'
import WebSocketCall from "./components/WebSocketCall"
import TopNavbar from '../navbar/TopNavbar'

function ChatPage(props) {

    const [socketInstance, setSocketInstance] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
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
    }, [])

    return (
        <div>
            <div>
                <div className="line">
                    {!loading && <WebSocketCall removeToken={props.removeToken} socket={socketInstance} token={props.token} userId={props.userId} username={props.username} />}
                </div>
            </div>
        </div>
    )
}

export default ChatPage