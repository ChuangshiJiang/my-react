import { lazy } from 'react';

export default RouteConfig = [
  {
    path:'',
    component: lazy(()=> import('@/page/index'))
  }
];