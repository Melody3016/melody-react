// import Cookies from 'js-cookie';
import { createBrowserRouter } from 'react-router-dom';
import { routers } from './router';
// import util from '../libs/util';

const router = createBrowserRouter(routers);

// 使用 useRoutes 包装路由
// const routeElement = useRoutes(routers);
// routeElement.pathname;

/* router.beforeEach((to, from, next) => {
  util.title(String(to.meta.title));
  const name = String(to.name);
  // 白名单
  const whiteList = [
    'login',
    'login-qr',
    'register',
    'register-result',
    'relate',
    'reset',
    'authorize',
    'test'
  ];
  const isInWhiteList = util.oneOf(name, whiteList);
  if (!Cookies.get('userInfo') && !isInWhiteList) {
    // 判断是否已经登录且页面不在白名单
    next({
      name: 'login'
    });
  } else if (Cookies.get('userInfo') && name == 'login') {
    // 判断是否已经登录且前往的是登录页
    util.title();
    next({
      name: 'home_index'
    });
  } else {
    util.toDefaultPage([...routers], name, router, next);
  }
}); */

/* router.afterEach(() => {
  // util.openNewPage(router.app, to.name, to.params, to.query);
  window.scrollTo(0, 0);
}); */

export default router;
