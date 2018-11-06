import * as React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import Player from '../Player'

configure({ adapter: new Adapter() });

describe('Player', () => {
  it('renders without crashing', () => {
    shallow(<Player  episode={{}}/>)
  })
})