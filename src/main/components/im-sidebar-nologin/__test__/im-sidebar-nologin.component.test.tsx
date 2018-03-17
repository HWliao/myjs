import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import ImSidebarNologin, { Props } from '../im-sidebar-nologin.component';

describe('im sidebar nologin component', () => {
  let wrapper: ShallowWrapper<Props>;
  beforeEach(() => {
    wrapper = shallow(<ImSidebarNologin show={true} title={'test'} onToLogin={() => console.log(1)}/>);
  });
  describe('hide class in root div', () => {
    it('should exist with show property to true', () => {
      wrapper.setProps({show: true});
      expect(wrapper.hasClass('hide')).toBeFalsy();
    });
    it('should not exist with show property to false', () => {
      wrapper.setProps({show: false});
      expect(wrapper.hasClass('hide')).toBeTruthy();
    });
  });
  describe('chart ico', () => {
    it('should have a i element with class sprite sprite-chart', () => {
      expect(wrapper.find('i.sprite.sprite-chart').length).toEqual(1);
    });
  });
  describe('tile', () => {
    it('should have a p element with text title', () => {
      wrapper.setProps({title: 'title'});
      expect(wrapper.find('p').length).toEqual(1);
      expect(wrapper.find('p').text()).toEqual('title');
    });
  });

  describe('btn click', () => {
    it('should trigger callback', () => {
      expect(wrapper.find('a').length).toEqual(1);
      const spy = spyOn(console, 'log');
      wrapper.find('a').simulate('click');
      expect(spy).toBeCalled();
    });
  });
});
