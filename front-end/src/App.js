import "./App.css"
import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Profile from './components/authentication/Profile'
import Header from './components/authentication/Header'
import useToken from './components/authentication/useToken'
import Login from "./components/authentication/Login"
import ChatPage from "./components/pages/chat/ChatPage"
import CalendarPage from "./components/pages/calendar/CalendarPage"
import 'bootstrap/dist/css/bootstrap.css'

function App() {
  const { token, id, username, removeToken, setToken } = useToken()

  useEffect(() => {
    console.log("useeffect")
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        {!token && token !== "" && token !== undefined ?
          <div>
            <Login setToken={setToken} />
          </div>
          : (
            <>
              <Header token={removeToken} />
              <Routes>
                <Route exact path="/chat" element={<ChatPage userId={id} username={username} token={token} />}></Route>
                <Route exact path="/profile" element={<Profile token={token} setToken={setToken} />}></Route>
                <Route exact path="/calendar" element={<CalendarPage userId={id} username={username} token={token} setToken={setToken} />}></Route>
              </Routes>
            </>
          )}
      </div>
    </BrowserRouter>
  )
}

export default App
