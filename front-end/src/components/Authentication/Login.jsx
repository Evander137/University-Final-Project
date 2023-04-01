import { useState } from 'react'
import axios from "axios"

function Login(props) {

    const [loginForm, setloginForm] = useState({
        username: "",
        password: ""
    })

    function logMeIn(event) {
        axios({
            method: "POST",
            url: "http://localhost:5001/token",
            data: {
                username: loginForm.username,
                password: loginForm.password
            }
        })
            .then((response) => {
                props.setToken(response.data.access_token, response.data.id, response.data.username)
                // console.log(response.data)

            }).catch((error) => {
                if (error.response) {
                    console.log(error.response)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                }
            })

        setloginForm(({
            username: "",
            password: ""
        }))

        event.preventDefault()
    }

    function handleChange(event) {
        const { value, name } = event.target
        setloginForm(prevNote => ({
            ...prevNote, [name]: value
        })
        )
    }

    return (
        <div>
            <h1>Login</h1>
            <form className="login">
                <input onChange={handleChange}
                    type="username"
                    text={loginForm.username}
                    name="username"
                    placeholder="Felhasználónév"
                    value={loginForm.username} />
                <input onChange={handleChange}
                    type="password"
                    text={loginForm.password}
                    name="password"
                    placeholder="Jelszó"
                    value={loginForm.password} />

                <button onClick={logMeIn}>Submit</button>
            </form>
        </div>
    )
}

export default Login