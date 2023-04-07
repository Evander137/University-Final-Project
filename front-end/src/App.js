import "./App.css"
// import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import useToken from './components/authentication/useToken'
import Login from "./components/authentication/Login"
import ChatPage from "./components/pages/chat/ChatPage"
import CalendarPage from "./components/pages/calendar/CalendarPage"
import 'bootstrap/dist/css/bootstrap.css'
import TopNavbar from "./components/pages/navbar/TopNavbar"

function App() {
  const { token, id, username, removeToken, setToken } = useToken()

  const renderNavbar = () => {
    if (!token && token !== "" && token !== undefined)
      return
    return <TopNavbar username={username} removeToken={removeToken} />
  }

  let className = ""
  if (!token && token !== "" && token !== undefined)
    className = 'App LoginMainDiv'
  else
    className = "App"
  return (
    <BrowserRouter>
      {renderNavbar()}
      <div className={className}>
        {!token && token !== "" && token !== undefined ?
          <div>
            <Login setToken={setToken} />
          </div>
          : (
            <>
              <Routes>
                <Route exact path="/" element={
                  <CalendarPage
                    removeToken={removeToken}
                    userId={id}
                    username={username}
                    token={token}
                    setToken={setToken}
                  />}>
                </Route>

                <Route exact path="/chat" element={
                  <ChatPage
                    removeToken={removeToken}
                    userId={id}
                    username={username}
                    token={token}
                  />}>
                </Route>
              </Routes>
            </>
          )}
      </div>
    </BrowserRouter>
  )
}

export default App
