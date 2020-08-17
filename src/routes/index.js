import React from 'react';
import { Redirect } from 'react-router-dom';
import Home from '../application/Home/';
import Rank from '../application/Rank/';
import Recommend from '../application/Recommend/';
import Singers from '../application/Singers/';
import Test from '../test.js';
import Album from '../application/Album';

export default [
  {
    path: '/',
    component: Home,
    routes: [
      {
        path: '/',
        exact: true,
        render: () => {
          return (
            <Redirect to={"/recommend"}></Redirect>
          )
        }
      },
      {
        path: '/recommend',
        component: Recommend,
        routes: [
          {
            path: "/recommend/:id",
            component: Album
          }
        ]
      },
      {
        path: '/singers',
        component: Singers
      },
      {
        path: '/rank',
        component: Rank
      },
      {
        path: '/test',
        component: Test
      }
    ]
  }
]