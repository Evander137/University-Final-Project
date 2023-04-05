import axios from "axios"

export default class APIServices {

    static GetEvents(token) {
        return fetch('http://localhost:5001/get', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
            .then(res => res.json())
    }

    static GetProfile(token) {
        return fetch('http://localhost:5001/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
            .then(res => res.json())
    }

    static UpdateEvent(id, body, token) {
        return fetch(`http://localhost:5001/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
    }

    static AddEvent(body, token) {
        return fetch('http://localhost:5001/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
    }

    static DeleteEvent(id, token) {
        return fetch(`http://localhost:5001/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
            .then(res => res.json())
    }

    static GetMessages(token) {
        return fetch('http://localhost:5001/getMessages', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
            .then(res => res.json())
    }

    static GetUsers(token) {
        return fetch('http://localhost:5001/getUsers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
            .then(res => res.json())
    }
}