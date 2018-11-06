import * as React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import Navbar from "../Navbar";

configure({ adapter: new Adapter() });

const clickFn = jest.fn();

describe("Navbar", () => {
  it("renders without crashing", () => {
    const component = shallow(<Navbar />);
    expect(component).toMatchSnapshot();
  });
  it("logo links to main page", () => {
    const component = shallow(<Navbar />);
    expect(component.find("Link").prop("to")).toBe("/");
  });
  it("value of input change state", () => {
    const component = shallow(<Navbar filter={clickFn} />);
    component.setState({ input: "" });

    component.find("input").simulate("change", {
      target: { value: "hello" }
    });
    expect(component.state("input")).toEqual("hello");
  });
});
