import React from "react";
import axios from "axios";

import {
  render,
  cleanup,
  waitForElement,
  getByText,
  prettyDOM,
  queryByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { fireEvent } from "@testing-library/react/dist";

import Application from "components/Application";
import { exportAllDeclaration } from "@babel/types";

afterEach(cleanup);

describe("application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />); //it is linked to App component
    await waitForElement(() => getByText("Monday"));
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container} = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");

    const appointment = appointments[0];
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller Jones" },
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "saving")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller Jones"));
    const dayListsItems = getAllByTestId(container, "day");
    const dayListsItem = dayListsItems.find((dayHTML) =>
      queryByText(dayHTML, "Monday")
    );

    expect(getByText(dayListsItem, "no spots remaining")).toBeInTheDocument();
  });
  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];
    fireEvent.click(getByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(
      getByText(appointment, "Delete the appointment?")
    ).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "deleting")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElementToBeRemoved(() => getByText(appointment, "deleting"));
    expect(getByAltText(appointment, "Add")).toBeInTheDocument();

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const dayListsItems = getAllByTestId(container, "day");
    const dayListsItem = dayListsItems.find((dayHTML) =>
      queryByText(dayHTML, "Monday")
    );
    expect(getByText(dayListsItem, "2 spots remaining")).toBeInTheDocument();
  });
  it("loads data, edits an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    //We want to start by finding an existing interview.
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];

    //With the existing interview we want to find the edit button.
    expect(getByAltText(appointment, "Edit")).toBeInTheDocument();

    //We change the name and save the interview.
    fireEvent.click(getByAltText(appointment, "Edit"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Jones" },
    });

    //We change the name and save the interview.
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "saving")).toBeInTheDocument();
    await waitForElementToBeRemoved(() => getByText(appointment, "saving"));
    expect(getByText(appointment, "Jones")).toBeInTheDocument();

    //We don't want the spots to change for "Monday", since this is an edit.
    const dayListsItems = getAllByTestId(container, "day");

    const dayListsItem = dayListsItems.find((dayHTML) =>
      queryByText(dayHTML, "Monday")
    );

    expect(getByText(dayListsItem, "1 spot remaining")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");

    const appointment = appointments[0];
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller Jones" },
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "saving")).toBeInTheDocument();
    await waitForElementToBeRemoved(() => getByText(appointment, "saving"));

    expect(
      getByText(appointment, /Could not save the appointment/i)
    ).toBeInTheDocument();
    
    fireEvent.click(getByAltText(appointment, "Close"));

    expect(
      queryByText(appointment, "Could not save the appointment")
    ).not.toBeInTheDocument();
    const dayListsItems = getAllByTestId(container, "day");

    const dayListsItem = dayListsItems.find((dayHTML) =>
      queryByText(dayHTML, "Monday")
    );

    expect(getByText(dayListsItem, "1 spot remaining")).toBeInTheDocument();
  });
  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];

    fireEvent.click(getByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(
      getByText(appointment, "Delete the appointment?")
    ).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));

    await waitForElement(() =>
      getByText(appointment, "Could not delete the appointment")
    );
    
  });
});
