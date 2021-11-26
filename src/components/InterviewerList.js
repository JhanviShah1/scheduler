import React from "react";
import "./InterviewerListItem";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props){



  // console.log("InterviewerList@@@@@@PROPS",props)
  // console.log("########PROPS.INTERVIEWER",props.interviewer)
  return(
    <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">
    {props.interviewers && props.interviewers.map(interviewer=>
    <InterviewerListItem
    key={interviewer.id}

    name={interviewer.name}
    avatar={interviewer.avatar}
    selected={interviewer.id===props.value}
    //setInterviewer={props.setInterviewer}
    setInterviewer={()=>
      props.onChange(interviewer.id)}

    />
      )}
  </ul>
</section>
  )

}