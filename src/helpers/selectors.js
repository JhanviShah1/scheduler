export function getAppointmentsForDay(state, name) {
  const day = state.days.find((day) => day.name === name);
  if (day) {
    return Object.values(state.appointments).filter(
      (appointment) => day.appointments.indexOf(appointment.id) > -1
    );
  }
  return [];
}
export function getInterview(state, interview) {
  if (interview) {
    const studentName = interview.student;
    const interviewerId = interview.interviewer;
    //console.log(state.interviewers[interviewerId])

    return {
      student: studentName,
      interviewer: { ...state.interviewers[interviewerId] },
    };
  }
  return null;
}
export function getInterviewersForDay(state, name) {
  const day = state.days.find((day) => day.name === name);
  if (state.days.length === 0) {
    return [];
  }
  if (day) {
    return day.interviewers.map((interviewerId) => {
      return state.interviewers[interviewerId];
    });

    // return Object.values(state.appointments).filter(
    //   (appointment) => day.appointments.indexOf(appointment.id) > -1
    // );
  }
  return [];
}

//appointmentItem
// {
//   "id":1,
//   "time":"12pm",
//   "interview": {
//     "student": "Lydia Miller-Jones",
//     "interviewer": 1
//   }
// }

//state.interviewers
// interviewers: {
//   "1": {
//     "id": 1,
//     "name": "Sylvia Palmer",
//     "avatar": "https://i.imgur.com/LpaY82x.png"
//   },
//   "2": {
//     id: 2,
//     name: "Tori Malcolm",
//     avatar: "https://i.imgur.com/Nmx0Qxo.png"
//   }
// }
//output
// {
//   "student": "Lydia Miller-Jones",
//   "interviewer": {
//     "id": 1,
//     "name": "Sylvia Palmer",
//     "avatar": "https://i.imgur.com/LpaY82x.png"
//   }
// }
