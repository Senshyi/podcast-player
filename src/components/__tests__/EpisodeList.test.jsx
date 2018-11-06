import * as React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import EpisodesList from "../EpisodesList";

configure({ adapter: new Adapter() });

const clickFn = jest.fn();

describe("EpisodesList", () => {
  it("renders without crashing with no props", () => {
    const component = shallow(<EpisodesList />);
    expect(component).toMatchSnapshot();
  });
  it("click on play icon trigger function", () => {
    const component = shallow(
      <EpisodesList
        episodes={[
          {
            image_url:
              "https://d1bm3dmew779uf.cloudfront.net/large/8cb05d3e119e13701ebb817a33cbcbba.jpg"
          }
        ]}
        selectEpisode={clickFn}
      />
    );
    component.find("i").simulate("click");
    expect(clickFn).toHaveBeenCalled();
  });
  it("clik on title link to episode details scene", () => {
    const component = shallow(
      <EpisodesList
        episodes={[{ title: "Podcast show", episode_id: "123456" }]}
      />
    );
    expect(component.find("Link").prop("to")).toBe("/episodes/123456");
  });
});
