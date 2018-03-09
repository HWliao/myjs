import * as React from 'react';
import { ImLayoutContainer, mapDispatchToProps, mapStateToProps, Props } from '../im-layout.container';
import { shallow, ShallowWrapper } from 'enzyme';
import { BaseState, RootState } from '../../../store/reducers';
import { fromJS } from 'immutable';
import { Dispatch } from 'redux';

describe('im-layout container', () => {

  describe('component', () => {
    let wrapper: ShallowWrapper<Props>;
    beforeEach(() => {
      wrapper = shallow(<ImLayoutContainer show={false} up={false}/>);
    });

    it('should have a div with jjsim-shandow class', () => {
      expect(wrapper.hostNodes().at(0).type()).toEqual('div');
      expect(wrapper.find('.jjsim-shandow').length).toEqual(1);
    });

    it('should toggle hide class when show props changed', () => {
      expect(wrapper.hasClass('hide')).toBeTruthy();
      wrapper.setProps({show: true, up: false});
      expect(wrapper.hasClass('hide')).toBeFalsy();
    });

    it('should toggle im-fold class when up props changed', () => {
      expect(wrapper.hasClass('im-fold')).toBeTruthy();
      wrapper.setProps({show: false, up: true});
      expect(wrapper.hasClass('im-fold')).toBeFalsy();
    });
  });

  describe('mapStateToProps', () => {
    it('should get the right props from state', () => {
      const state: RootState = fromJS({
        layout: {
          show: false,
          up: false
        }
      });

      const targetProps: Props = {
        show: false,
        up: false
      };

      const getProps = mapStateToProps(state);
      expect(getProps).toEqual(targetProps);
    });
  });

  describe('mapDispatchToProps', () => {
    it('should get the right props from dispatch event', () => {
      const dispatch: Dispatch<BaseState> = dispatchMock;
      const targetProps = {};
      const props = mapDispatchToProps(dispatch);
      expect(props).toEqual(targetProps);
    });
  });
});

function dispatchMock<T>(action: T): T {
  return action;
}
