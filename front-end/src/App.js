import "./App.css"
import Test from "./components/test.jsx"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Profile from './components/Authentication/Profile'
import Header from './components/Authentication/Header'
import useToken from './components/Authentication/useToken'
import Login from "./components/Authentication/Login"

function App() {
  const { token, removeToken, setToken } = useToken()

  return (
    <BrowserRouter>
      <div className="App">
        <Header token={removeToken} />
        {!token && token !== "" && token !== undefined ?
          <div>
            <Login setToken={setToken} />
          </div>
          : (
            <>
              <Routes>
                <Route exact path="/" element={<Test />}></Route>
                <Route exact path="/profile" element={<Profile token={token} setToken={setToken} />}></Route>
              </Routes>
            </>
          )}
      </div>
    </BrowserRouter>
  )
}

export default App
