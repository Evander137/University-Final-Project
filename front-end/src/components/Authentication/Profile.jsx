import { useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'

function Profile(props) {

    const [profileData, setProfileData] = useState(null)
    function getData() {
        axios({
            method: "GET",
            url: "http://localhost:5001/profile",
            headers: {
                Authorization: 'Bearer ' + props.token
            }
        })
            .then((response) => {
                const res = response.data
                console.log(res.access_token)
                // res.access_token && props.setToken(res.access_token)
                setProfileData(({
                    profile_name: res.name,
                    about_me: res.about
                }))
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                }
            })
    }

    return (
        <div className="Profile">
            <div>
                <Link to="/chat">CLICK HERE TO CHAT</Link>
            </div>
            <p>To get your profile details: </p><button onClick={getData}>Click me</button>
            {profileData && <div>
                <p>Profile name: {profileData.profile_name}</p>
                <p>About me: {profileData.about_me}</p>
            </div>
            }

        </div>
    )
}

export default Profile