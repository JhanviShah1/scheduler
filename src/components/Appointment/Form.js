import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
//********************************************************/

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [selectedInterviewer, setInterviewer] = useState(
    props.selectedInterviewerId || null
  );
//console.log("Student=",student, "SelectedInterviewer ==", selectedInterviewer)
  const reset = () => {
    setStudent("");
    setInterviewer(null);
  };
  const cancel = () => {
    props.onCancel();

    reset();
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={student}
            placeholder="Enter Student Name"
            onChange={(event) => setStudent(event.target.value)}
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          onChange={setInterviewer}
          value={selectedInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button
            confirm
            onClick={() => props.onSave(student, selectedInterviewer)}
          >
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
