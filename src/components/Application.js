import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay,getInterview,getInterviewersForDay} from "../helpers/selectors";
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export default function Application(props) {
  const [state, setState] = useState({
    day: "Tuesday",
    days: [],
    appointments: {},
    interviewers: [],
  });

  const setDay = (nameOfDay) => {
    setState({ ...state, day: nameOfDay });
    //console.log(`STATE:--${state} AND day:--${nameOfDay}`)
  };
  // const setDays = (days)=>{
  //   //setState({...state,days:days})
  //   //setState(prevState => ({ ...prevState, days:days }));//It sets the state to the previous state
  //   setState(prev => ({ ...prev, days:days }));
  //   }

  // const setAppointments = ()=>{
  //   setState(prev=>({...prev,appointments:appointments}))
  // }

  useEffect(() => {
    const days = axios.get("http://localhost:8001/api/days");
    const appointments = axios.get("http://localhost:8001/api/appointments");
    const interviewers = axios.get("http://localhost:8001/api/interviewers");
    //In Alternate Approach It should be done 3 times for each of the request like below:
    // GET_DAYS.then((res) => {
    //   setItems((prev) => ({
    //     ...prev,
    //     GET_DAYS: res.data,

    //   }));
    // });
    Promise.all([days, appointments, interviewers]).then((all) => {
      //console.log("$$$$$ALL", all);
      setState((prev) => ({
        ...prev,
        //day:"Friday", you can change the state
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);
  function cancelInterview(id){
    const appointment = {
      ...state.appointments[id],
      interview: null 
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    //console.log('APPOINTMENT-----', appointment);
    return axios.delete("/api/appointments/"+id)
    .then(
      (res)=>{
        setState({
          ...state,
          appointments:appointments
        });
      }
    )
    
  }
  function bookInterview(id,interview){
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    //console.log("----This is state.app---", state.appointments)
    const appointments = {
      ...state.appointments,
      [id]: appointment
      
    };
    return axios.put("/api/appointments/"+id, appointment)
    .then(
      (res)=>{
        //console.log("RES from server", res)
        setState({
          ...state,
          appointments
        });
      }
    )
    
  }
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  //console.log("********", dailyAppointments);
  const dailyInterviews = getInterviewersForDay(state, state.day);
 const schedule =  dailyAppointments.map(
    (appointmentItem) => {
      const interview = getInterview(state, appointmentItem.interview);
      return (
        <Appointment
          key={appointmentItem.id}
          id={appointmentItem.id}
          time={appointmentItem.time}
          interview={interview}
          dailyInterviews = {dailyInterviews}
          bookInterview = {bookInterview}
          cancelInterview = {cancelInterview}
          
        />
      );
    }
  );
  // const setDay = (nameOfDay) => {
  //   setState({ ...state, day: nameOfDay });
  //   console.log(`STATE:--${state} AND day:--${nameOfDay}`)
  // };
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
        <nav></nav>
      </section>

      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
