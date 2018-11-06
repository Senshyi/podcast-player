import * as React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import EpisodeCard from '../EpisodeCard'

configure({ adapter: new Adapter() });

describe('EpisodeCard', () => {
  it('renders without crashing', () => {
    shallow(<EpisodeCard match={{ params: { episode_id: '16105972'}}}/>)
  })
})