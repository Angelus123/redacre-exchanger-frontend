import React, { useState } from 'react'
import './Date.css'

const DatePicker = (props) => {
	const [selected_date, setSelected_date] = useState("08/05/2022")
	const [selected_date_to, setSelected_date_to] = useState("08/05/2022")
	const [dates_element, setDates_element] = useState(['dates'])
	const [dates_to_element, setDates_to_element] = useState(['dates-to'])
	const [days_element, setDays_element] = useState([])

	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	let date = new Date();
	let day = date.getDate();
	let month = date.getMonth();
	let year = date.getFullYear();
	let selected_day = `${day}`
	let selected_dayTo = `${day}`
	function toggleDatePicker() {
		let datesElement = dates_element
		if (datesElement[1] !== "active") {
			setDates_element(["dates", 'active']);
			setDates_to_element(["dates"]);
			populateDates();
		}
		else {
			setDates_element(["dates"]);
		}
	}

	function toggleDatePickerTo() {
		let datesToElement = dates_to_element
		if (datesToElement[1] !== "active") {
			setDates_to_element(["dates-to", 'active']);
			setDates_element(["dates"]);
			populateDates();
		}
		else {
			setDates_to_element(["dates-to"]);
		}
	}
	function populateDates() {
		const Days_element = [];
		let amount_days = 31;

		for (let i = 0; i < amount_days; i++) {

			Days_element.push(i + 1)

		}

		setDays_element(Days_element)

	}
	const selectDate = (element) => {
		selected_day = `${element}/${month + 1}/${year}`
		setSelected_date(selected_day)
		props.fromDateHandle(selected_day)
		setDates_element(["dates"]);
	}

	const selectDateTo = (element) => {
		selected_dayTo = `${element}/${month + 1}/${year}`
		setSelected_date_to(selected_dayTo)
		props.toDateHandle(selected_dayTo)
		setDates_to_element(["dates-to"]);
	}

	const renderList = days_element.map((element, index) => {

		if (element === day) {
			return <div key={index} className='today' onClick={() => selectDate(element)}>{element}</div>

		}
		else if (element > day) {
			return <div key={index} className='dayfuture' onClick={() => selectDate(element)}>{element}</div>
		}
		else {
			return <div key={index} className='day' onClick={() => selectDate(element)}>{element}</div>
		}
	});
	const renderListTo = days_element.map((element, index) => {

		if (element === day) {
			return <div key={index} className='today' onClick={() => selectDateTo(element)}>{element}</div>

		}
		else if (element > day) {
			return <div key={index} className='dayfuture' onClick={() => selectDateTo(element)}>{element}</div>
		}
		else {
			return <div key={index} className='day' onClick={() => selectDateTo(element)}>{element}</div>
		}
	});

	

	return (
		<div className='date-cover'>
			<div className="date-container">
				<div className='date-title'><h2>History</h2></div>
				<div className="date-row">

					<div className="date-column">

						<p>From Date</p>
						<div className="date-picker date-from" onClick={toggleDatePicker}>
							<div className="selected-date">{selected_date}</div>
						</div>
						<div className="datepicker-cover">
							<div className={dates_element.join(' ')}>
								<div className="month">
									<div className="arrows prev-mth">&lt;</div>
									<div className="mth">{months[month] + ' ' + year}</div>
									<div className="arrows next-mth">&gt;</div>
								</div>

								<div className="days">
									{renderList}

								</div>
							</div>
						</div>
					</div>
					<div className="date-column">
						<p>To Date</p>
						<div className='date-to' onClick={toggleDatePickerTo}>
							<div className="selected-date">{selected_date_to}</div>
						</div>
						<div className="datepicker-cover">
							<div className={dates_to_element.join(' ')}>
								<div className="month">
									<div className="arrows prev-mth">&lt;</div>
									<div className="mth">{months[month] + ' ' + year}</div>
									<div className="arrows next-mth">&gt;</div>
								</div>

								<div className="days">
									{renderListTo}

								</div>
							</div>
						</div>
					</div>
					<div className='date-equal'> </div>
					<div className="date-column">
						<p className="date-type">Type</p>
						<div className='date-all' onClick={props.getAllHandle}>All<div className='btn-dropdown'></div></div>
					</div>
					<div className="date-column">
						<div className="date-save" onClick={props.filterHandle}>Filter</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default DatePicker
