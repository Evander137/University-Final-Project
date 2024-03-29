import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import { ReactComponent as SettingSvg } from '../../../images/setting.svg'
import Settings from './Settings'

export default function TopNavbar(props) {
    return (
        <Navbar bg="dark" variant="dark" className='py-0'>
            <Container>
                <Navbar.Brand>{props.username}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/" className='routerLink mx-5'>Naptár</Link>
                        <Link to="/chat" className='routerLink mx-5'>Üzenőfal</Link>
                    </Nav>
                    <Nav className="justify-content-end" activeKey="/home">
                        <Nav.Item className='mx-5'>
                            {/* <SettingSvg className="setting-icon" /> */}
                            <Settings />
                        </Nav.Item>
                        <Nav.Item>
                            <button className="btn btn-sm btn-outline-danger" onClick={props.removeToken} type="button">Kijelentkezés</button>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
