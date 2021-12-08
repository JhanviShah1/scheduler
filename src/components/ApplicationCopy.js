// import  React, {useState} from "react";
// import "components/Application.scss";
// import DayList from "./DayList";


// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

// export default function Application(props) {
//   const [day,setDay]=useState("Tuesday")
//   const logData = (value)=>{
//     //console.log(value)
//   }
  
  
//   return (
//     <main className="layout">
//       {/* <section className="sidebar">
//         <img
//           className="sidebar--centered"
//           src="images/logo.png"
//           alt="Interview Scheduler"
//         />
//         <hr className="sidebar__separator sidebar--centered" />
//         <nav className="sidebar__menu">
//           <DayList
//             days={days}
//             day={day}
//             setDay={setDay}
//           />
//         </nav>
//         <img
//           className="sidebar__lhl sidebar--centered"
//           src="images/lhl.png"
//           alt="Lighthouse Labs"
//         />
//         <nav></nav>
//       </section> */}
//       {/* <section className="schedule"> */}
//         {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
//       {/* </section> */}

//       <button onClick={()=>logData("Hello World") }>Test

//       </button>
//     </main>
//   );
// }
// import React from "react";
// import "components/Application.scss";
// import DayList from "./DayList";
// import Appointment from "./Appointment";
// import { getAppointmentsForDay,getInterview,getInterviewersForDay} from "../helpers/selectors";
// import useApplicationData from "hooks/useApplicationData";
// //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


// //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// export default function Application(props) {
//   const {state,setDay,bookInterview,cancelInterview} = useApplicationData()
  
//   const dailyAppointments = getAppointmentsForDay(state, state.day);
  
//   const dailyInterviews = getInterviewersForDay(state, state.day);
//  const schedule =  dailyAppointments.map(
//     (appointmentItem) => {
//       const interview = getInterview(state, appointmentItem.interview);
//       return (
//         <Appointment
//           key={appointmentItem.id}
//           id={appointmentItem.id}
//           time={appointmentItem.time}
//           interview={interview}
//           dailyInterviews = {dailyInterviews}
//           bookInterview = {bookInterview}
//           cancelInterview = {cancelInterview}
          
//         />
//       );
//     }
//   );
//   // const setDay = (nameOfDay) => {
//   //   setState({ ...state, day: nameOfDay });
//   //   console.log(`STATE:--${state} AND day:--${nameOfDay}`)
//   // };
//   return (
//     <main className="layout">
//       <section className="sidebar">
//         <img
//           className="sidebar--centered"
//           src="images/logo.png"
//           alt="Interview Scheduler"
//         />
//         <hr className="sidebar__separator sidebar--centered" />
//         <nav className="sidebar__menu">
//           <DayList days={state.days} value={state.day} onChange={setDay} />
//         </nav>
//         <img
//           className="sidebar__lhl sidebar--centered"
//           src="images/lhl.png"
//           alt="Lighthouse Labs"
//         />
//         <nav></nav>
//       </section>

//       <section className="schedule">
//         {schedule}
//         <Appointment key="last" time="5pm" />
//       </section>
//     </main>
//   );
// }
