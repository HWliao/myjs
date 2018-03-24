import * as React from 'react';
import ImSidebarList, { Item, Props } from '../im-sidebar-list.component';
import { shallow, ShallowWrapper } from 'enzyme';

describe('im sidebar list', () => {
  let wrapper: ShallowWrapper<Props>;
  beforeEach(() => {
    wrapper = shallow(<ImSidebarList show={true} items={[]} onItemClick={() => console.log(1)}/>);
  });
  it('should init with no li', () => {
    expect(wrapper.hasClass('hide')).toBeFalsy();
    expect(wrapper.find('li').length).toEqual(0);
  });
  it('should has class hide with show false', () => {
    wrapper.setProps({show: false});
    expect(wrapper.hasClass('hide')).toBeTruthy();
  });
  it('should has 1 li with some property', () => {
    const items: Item[] = [{
      id: 'id',
      avatar: 'avatar',
      nick: 'nick',
      msg: 'msg',
      time: 'time',
      unread: 10,
      isCurr: true
    }];
    wrapper.setProps({items});
    expect(wrapper.find('li').length).toEqual(1);
    const li = wrapper.find('li');
    expect(li.hasClass('curr')).toBeTruthy();
    expect(li.key()).toEqual(items[0].id);

    expect(li.find('.jjsim-item-img img').length).toEqual(1);
    expect(li.find('.jjsim-item-img img').prop('src')).toEqual(items[0].avatar);

    expect(li.find('em.num').length).toEqual(1);
    expect(li.find('em.num').prop('title')).toEqual(String(items[0].unread));
    expect(li.find('em.num').text()).toEqual(String(items[0].unread));
    expect(li.find('em.num').prop('style')).toEqual({visibility: 'visible'});

    expect(li.find('.name').length).toEqual(1);
    expect(li.find('.name').prop('title')).toEqual(items[0].nick);
    expect(li.find('.name').text()).toEqual(items[0].nick);

    expect(li.find('.text').length).toEqual(1);
    expect(li.find('.text').prop('title')).toEqual(items[0].msg);
    expect(li.find('.text').text()).toEqual(items[0].msg);

    expect(li.find('.time').length).toEqual(1);
    expect(li.find('.time').prop('title')).toEqual(items[0].time);
    expect(li.find('.time').text()).toEqual(items[0].time);
  });
  it('should not be curr without isCurr: true', () => {
    const items: Item[] = [{
      id: 'id',
      avatar: 'avatar',
      nick: 'nick',
      msg: 'msg',
      time: 'time',
      unread: 0,
      isCurr: false
    }];
    wrapper.setProps({items});
    const li = wrapper.find('li');
    expect(li.find('em.num').prop('style')).toEqual({visibility: 'hidden'});
    expect(li.hasClass('curr')).toBeFalsy();
  });
});
