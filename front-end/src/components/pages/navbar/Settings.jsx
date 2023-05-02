import React, { useState, useEffect } from "react"
import { Modal, Button } from "react-bootstrap"
import { ReactComponent as SettingSvg } from '../../../images/setting.svg'
import AlertDismissible from "../calendar/components/AlertDismissible"

export default function Settings() {
    const [showModal, setShow] = useState(false)

    const [oldPw, setOldPw] = useState("")
    const [newPw, setNewPw] = useState("")
    const [newPwAgain, setNewPwAgain] = useState("")

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleOldPwChange = e => setOldPw(e.target.value)
    const handleNewPwChange = e => setNewPw(e.target.value)
    const handleNewPwAgainChange = e => setNewPwAgain(e.target.value)

    const [error, setError] = useState({
        show: false,
        heading: "",
        message: ""
    })

    const setErrorToEmpty = () => {
        setError({
            show: false,
            heading: "Hiba",
            message: ""
        })
    }

    const handleSubmit = () => {
        console.log(oldPw + " " + newPw + " " + newPwAgain)
    }


    return (
        <>
            <SettingSvg onClick={handleShow} className="setting-icon" />
            <Modal show={showModal} onHide={handleClose} backdrop="static" size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Jelszó megváltoztatása</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="currentPw" className="form-label">Jelenlegi jelszó</label>
                        <input value={oldPw} onChange={handleOldPwChange} maxLength={20} type="password" className="form-control" id="currentPw" />
                    </div>
                    <hr />
                    <div className="mb-3">
                        <label htmlFor="newPw" className="form-label">Új jelszó</label>
                        <input value={newPw} onChange={handleNewPwChange} maxLength={20} type="password" className="form-control" id="newPw" />
                    </div>
                    <hr />
                    <div className="mb-3">
                        <label htmlFor="newPwAgain" className="form-label">Új jelszó mégegyszer</label>
                        <input value={newPwAgain} onChange={handleNewPwAgainChange} maxLength={20} type="password" className="form-control" id="newPwAgain" />
                    </div>
                    <AlertDismissible
                        show={error.show}
                        heading={error.heading}
                        message={error.message}
                        setErrorToEmpty={setErrorToEmpty}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Bezárás
                    </Button>
                    <Button variant="dark" onClick={handleSubmit}>
                        Jelszó megváltoztatása
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
