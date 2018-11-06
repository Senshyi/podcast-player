import * as React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import Navbar from '../Navbar'

configure({ adapter: new Adapter() });

describe('Navbar', () => {
  it('renders without crashing', () => {
    shallow(<Navbar />)
  })
})