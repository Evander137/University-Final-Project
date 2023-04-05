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
                    alert("Helytelen felhasználónév vagy jelszó")
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

    const renderLoginPage = () => {
        return (
            <section className="vh-100">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-8">
                            <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
                                <div className="card-body p-5 text-center">

                                    <h3 className="mb-5">Bejelentkezés</h3>

                                    <div className="form-outline mb-4">
                                        <input onChange={handleChange}
                                            type="username"
                                            id="loginUsername"
                                            text={loginForm.username}
                                            name="username"
                                            value={loginForm.username}
                                            className="form-control form-control-lg"
                                        />
                                        <label className="form-label" htmlFor="loginUsername">Felhasználónév</label>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input onChange={handleChange}
                                            type="password"
                                            text={loginForm.password}
                                            name="password"
                                            id="loginPassword"
                                            value={loginForm.password}
                                            className="form-control form-control-lg"
                                        />
                                        <label className="form-label" htmlFor="loginPassword">Jelszó</label>
                                    </div>

                                    <button className="btn btn-primary btn-lg btn-block" onClick={logMeIn}>Bejelentkezés</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>)
    }

    return (
        <div style={{ width: '100vh' }}>
            {/* <h1>Bejelentkezés</h1>
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
            </form> */}

            {renderLoginPage()}
        </div>
    )
}

export default Login