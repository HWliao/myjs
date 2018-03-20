import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import ImShake, { Props, State } from '../im-shake.component';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

describe('im shake component', () => {
  let wrapper: ShallowWrapper<Props, State>;
  let timer$: Subject<boolean>;
  beforeEach(() => {
    wrapper = shallow(
      <ImShake
        shake={false}
        interval={100}
      />
    );

    timer$ = new BehaviorSubject(true);
    spyOn(Observable, 'interval').and.returnValue(timer$);
  });
  it('should be init', () => {
    const instance = wrapper.instance() as ImShake;
    console.log(instance.getSubscription());
  });
});
