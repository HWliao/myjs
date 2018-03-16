import * as React from 'react';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/do';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

interface Props {
  /**
   * 是否闪动
   */
  shake: boolean;
  interval?: number;
}

interface State {
  /**
   * 是否可见
   */
  visible: boolean;
}

/**
 * 包装组件进行闪动
 */
class ImShakeComponent extends React.PureComponent<Props, State> {
  /**
   * 定时器
   */
  private timer$: Subject<boolean>;
  /**
   * 订阅
   */
  private subscription: Subscription;

  constructor(props: Props) {
    super(props);
    // 初始化可见
    this.state = {visible: true};
    // 初始化定时器
    this.timer$ = new BehaviorSubject(this.props.shake);
  }

  render() {
    return (
      <div style={{visibility: this.state.visible ? 'visible' : 'hidden'}}>
        {this.props.children}
      </div>
    );
  }

  componentDidMount() {
    // 定时器流监听,根据是否闪动返回interval流或者固定值
    this.subscription = this.timer$
      .switchMap((shake) => {
        if (shake) {
          return Observable.interval(this.props.interval || 1000).scan((curr) => !curr, true);
        }
        return Observable.of(true);
      })
      .do((visible: boolean) => {
        this.setState({visible});
      })
      .subscribe();
  }

  componentWillUnmount() {
    if (this.subscription) {
      // 取消监听
      this.subscription.unsubscribe();
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.shake !== this.props.shake || this.props.interval !== nextProps.interval) {
      // 有属性变化触发定时器流
      this.timer$.next(nextProps.shake);
    }
  }
}

export default ImShakeComponent;
