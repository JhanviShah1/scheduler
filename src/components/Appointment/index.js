import React from "react";
import useVisualMode from "hooks/useVisualMode";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status"
import Confirm from "./Confirm"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"
const SAVING = "SAVING"
const DELETING = "DELETING"
const CONFIRM  = "CONFIRM"


export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(student,selectedInterviewer){
    const interview = {
      student:student,
      interviewer : selectedInterviewer
    }
    
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(()=>{
      transition(SHOW)
    })
  
  }
  function deleteInterview(name,interviewer){
    
    transition(DELETING)
    
    props.cancelInterview(props.id)
    .then(()=>{
      transition(EMPTY)
    })
  }
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          //deleteInterview={deleteInterview}
          deleteInterview={()=>transition(CONFIRM)}
        />
      )}
      {mode===CREATE && <Form onSave={save} interviewers={props.dailyInterviews} onCancel={()=> back()}/>}
      {mode === SAVING && <Status text={"saving"}/>}
      {mode === DELETING && <Status text={"deleting"}/>}
      {mode=== CONFIRM && <Confirm onCancel={()=> back()} 
      onConfirm={deleteInterview}/>}
      
    </article>
  );
}
//["S","C","D"]
