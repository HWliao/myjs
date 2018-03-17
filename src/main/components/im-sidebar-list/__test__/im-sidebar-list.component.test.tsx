import * as React from 'react';
import ImSidebarList, { Props } from '../im-sidebar-list.component';
import { shallow, ShallowWrapper } from 'enzyme';

describe('im sidebar list', () => {
  let wrapper: ShallowWrapper<Props>;
  beforeEach(() => {
    wrapper = shallow(<ImSidebarList show={true} items={[]}/>);
  });
  it('should init with no li', () => {
    expect(wrapper.hasClass('hide')).toBeFalsy();
    expect(wrapper.find('li').length).toEqual(0);
  });
  it('should has class hide with show false', () => {

  });
});
