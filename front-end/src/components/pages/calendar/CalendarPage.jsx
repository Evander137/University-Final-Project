import React from 'react'
import { useState, useEffect } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import AddEvent from './components/AddEvent'
import moment from 'moment'

export default function CalendarPage(props) {
    const [events, setEvents] = useState(null)
    const [dateObject, setDateObject] = useState(moment())
    const [showMonthTable, setShowMonthTable] = useState(false)
    const [showYearTable, setShowYearTable] = useState(false)

    const weekDays = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap']
    const monthNames = ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December']

    // const weekdayshort = moment.weekdaysShort()

    function getData() {
        axios({
            method: "GET",
            url: "http://localhost:5001/get",
            headers: {
                Authorization: 'Bearer ' + props.token
            }
        })
            .then((response) => {
                const res = response.data
                // console.log(res)
                res.access_token && props.setToken(res.access_token)
                setEvents(res)
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                }
            })
    }

    useEffect(() => {
        getData()
    }, [])

    const daysInMonth = () => {
        return dateObject.daysInMonth()
    }

    const year = () => {
        return dateObject.format("Y")
    }

    const setYear = (year) => {
        console.log(year)
        let dateObj = Object.assign({}, dateObject)
        dateObj = moment(dateObj).set("year", year)
        setDateObject(dateObj)
        setShowMonthTable(!showMonthTable)
        setShowYearTable(!showYearTable)
    }

    const currentDay = () => {
        return dateObject.format("D")
    }

    const renderEvents = () => {
        if (events) {
            return events.map((event, index) => {
                return (
                    <div key={index}>
                        {event.name} - {event.date} - {event.type}
                        {/* <Link to={`/events/${event._id}`}>
                            <button>View</button>
                        </Link> */}
                    </div>
                )
            })
        }
    }

    const firstDayOfMonth = () => {
        let firstDay = moment(dateObject).startOf("month").format("d")
        return firstDay !== "0" ? (firstDay - 1) : 6

    }

    const renderDays = () => {
        let blanks = []
        for (let i = 0; i < firstDayOfMonth(); i++) {
            blanks.push(
                <td className="calendar-day empty">{""}</td>
            )
        }
        let days = []
        for (let d = 1; d <= daysInMonth(); d++) {
            d.toString() === currentDay() ?
                days.push(
                    <td key={d} className="calendar-day">
                        <b>{d}</b>
                    </td>
                ) :
                days.push(
                    <td key={d} className="calendar-day">
                        {d}
                    </td>
                )
        }

        var totalSlots = [...blanks, ...days]
        let rows = []
        let cells = []

        totalSlots.forEach((row, i) => {
            if (i % 7 !== 0) {
                cells.push(row)
            }
            else {
                rows.push(cells)
                cells = []
                cells.push(row)
            }
            if (i === totalSlots.length - 1) {
                rows.push(cells)
            }
        })

        let daysinmonth = rows.map((d, i) => {
            return <tr>{d}</tr>
        })

        // console.log(daysinmonth)
        return daysinmonth
    }

    const renderMonths = () => {
        let months = []
        monthNames.map(data => {
            months.push(
                <td
                    key={data}
                    onClick={e => setMonth(data)}
                >
                    <span>{data}</span>
                </td>
            )
        })
        let rows = []
        let cells = []

        months.forEach((row, i) => {
            if (i % 3 !== 0 || i === 0) {
                cells.push(row)
            }
            else {
                rows.push(cells)
                cells = []
                cells.push(row)
            }
        })
        rows.push(cells)

        let monthlist = rows.map((d, i) => {
            return <tr>{d}</tr>
        })

        if (showMonthTable) {
            return (
                <table className="calendar-month">
                    <thead>
                        <tr>
                            <th colSpan="4">Select a Month</th>
                        </tr>
                    </thead>
                    <tbody>{monthlist}</tbody>
                </table>
            )
        }
        else return <div></div>
    }

    const setMonth = (month) => {
        let monthNumber = monthNames.indexOf(month)// get month number 
        let dateObj = Object.assign({}, dateObject)
        dateObj = moment(dateObj).set("month", monthNumber) // change month value
        setDateObject(dateObj)
        setShowMonthTable(false)
    }

    const renderCalendar = () => {
        if (showMonthTable || showYearTable)
            return <></>
        return (
            <>
                <table className="calendar-day">
                    <thead>
                        <tr>
                            <th>{weekDays[0]}</th>
                            <th>{weekDays[1]}</th>
                            <th>{weekDays[2]}</th>
                            <th>{weekDays[3]}</th>
                            <th>{weekDays[4]}</th>
                            <th>{weekDays[5]}</th>
                            <th>{weekDays[6]}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderDays()}
                    </tbody>
                </table>
            </>
        )
    }

    const renderYears = () => {
        if (!showYearTable)
            return <></>

        var shownYears = []
        for (let i = (moment().year() - 6); i < (moment().year() + 6); i++) {
            shownYears.push(i)
        }
        // console.log(shownYears)

        let months = []
        shownYears.map(data => {
            months.push(
                <td
                    key={data}
                    className="calendar-month"
                    onClick={e => {
                        setYear(data)
                    }}
                >
                    <span>{data}</span>
                </td>
            )
        })
        let rows = []
        let cells = []

        months.forEach((row, i) => {
            if (i % 3 !== 0 || i == 0) {
                cells.push(row)
            } else {
                rows.push(cells)
                cells = []
                cells.push(row)
            }
        })
        rows.push(cells)
        let yearlist = rows.map((d, i) => {
            return <tr>{d}</tr>
        })

        return (
            <table className="calendar-month">
                <thead>
                    <tr>
                        <th colSpan="4">Select a Year</th>
                    </tr>
                </thead>
                <tbody>{yearlist}</tbody>
            </table>)
    }

    return (
        <div>
            <Link to="/chat">CLICK HERE TO CHAT</Link>
            {renderEvents()}
            <div className="tail-datetime-calendar">
                <div>
                    <span className="calendar-label">
                        <h1 onClick={() => {
                            setShowYearTable(!showYearTable)
                            setShowMonthTable(false)
                        }
                        }>{year()}</h1>
                    </span>
                </div>
                <div className="calendar-navi">
                    <h1 onClick={() => {
                        setShowMonthTable(!showMonthTable)
                        setShowYearTable(false)
                    }
                    }>
                        {monthNames[dateObject.month()]}</h1>
                </div>
            </div>
            <div>
                {renderYears()}
            </div>
            <div className="calendar-date">
                {renderMonths()}
            </div>
            {renderCalendar()}
            <AddEvent />
        </div>
    )
}
