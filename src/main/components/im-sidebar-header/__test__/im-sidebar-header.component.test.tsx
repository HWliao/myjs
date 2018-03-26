import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import ImSidebarHeader, { Props } from '../im-sidebar-header.component';
import ImShake from '../../im-shake/im-shake.component';

describe('im sidebar header component', () => {
  let wrapper: ShallowWrapper<Props>;
  beforeEach(() => {
    wrapper = shallow(
      <ImSidebarHeader
        title={'test'}
        shake={true}
        up={true}
        unread={10}
        onClick={() => console.log(1)}
      />
    );
  });
  it('should init', () => {
    expect(wrapper.hasClass('jjsim-hd')).toBeTruthy();
  });
  describe('ImShake', () => {
    it('should have prop shake true with shake true', () => {
      wrapper.setProps({shake: true});
      expect(wrapper.find(ImShake).prop('shake')).toBeTruthy();
    });
    it('should have prop shake false with shake false', () => {
      wrapper.setProps({shake: false});
      expect(wrapper.find(ImShake).prop('shake')).toBeFalsy();
    });
  });
  describe('unread num', () => {
    it('should not be hide with unread > 0', () => {
      wrapper.setProps({unread: 100});
      expect(wrapper.find('.jjsim-hd-num').text()).toEqual('100');
      expect(wrapper.find('.jjsim-hd-num').hasClass('hide')).toBeFalsy();
    });
    it('should be hide with unread <= 0', () => {
      wrapper.setProps({unread: 0});
      expect(wrapper.find('.jjsim-hd-num').text()).toEqual('0');
      expect(wrapper.find('.jjsim-hd-num').hasClass('hide')).toBeTruthy();
    });
  });
  describe('im-title', () => {
    it('should be props title', () => {
      wrapper.setProps({title: 't1'});
      expect(wrapper.find('.im-title').text()).toEqual('t1');
    });
  });
  describe('toggle title', () => {
    it('shoul be props toggleTitle', () => {
      wrapper.setProps({toggleTitle: 'toggleTitle'});
      expect(wrapper.find('.jjsim-hd-closebtn').prop('title')).toEqual('toggleTitle');
    });
  });
  describe('jjsim-hd-closebtn ', () => {
    it('should has sprite-down class,and not be hide with up to true', () => {
      wrapper.setProps({up: true});
      expect(wrapper.find('.jjsim-hd-closebtn').hasClass('sprite-down')).toBeTruthy();
      expect(wrapper.find('.jjsim-hd-closebtn').hasClass('hide')).toBeFalsy();
    });
    it('should has sprite-down class,and not be hide with up to true', () => {
      wrapper.setProps({up: false});
      expect(wrapper.find('.jjsim-hd-closebtn').hasClass('sprite-up')).toBeTruthy();
      expect(wrapper.find('.jjsim-hd-closebtn').hasClass('hide')).toBeTruthy();
    });
  });
  describe('click', () => {
    it('should trigger onCLick callback', () => {
      const spy = spyOn(console, 'log');
      wrapper.simulate('click');
      expect(spy).toBeCalled();
    });
  });
});
