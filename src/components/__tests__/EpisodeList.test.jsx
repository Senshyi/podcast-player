import * as React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import EpisodesList from '../EpisodesList'

configure({ adapter: new Adapter() });

describe('EpisodesList', () => {
  it('renders without crashing', () => {
    shallow(<EpisodesList />)
  })
})