import React, { Suspense } from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import Routes from './routeConfig';
import ErrorPage from '@/page/Error/404';

export default function Routes () {
  return (
    <Suspense>
      <Switch>
        {
          Routes.map((route, index) => {
            if (!!route.routeComp) {
              return routeComp;
            }
            if (!!route.redirect) {
              return <Redirect exact key={'redirect_' + index} from={route.from} to={route.to}></Redirect>
            }
            return <Route key={'route_' + index} path={route.path} component={route.component}></Route>
          })
        }
        <Route path="*" component={ErrorPage}></Route>
      </Switch>
    </Suspense>
  )
}