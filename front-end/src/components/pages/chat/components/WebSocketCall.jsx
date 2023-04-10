import { useEffect, useState, useRef } from "react"
import moment from 'moment'
import APIServices from "../../calendar/components/APIServices"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Navbar from "react-bootstrap/Navbar"
// import uuid from 'react-uuid'

export default function WebSocketCall({ socket, username, userId, token, removeToken }) {
  const bottomRef = useRef(null)

  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleText = (e) => {
    const inputMessage = e.target.value
    setMessage(inputMessage)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!message) {
      return
    }
    let msg = {
      userId: userId,
      username: username,
      message: message,
      datetime: moment()
    }
    socket.emit("data", msg)
    setMessage("")
  }

  const setMessagesDb = (usersDb, messagesDb) => {
    let tempMessages = []
    for (let messageDb of messagesDb) {
      for (let userDb of usersDb) {
        if (String(userDb.id) === String(messageDb.institution_id)) {
          tempMessages.push({ userId: userDb.id, username: userDb.username, message: messageDb.message, datetime: moment(messageDb.dateTime) })
        }
      }
    }
    setMessages(tempMessages)
  }

  const getUsers = (messagesDb) => {
    APIServices.GetUsers(token)
      .then(res => {
        setMessagesDb(res, messagesDb)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    APIServices.GetMessages(token)
      .then(res => getUsers(res))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    socket.on("data", (data) => {
      setMessages([...messages, { userId: data.userId, username: data.username, message: data.message, datetime: moment() }])
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
    let px = 18
    let lastMsgUserId = 0
    for (let i = 0; i < messages.length; i++) {
      if (lastMsgUserId === messages[i].userId)
        px = 0

      if (parseInt(messages[i].userId) === parseInt(userId)) {
        msgs.push(
          <>
            <li className="w-100 list-group-item" style={{ marginTop: `${px}px`, textAlign: "right", backgroundColor: "lightblue" }} key={msgCnt}>
              <Row>
                <Col style={{ fontSize: "12px", textAlign: "left" }}>{messages[i].datetime.format('YYYY.MM.DD. hh:mm:ss')}</Col>
                <Col><strong>{messages[i].username}</strong></Col>
              </Row>
              <Row>
                <p>{messages[i].message}</p>
              </Row>
            </li>
          </>)
      }
      else {
        msgs.push(
          <li className="w-100 list-group-item" key={msgCnt} style={{ marginTop: `${px}px`, textAlign: "left" }}>
            <Row>
              <Col><strong>{messages[i].username}</strong></Col>
              <Col style={{ fontSize: "12px", textAlign: "right" }}>{messages[i].datetime.format('YYYY.MM.DD. hh:mm:ss')}</Col>
            </Row>
            <Row>
              <p>{messages[i].message}</p>
            </Row>
          </li>)
      }
      msgCnt += 1
      lastMsgUserId = messages[i].userId
      px = 18
    }
    return msgs
  }

  return (
    <div
      className="bg-light page"
      style={{ height: "85vh", overflowX: "hidden" }}
    >
      <Row>
        <Col>
          <Container>
            <div className="d-flex align-items-center justify-content-between">
              <h3 className="text-center py-3 d-inline">
                Veszprémi Intézmények Üzenőfal
              </h3>
            </div>
            <div className="">
              <ul className="list-group" style={{ marginBottom: "60px" }}>
                {/* <li className="w-100 list-group-item" style={{ backgroundColor: "lightblue" }} key={uuid()}>
                  <strong>Test User</strong>
                  <p>Hello everybody</p>
                </li> */}
                {renderMessages()}
              </ul>
            </div>

          </Container>
        </Col>
      </Row>
      <div ref={bottomRef} />
      <Navbar fixed="bottom">
        <Container>
          <Form
            inline
            className="w-100 d-flex justify-content-between align-items-center"
            onSubmit={handleSubmit}
          >
            <Form.Group style={{ flex: 1 }}>
              <Form.Control
                value={message}
                style={{ width: "100%" }}
                required
                type="text"
                placeholder="Írja ide az üzenetét..."
                onChange={handleText}
              />
            </Form.Group>
            <Button variant="dark" type="submit">
              Küldés
            </Button>
          </Form>
        </Container>
      </Navbar>
    </div>
  )
}
