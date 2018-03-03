import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import ImDocNotFound from '../im-doc-not-found/ImDocNotFound';
import { QUICK_STARTED_TO } from './content/quick-stated/QuickStarted';
import asyncComponent from '../components/asyncComponent';

const AsyncImDocQuickStarted = asyncComponent(() => import('./content/quick-stated/QuickStarted'));

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Redirect exact={true} from="/doc" to={QUICK_STARTED_TO}/>
        <Route path={QUICK_STARTED_TO} component={AsyncImDocQuickStarted}/>
        <Route component={ImDocNotFound}/>
      </Switch>
    );
  }
}

export default Routes;
