import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
//********************************************************/

export default function Form(props) {
  const { onCancel, interviewers, onSave } = props;
  const [student, setStudent] = useState(props.student || "");
  const [selectedInterviewer, setInterviewer] = useState(
    props.selectedInterviewerId || null
  );
  const [error, setError] = useState("");

  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("")
    onSave(student, selectedInterviewer);
  }

  const reset = () => {
    setStudent("");
    setInterviewer(null);
  };
  const cancel = () => {
    onCancel();

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
            data-testid="student-name-input"
            onChange={(event) => setStudent(event.target.value)}
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={interviewers}
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
            //onClick={() => onSave(student, selectedInterviewer)}
            onClick={validate}
          >
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
