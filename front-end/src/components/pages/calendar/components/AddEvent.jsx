import React, { useState } from "react"
import { Modal, Button } from "react-bootstrap"
import APIServices from "./APIServices"

export default function AddEvent(props) {
    const [showModal, setShow] = useState(false)

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [location, setLocation] = useState("")
    const [type, setType] = useState("")
    const [date, setDate] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [final, setFinal] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const handleNameChange = e => setName(e.target.value)
    const handleDescriptionChange = e => setDescription(e.target.value)
    const handleLocationChange = e => setLocation(e.target.value)
    const handleTypeChange = e => setType(e.target.value)
    const handleDateChange = e => setDate(e.target.value)
    const handleStartTimeChange = (e) => { setStartTime(e.target.value) }
    const handleEndTimeChange = e => setEndTime(e.target.value)
    const handleFinalChange = e => setFinal(e.target.checked)

    const handleSubmit = (e) => {
        APIServices.AddEvent({
            "name": name,
            "description": description,
            "type": type,
            "date": date,
            "location": location,
            "startTime": startTime,
            "endTime": endTime,
            "isFinal": final,
            "institution_id": props.userId
        }, props.token)
            .then(response => {
                console.log(response)
                // const res = response.data
                // res.access_token && props.setToken(res.access_token)
                alert("Sikeresen létrehozta az eseményt!")
                handleClose()
                props.getEvents()
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <div
            // className="d-flex align-items-center justify-content-center"
            // style={{ height: "100vh" }}
            >
                <Button variant="primary" onClick={handleShow}>
                    Új esemény létrehozása
                </Button>
            </div>
            <Modal show={showModal} onHide={handleClose} backdrop="static" size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Új esemény</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="addEventName" className="form-label">Név</label>
                        <input value={name} onChange={handleNameChange} type="text" className="form-control" id="addEventName" placeholder="" />
                    </div>
                    <hr />
                    <div className="mb-3">
                        <label htmlFor="addEventDescription" className="form-label">Leírás</label>
                        <textarea value={description} onChange={handleDescriptionChange} className="form-control" id="addEventDescription" rows="3"></textarea>
                    </div>
                    <hr />
                    <div className="mb-3">
                        <label htmlFor="addEventLocation" className="form-label">Helyszín</label>
                        <input value={location} onChange={handleLocationChange} type="text" className="form-control" id="addEventLocation" placeholder="" />
                    </div>
                    <hr />
                    <label htmlFor="addEventType" className="form-label">Típus</label>
                    <select id="addEventType" onChange={handleTypeChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                        <option defaultValue="Kúltúra">Kúltúra</option>
                        <option defaultValue="Zene">Zene</option>
                        <option defaultValue="Képzőművészet">Képzőművészet</option>
                    </select>
                    <hr />
                    <label htmlFor="addEventDate" className="form-label">Dátum</label>
                    <input value={date} onChange={handleDateChange} className="form-control" id="addEventDate" type="date" />
                    <hr />
                    <div className="row">
                        <div className="col-auto">
                            <label htmlFor="addEventStartTime" className="form-label">Kezdés időpontja</label>
                            <input value={startTime} onChange={handleStartTimeChange} id="addEventStartTime" className="form-control" type="time" />
                        </div>
                        <div className="col-auto">
                            <label htmlFor="addEventEndTime" className="form-label">Várható befejezés időpontja</label>
                            <input value={endTime} onChange={handleEndTimeChange} id="addEventEndTime" className="form-control" type="time" />
                        </div>
                    </div>
                    <hr />
                    <label htmlFor="addEventFinal" className="form-label">Végleges-e az időpont</label>
                    <input checked={final} onChange={handleFinalChange} id="addEventFinal" className="form-check-input" type="checkbox" />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Bezárás
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Esemény létrehozása
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
