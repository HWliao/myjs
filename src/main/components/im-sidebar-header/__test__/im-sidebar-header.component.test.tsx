import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import ImSidebarHeader, { Props } from '../im-sidebar-header.component';

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
    expect(wrapper.hasClass('.jjsim-hd')).toBeTruthy();
    expect(wrapper);
  });
});
