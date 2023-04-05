import React, { useState } from "react"
import { Modal, Button } from "react-bootstrap"
import APIServices from "./APIServices"

export default function ShowAndUpdateEvent(props) {
    const [showModal, setShow] = useState(false)

    const [name, setName] = useState(props.event.name)
    const [description, setDescription] = useState(props.event.description)
    const [location, setLocation] = useState(props.event.location)
    const [type, setType] = useState(props.event.type)
    const [date, setDate] = useState(props.event.date)
    const [startTime, setStartTime] = useState(props.event.startTime)
    const [endTime, setEndTime] = useState(props.event.endTime)
    const [final, setFinal] = useState(props.event.isFinal)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const handleNameChange = e => setName(e.target.value)
    const handleDescriptionChange = e => setDescription(e.target.value)
    const handleLocationChange = e => setLocation(e.target.value)
    const handleTypeChange = e => setType(e.target.value)
    const handleDateChange = e => setDate(e.target.value)
    const handleStartTimeChange = e => setStartTime(e.target.value)
    const handleEndTimeChange = e => setEndTime(e.target.value)
    const handleFinalChange = e => setFinal(e.target.checked)

    const handleSubmit = (e) => {
        APIServices.UpdateEvent(props.event.id, {
            "name": name,
            "description": description,
            "type": type,
            "date": date,
            "location": location,
            "startTime": startTime,
            "endTime": endTime,
            "isFinal": final
        }, props.token)
            .then(response => {
                console.log(response)
                // const res = response.data
                // res.access_token && props.setToken(res.access_token)
                alert("Sikeresen frissítette az eseményt!")
                props.getEvents()
                handleClose()
            })
            .catch(err => console.log(err))

    }

    const handleDelete = () => {
        window.confirm("Biztos törölné szeretnéd az eseményt?") &&
            APIServices.DeleteEvent(props.event.id, props.token).then(response => {
                console.log(response)
                // const res = response.data
                // res.access_token && props.setToken(res.access_token)
                // alert("Sikeresen törölte az eseményt!")
                props.getEvents()
                handleClose()
            })
                .catch(err => console.log(err))
    }

    return (
        <>
            <div>
                <a href="#" onClick={handleShow} className="link">{props.event.name}</a>
            </div>
            <Modal show={showModal} onHide={handleClose} backdrop="static" size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Esemény frissítése</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="addEventName" className="form-label">Név</label>
                        <input disabled={String(props.event.institution_id) !== String(props.userId)} value={name} onChange={handleNameChange} type="text" className="form-control" id="addEventName" placeholder="" />
                    </div>
                    <hr />
                    <div className="mb-3">
                        <label htmlFor="addEventDescription" className="form-label">Leírás</label>
                        <textarea disabled={String(props.event.institution_id) !== String(props.userId)} value={description} onChange={handleDescriptionChange} className="form-control" id="addEventDescription" rows="3"></textarea>
                    </div>
                    <hr />
                    <div className="mb-3">
                        <label htmlFor="addEventLocation" className="form-label">Helyszín</label>
                        <input disabled={String(props.event.institution_id) !== String(props.userId)} value={location} onChange={handleLocationChange} type="text" className="form-control" id="addEventLocation" placeholder="" />
                    </div>
                    <hr />
                    <label htmlFor="addEventType" className="form-label">Típus</label>
                    <select disabled={String(props.event.institution_id) !== String(props.userId)} defaultValue={type} id="addEventType" onChange={handleTypeChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                        <option defaultValue="Kúltúra">Irodalom</option>
                        <option defaultValue="Zene">Zene, tánc</option>
                        <option defaultValue="Képzőművészet">Képzőművészet</option>
                        <option defaultValue="Történelem, helytörténet">Történelem, helytörténet</option>
                        <option defaultValue="Életmód">Életmód</option>
                        <option defaultValue="Lelki egészség, pszichológia">Lelki egészség, pszichológia</option>
                        <option defaultValue="Társadalomtudomány">Társadalomtudomány</option>
                        <option defaultValue="Természettudomány">Természettudomány</option>
                        <option defaultValue="Jótékonysági programok">Jótékonysági programok</option>
                        <option defaultValue="Gyermekprogramok">Gyermekprogramok</option>
                        <option defaultValue="Fesztiválok">Fesztiválok</option>
                    </select>
                    <hr />
                    <label htmlFor="addEventDate" className="form-label">Dátum</label>
                    <input disabled={String(props.event.institution_id) !== String(props.userId)} value={date} onChange={handleDateChange} className="form-control" id="addEventDate" type="date" />
                    <hr />
                    <div className="row">
                        <div className="col-auto">
                            <label htmlFor="addEventStartTime" className="form-label">Kezdés időpontja</label>
                            <input disabled={String(props.event.institution_id) !== String(props.userId)} value={startTime} onChange={handleStartTimeChange} id="addEventStartTime" className="form-control" type="time" />
                        </div>
                        <div className="col-auto">
                            <label htmlFor="addEventEndTime" className="form-label">Várható befejezés időpontja</label>
                            <input disabled={String(props.event.institution_id) !== String(props.userId)} value={endTime} onChange={handleEndTimeChange} id="addEventEndTime" className="form-control" type="time" />
                        </div>
                    </div>
                    <hr />
                    <label htmlFor="addEventFinal" className="form-label">Végleges-e az időpont</label>
                    <input disabled={String(props.event.institution_id) !== String(props.userId)} checked={final} onChange={handleFinalChange} id="addEventFinal" className="form-check-input" type="checkbox" />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Bezárás
                    </Button>
                    <Button variant="danger" onClick={handleDelete} disabled={String(props.event.institution_id) !== String(props.userId)}>
                        Esemény törlése
                    </Button>
                    <Button variant="dark" onClick={handleSubmit} disabled={String(props.event.institution_id) !== String(props.userId)}>
                        Esemény frissítése
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
