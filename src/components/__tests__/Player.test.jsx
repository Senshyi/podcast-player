import * as React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import Player from "../Player";

configure({ adapter: new Adapter() });

const clickFn = jest.fn();

describe("Player", () => {
  it("renders without crashing", () => {
    const component = shallow(<Player episode={{}} />);
    expect(component).toMatchSnapshot();
  });
  it("click on icon next trigger a function", () => {
    const component = shallow(<Player episode={{}} next={clickFn} />);

    component.find(".fa-step-forward").simulate("click");
    expect(clickFn).toHaveBeenCalled();
  });
  it("click on icon previous trigger a function", () => {
    const component = shallow(<Player episode={{}} previous={clickFn} />);

    component.find(".fa-step-backward").simulate("click");
    expect(clickFn).toHaveBeenCalled();
  });
});
