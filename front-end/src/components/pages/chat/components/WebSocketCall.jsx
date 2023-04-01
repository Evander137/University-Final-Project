import { useEffect, useState } from "react"

export default function WebSocketCall({ socket, username, userId }) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])

  const handleText = (e) => {
    const inputMessage = e.target.value
    setMessage(inputMessage)
  }

  const handleSubmit = () => {
    // console.log(username)
    // console.log(userId)
    if (!message) {
      return
    }
    let msg = {
      username: username,
      userId: userId,
      message: message,
    }
    socket.emit("data", msg)
    setMessage("")
  }

  useEffect(() => {
    socket.on("data", (data) => {
      setMessages([...messages, { username: data.username, message: data.message }])
    })
    return () => {
      socket.off("data", () => {
        console.log("data event was removed")
      })
    }
  }, [socket, messages])

  const renderMessages = () => {
    let msgs = []
    let msgCnt = 0
    for (let i = 0; i < messages.length; i++) {
      // console.log(messages[i])
      msgs.push(<><br /><span key={msgCnt}>{messages[i].username} - {messages[i].message}</span></>)
      msgCnt += 1
    }
    return msgs
  }

  return (
    <div>
      <h2>WebSocket Communication</h2>
      <input type="text" value={message} onChange={handleText} />
      <button onClick={handleSubmit}>submit</button>
      {renderMessages()}
      {/* <ul>
        {messages.map((message, ind) => {
          return <span key={ind}>{message.username} - {message.message}</span>
        })}
      </ul> */}
    </div>
  )
}
