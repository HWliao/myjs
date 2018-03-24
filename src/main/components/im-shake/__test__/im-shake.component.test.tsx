import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import ImShake, { Props, State } from '../im-shake.component';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import Spy = jasmine.Spy;

describe('im shake component', () => {
  let wrapper: ShallowWrapper<Props, State>;
  let timer$: Subject<boolean>;
  let intervalSpy: Spy;
  beforeEach(() => {
    wrapper = shallow(
      <ImShake
        shake={false}
        interval={100}
      />
    );

    timer$ = new BehaviorSubject(true);
    intervalSpy = spyOn(Observable, 'interval').and.returnValue(timer$);
  });
  it('should be init', () => {
    expect(wrapper.type()).toEqual('div');
  });
  describe('set shake to true', () => {
    it('should toggle the div"s style visibility with interval', () => {
      wrapper.setProps({shake: true});
      expect(intervalSpy).lastCalledWith(100);
      const v1 = wrapper.state('visible');
      expect(wrapper.prop('style')).toHaveProperty('visibility', v1 ? 'visible' : 'hidden');
      timer$.next();
      wrapper.update();
      expect(wrapper.state('visible')).toEqual(!v1);
      expect(wrapper.prop('style')).toHaveProperty('visibility', !v1 ? 'visible' : 'hidden');
    });
  });
  describe('unmount component', () => {
    it('should called unsubscribe', () => {
      const instance = wrapper.instance() as ImShake;
      const spy = spyOn(instance.getSubscription(), 'unsubscribe');
      wrapper.unmount();
      expect(spy).toBeCalled();
    });
  });
});
