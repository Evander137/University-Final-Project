export default class APIServices {

    static GetEvents() {
        return fetch('http://localhost:5001/get', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
    }

    static GetProfile() {
        return fetch('http://localhost:5001/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
    }

    static UpdateEvent(id, body) {
        return fetch(`http://localhost:5001/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
    }

    static AddEvent(body) {
        return fetch('http://localhost:5001/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
    }

    static DeleteEvent(id) {
        return fetch(`http://localhost:5001/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
    }
}