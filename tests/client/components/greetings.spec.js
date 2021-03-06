import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import Greetings from '../../../client/components/greetings';

function setup() {
  return shallow(<Greetings />);
}

describe('Greetings', () => {
  it('renders the h3 tag', () => {
    const wrapper = setup();
    expect(wrapper.find('h3').length).toEqual(1);
  });
  it('renders two images', () => {
    const wrapper = setup();
    expect(wrapper.find('img').length).toEqual(2);
  });
  it('renders divs', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(7);
  });
  it('renders a h4 tag', () => {
    const wrapper = setup();
    expect(wrapper.find('h4').length).toBe(1);
  });
});

