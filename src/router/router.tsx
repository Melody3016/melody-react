import React from 'react';
// import util from '@/libs/util';
// import Main from '@/views/Main';
// import Login from '@/views/auth/login';

/* const example = {
  path: '/',
  element: '<Root />',
  children: [
    {
      path: 'contact',
      element: '<Contact />'
    },
    {
      path: 'dashboard',
      element: '<Dashboard />',
      loader: ({ request }) =>
        fetch('/api/dashboard.json', {
          signal: request.signal
        })
    },
    {
      element: '<AuthLayout />',
      children: [
        {
          path: 'login',
          element: '<Login />',
          loader: 'redirectIfUser'
        },
        {
          path: 'logout',
          action: 'logoutUser'
        }
      ]
    }
  ]
}; */
/* interface RouteObject {
  path?: string;
  index?: boolean;
  children?: React.ReactNode;
  caseSensitive?: boolean;
  id?: string;
  loader?: LoaderFunction;
  action?: ActionFunction;
  element?: React.ReactNode | null;
  hydrateFallbackElement?: React.ReactNode | null;
  errorElement?: React.ReactNode | null;
  Component?: React.ComponentType | null;
  HydrateFallback?: React.ComponentType | null;
  ErrorBoundary?: React.ComponentType | null;
  handle?: RouteObject["handle"];
  shouldRevalidate?: ShouldRevalidateFunction;
  lazy?: LazyRouteFunction<RouteObject>;
} */

// 不作为Main组件的子页面展示的页面单独写，如下
// 测试路由
const LazyTest = React.lazy(() => import('@/views/Test'));
export const testRouter = {
  path: '/test',
  meta: {
    title: '测试 - react版本前后端分离快速开发平台'
  },
  // lazy: () => import('@/views/Test')
  element: <LazyTest />
};

const LazyLogin = React.lazy(() => import('@/views/auth/login'));
export const loginRouter = {
  path: '/login',
  meta: {
    title: '登录 - react版本前后端分离快速开发平台'
  },
  element: <LazyLogin />
};

/* export const loginQRRouter = {
  path: '/login-qr',
  name: 'login-qr',
  meta: {
    title: '扫码登录 - vue3版本前后端分离快速开发平台 '
  },
  component: () => import('@/views/auth/login-qr.vue')
};

export const registRouter = {
  path: '/register',
  name: 'register',
  meta: {
    title: '注册 - vue3版本前后端分离快速开发平台'
  },
  component: () => import('@/views/auth/register.vue')
};

export const registResult = {
  path: '/register-result',
  name: 'register-result',
  meta: {
    title: '注册结果 - vue3版本前后端分离快速开发平台'
  },
  component: () => import('@/views/auth/register-result.vue')
};

export const reset = {
  path: '/reset',
  name: 'reset',
  meta: {
    title: '重置密码 - vue3版本前后端分离快速开发平台'
  },
  component: () => import('@/views/auth/reset.vue')
}; */

/* export const relateRouter = {
  path: '/relate',
  name: 'relate',
  meta: {
    title: '绑定账号 - XBoot前后端分离开发平台 '
  },
  component: () => import('@/views/auth/relate.vue')
}; */

/* export const authorizeRouter = {
  path: '/authorize',
  name: 'authorize',
  meta: {
    title: 'XBoot统一认证平台 - XBoot前后端分离开发平台 '
  },
  component: () => import('@/views/auth/authorize.vue')
}; */

// export const page404 = {
//     path: '/*',
//     name: 'error-404',
//     meta: {
//         title: '404-页面不存在'
//     },
//     component: () => import('@/views/error-page/404.vue')
// };

/* export const page403 = {
  path: '/403',
  meta: {
    title: '403-权限不足'
  },
  name: 'error-403',
  component: () => import('@/views/error-page/403.vue')
}; */

/* export const page500 = {
  path: '/500',
  meta: {
    title: '500-服务端错误'
  },
  name: 'error-500',
  component: () => import('@/views/error-page/500.vue')
}; */

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
// const RedirectComponent = () => <Navigate to="/home" replace />;
// const LazyHome = React.lazy(() => import('@/views/home/Home'));
// export const otherRouter: RouteObject = {
//   path: '/',
//   loader: ({ request }) => {
//     if (new URL(request.url).pathname === '/') {
//       return redirect('/home');
//     }
//     return null;
//   },
//   // redirect: '/home',
//   element: <Main />,
//   children: [
//     {
//       path: 'home',
//       /* action: () => {
//         util.title('首页 - react版本前后端分离快速开发平台');
//       },
//       loader: () => ({
//         localize: true,
//         i18n: 'home'
//       }),
//       lazy: () => import('@/views/home/Home') */
//       element: <LazyHome />
//     }
//     /*  {
//       path: 'ownspace',
//       title: '个人中心',
//       name: 'ownspace_index',
//       component: () => import('@/views/own-space/own-space.vue')
//     },
//     {
//       path: 'message',
//       title: '消息中心',
//       name: 'message_index',
//       component: () => import('@/views/message/message.vue')
//     },
//     {
//       path: 'add',
//       title: '添加',
//       name: 'add',
//       component: () => import('@/views/xboot-vue-template/new-window/add.vue')
//     },
//     {
//       path: 'edit',
//       title: '编辑',
//       name: 'edit',
//       component: () => import('@/views/xboot-vue-template/new-window/edit.vue')
//     },
//     {
//       path: 'leave',
//       title: '请假申请',
//       name: 'leave',
//       component: () => import('@/views/activiti/business/leave.vue')
//     },
//     {
//       path: 'historic-detail',
//       title: '流程进度历史详情',
//       name: 'historic_detail',
//       component: () => import('@/views/activiti/historic-detail/historicDetail.vue')
//     } */
//   ]
// };

export const appRouter = [];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
  testRouter,
  loginRouter,
  // loginQRRouter,
  // registRouter,
  // registResult,
  // reset,
  //   relateRouter,
  //   authorizeRouter,
  // otherRouter,
  ...appRouter
  //   page500,
  //   page403
];
