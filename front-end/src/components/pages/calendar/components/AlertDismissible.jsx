import React, { useState, useEffect } from 'react'
import Alert from 'react-bootstrap/Alert'
// import Button from 'react-bootstrap/Button'

export default function AlertDismissible(props) {
    const [show, setShow] = useState(props.show)

    useEffect(() => {
        setShow(props.show)
    }, [props.show])

    return (
        show &&
        <Alert variant="danger" onClose={() => {
            setShow(false)
            props.setErrorToEmpty()
        }} dismissible>
            <Alert.Heading>{props.heading}</Alert.Heading>
            <p>
                {props.message}
            </p>
        </Alert>
    )
}
