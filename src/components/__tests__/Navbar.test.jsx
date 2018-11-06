import * as React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import Navbar from "../Navbar";

configure({ adapter: new Adapter() });

describe("Navbar", () => {
  it("renders without crashing", () => {
    const component = shallow(<Navbar />);
    expect(component).toMatchSnapshot();
  });
  it("logo links to main page", () => {
    const component = shallow(<Navbar />);
    expect(component.find("Link").prop("to")).toBe("/");
  });
});
