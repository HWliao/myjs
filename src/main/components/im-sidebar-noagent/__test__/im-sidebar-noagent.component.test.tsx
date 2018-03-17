import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import ImSidebarNoagent, { Props } from '../im-sidebar-noagent.component';

describe('im sidebar noagent', () => {
  let wrapper: ShallowWrapper<Props>;
  beforeEach(() => {
    wrapper = shallow(<ImSidebarNoagent show={true} title={'test'}/>);
  });
  it('should be init', () => {
    expect(wrapper.hasClass('hide')).toBeFalsy();
    expect(wrapper.find('i').length).toEqual(1);
    expect(wrapper.find('p').text()).toEqual('test');
  });
  it('should be chagne props', () => {
    wrapper.setProps({
      show: false,
      title: 'test1'
    });
    expect(wrapper.hasClass('hide')).toBeTruthy();
    expect(wrapper.find('p').text()).toEqual('test1');
  });
});
