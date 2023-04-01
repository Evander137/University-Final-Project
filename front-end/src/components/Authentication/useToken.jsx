import { useState } from 'react'

function useToken() {

    function getToken() {
        const userToken = localStorage.getItem('token')
        return userToken && userToken
    }

    function getId() {
        const userId = localStorage.getItem('id')
        return userId && userId
    }

    function getUsername() {
        const username = localStorage.getItem('username')
        return username && username
    }

    const [token, setToken] = useState(getToken())
    const [id, setId] = useState(getId())
    const [username, setUsername] = useState(getUsername())

    function saveToken(userToken, userId, userUsername) {
        localStorage.setItem('token', userToken)
        localStorage.setItem('id', userId)
        localStorage.setItem('username', userUsername)
        setToken(userToken)
        setId(userId)
        setUsername(userUsername)
    }

    function removeToken() {
        localStorage.removeItem("token")
        localStorage.removeItem("id")
        localStorage.removeItem("username")
        setToken(null)
        setId(null)
        setUsername(null)
    }

    return {
        setToken: saveToken,
        token,
        id,
        username,
        removeToken
    }

}

export default useToken