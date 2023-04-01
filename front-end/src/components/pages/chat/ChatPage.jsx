import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { io } from "socket.io-client"
// import Test from './test'
import WebSocketCall from "./components/WebSocketCall"

function ChatPage() {

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

    const handleClick = () => {
        setButtonStatus(!buttonStatus)
    }


    return (
        <div>
            <div>
                <Link to="/calendar">CLICK HERE TO SEE THE CALENDAR</Link>
            </div>
            {/* <div>
                <Test />
            </div> */}
            <div>
                {
                    !buttonStatus ? (
                        <button onClick={handleClick}>turn chat on</button>
                    ) : (
                        <>
                            <button onClick={handleClick}>turn chat off</button>
                            <div className="line">
                                {!loading && <WebSocketCall socket={socketInstance} />}
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default ChatPage