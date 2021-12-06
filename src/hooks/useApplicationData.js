import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
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

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = state.days.map((d) => {
      if (d.name === state.day) {
        //console.log("---------", d);
        return { ...d, spots: d.spots + 1 };
      } else {
        //console.log("---------", d);
        return d;
      }
    });
    return axios.delete("/api/appointments/" + id).then((res) => {
      setState({
        ...state,
        appointments: appointments,
        days: days,
      });
    });
  }
  function bookInterview(id, interview, isNewInterview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    let days = [...state.days];
    if (isNewInterview) {
      days = state.days.map((d) => {
        if (d.name === state.day) {
          return { ...d, spots: d.spots - 1 };
        } else {
          return d;
        }
      });
    }
    // const daysCopy = []
    // for(let d of state.days){
    //   if(d.name===state.day){
    //     daysCopy.push({...d,spots:d.spots-1})
    //   }else{
    //     daysCopy.push(d)
    //   }
    // }
    return axios
      .put("/api/appointments/" + id, appointment)
      .then((res) => {
        setState({
          ...state,
          appointments,
          days,
        });
      })
      .catch((error) => {
        throw error;
      });
  }
  return { state, setDay, bookInterview, cancelInterview };
}
