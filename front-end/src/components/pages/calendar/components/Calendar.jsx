import React from 'react'
import { useState } from 'react'
import moment from 'moment'
import ShowAndUpdateEvent from './ShowAndUpdateEvent'
import AddEvent from './AddEvent'

export default function Calendar(props) {
    const [dateObject, setDateObject] = useState(moment())
    const [showMonthTable, setShowMonthTable] = useState(false)
    const [showYearTable, setShowYearTable] = useState(false)

    const weekDays = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap']
    const monthNames = ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December']

    const daysInMonth = () => {
        return dateObject.daysInMonth()
    }

    const year = () => {
        return dateObject.format("Y")
    }

    const setYear = (year) => {
        let dateObj = Object.assign({}, dateObject)
        dateObj = moment(dateObj).set("year", year)
        setDateObject(dateObj)
        setShowMonthTable(!showMonthTable)
        setShowYearTable(!showYearTable)
    }

    const currentDay = () => {
        return dateObject.format("D")
    }

    const firstDayOfMonth = () => {
        let firstDay = moment(dateObject).startOf("month").format("d")
        return firstDay !== "0" ? (firstDay - 1) : 6
    }

    const renderDay = (dailyEvents, d, currentDate) => {
        let events = []
        for (let i = 0; i < dailyEvents.length; i++) {
            events.push(
                <>
                    <br />
                    {dailyEvents[i]}
                </>)
        }
        if (d.toString() === currentDay() && currentDate.year() === dateObject.year() && currentDate.month() === dateObject.month()) {
            return (
                <td key={d} className="calendar-day">
                    <b>{d}</b>
                    {events}
                </td>
            )
        }
        else {
            return (
                <td key={d} className="calendar-day">
                    {d}
                    {events}
                </td>
            )
        }
    }

    const renderDays = () => {
        let blanks = []
        for (let i = 0; i < firstDayOfMonth(); i++) {
            blanks.push(
                <td className="calendar-day empty">{""}</td>
            )
        }
        let days = []
        const currentDate = moment()
        // console.log(dateObject)
        for (let d = 1; d <= daysInMonth(); d++) {
            if (props.events !== null) {
                let dailyEvents = []
                for (let i = 0; i < props.events.length; i++) {
                    let month = "";
                    (dateObject.month() + 1) <= 9 ? month = "0" + (dateObject.month() + 1) : month = (dateObject.month() + 1)
                    let day = ""
                    d <= 9 ? day = "0" + d : day = d
                    let dateString = dateObject.year() + "-" + month + "-" + day
                    if (props.events[i].date.toString() === dateString.toString()) {
                        // ! Itt kell létrehozni a modalt meg a modalbuttont úgy, hogy az adatbázis is meg minden benne van
                        dailyEvents.push(
                            <>
                                <ShowAndUpdateEvent
                                    event={props.events[i]}
                                    userId={props.userId}
                                    getEvents={props.getEvents}
                                    token={props.token}
                                    setToken={props.setToken}
                                />
                            </>)
                    }
                }
                days.push(renderDay(dailyEvents, d, currentDate))
            }
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
                <table className="table table-bordered calendar-day">
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

    const arrowOnPrev = () => {
        let dateObj = Object.assign({}, dateObject)
        if (showYearTable) {
            dateObj = moment(dateObj).set("year", (dateObject.year() - 1))
        }
        else {
            dateObj = moment(dateObj).set("month", (dateObject.month() - 1))
        }
        setDateObject(dateObj)
    }


    const arrowOnNext = () => {
        let dateObj = Object.assign({}, dateObject)
        if (showYearTable) {
            dateObj = moment(dateObj).set("year", (dateObject.year() + 1))
        }
        else {
            dateObj = moment(dateObj).set("month", (dateObject.month() + 1))
        }
        setDateObject(dateObj)
    }

    const renderYears = () => {
        if (!showYearTable)
            return <></>

        var shownYears = []
        for (let i = (moment().year() - 6); i < (moment().year() + 6); i++) {
            shownYears.push(i)
        }

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
            if (i % 3 !== 0 || i === 0) {
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
            <div className="tail-datetime-calendar">
                <div>
                    <span onClick={() => { arrowOnPrev() }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                        </svg>
                    </span>
                    <span onClick={() => { arrowOnNext() }}
                        className="calendar-button button-next">

                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                        </svg>
                    </span>
                </div>
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
            <AddEvent
                getEvents={props.getEvents}
                token={props.token}
                setToken={props.setToken}
                userId={props.userId}
            />
        </div>
    )
}
