import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import ImDocNotFound from '../im-doc-not-found/ImDocNotFound';
import asyncComponent from '../components/asyncComponent';
import { QUICK_STARTED_TO, quickStartedData } from './content/quick-stated/data';
import { settingsData } from './content/settings/data';
import { methodData } from './content/method/data';

const AsyncImDocQuickStarted = asyncComponent(() => import('./content/quick-stated/QuickStarted'));

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Redirect exact={true} from="/doc" to={QUICK_STARTED_TO}/>
        {quickStartedData.items.map((item) => <Route key={item.to} path={item.to} component={item.component}/>)}
        {settingsData.items.map(item => <Route key={item.to} path={item.to} component={item.component}/>)}
        {methodData.items.map(item => <Route key={item.to} path={item.to} component={item.component}/>)}
        <Route path={QUICK_STARTED_TO} component={AsyncImDocQuickStarted}/>
        <Route component={ImDocNotFound}/>
      </Switch>
    );
  }
}

export default Routes;
