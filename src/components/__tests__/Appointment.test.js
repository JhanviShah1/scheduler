import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "../Appointment";

afterEach(cleanup);
describe("Appointment", () => {
  render(<Appointment />);
});
it("renders without crashing", () => {
});