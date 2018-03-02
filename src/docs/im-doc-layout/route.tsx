import * as React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import ImDocNotFound from '../im-doc-not-found/ImDocNotFound';
import asyncComponent from '../components/asyncComponent';

export function withLnk(to: string) {
  return (props: {}) => <Link to={to} {...props}/>;
}

export const HomeLink = withLnk('/');
export const DocLink = withLnk('/doc');

const AsyncImDocHome = asyncComponent(() => import('../im-doc-home/ImDocHome'));
const AsyncImDocMain = asyncComponent(() => import('../im-doc-main/ImDocMain'));
const AsyncLoading = asyncComponent(() => import('../components/Loading'));

export const Routes = () => (
  <Switch>
    <Route path="/" exact={true} component={AsyncImDocHome}/>
    <Route path="/doc" component={AsyncImDocMain}/>
    <Route path="/loading" component={AsyncLoading}/>
    <Route component={ImDocNotFound}/>
  </Switch>
);
