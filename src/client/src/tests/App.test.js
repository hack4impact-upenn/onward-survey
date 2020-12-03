import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

// import component or page units
import Main from '../pages/Main';
import Dashboard from '../pages/Dashboard';

it('renders without crashing', () => {
  shallow(<Main />);
  shallow(<Dashboard />);
});
