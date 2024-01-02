import Cookies from 'js-cookie';
import useAxios from './useAxios';
import { getMenuList } from '@/api';
import util from '@/libs/util';
import { selectHasAddRouters, selectHasMenuData, setHasMenuData } from '@/store/reducers/appSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

const useInitRouter = () => {
  const dispatch = useAppDispatch();
  // 从store中获取数据
  const hasMenuData = useAppSelector(selectHasMenuData);
  const hasAddRouters = useAppSelector(selectHasAddRouters);

  // 获取菜单数据
  const { fetchData } = useAxios();
  const getMenuData = async () => {
    // 判断用户是否登录
    const userInfo = Cookies.get('userInfo');
    if (!userInfo) {
      // 未登录
      return;
    }
    // 判断是否已经获取过菜单数据
    if (hasMenuData) return;
    // 获取菜单数据
    const res = await fetchData(getMenuList);
    // 标识已经获取菜单数据
    dispatch(setHasMenuData());
    return res;
  };

  // 处理获得路由数据
  const getDynamicRoutes = (menuData: IMenuListRes[]) => {
    console.log('hasAddRouters', hasAddRouters);

    // 判断是否已经添加路由
    if (hasAddRouters) return;
    const dynamicRoutes: any[] = [];
    for (const item of menuData) {
      if (item.type === -1 && item.children) {
        handleRoute(dynamicRoutes, item);
      }
    }
    return dynamicRoutes;
  };

  // 将后台返回的数据封装为路由格式
  const handleRoute = (routes: any[], data: IMenuListRes) => {
    if (!data.children) return;
    for (const item of data.children) {
      const route: any = {};
      route.path = item.name;
      // level为1代表无需配置路由
      if (item.level === 1) {
        // route.element = React.lazy(() => import('@/views/Main'));
        // route.element = util.lazyLoading('Main');
        // route.element = React.createElement(util.lazyLoading('Main'));
      }
      if (item.level === 2) {
        const element = util.lazyLoading(item.component);
        route.element = element;
        // route.lazy = util.lazyLoading(item.component);
      }

      if (item.children && item.children.length > 0) {
        route.children = [];
        handleRoute(route.children, item);
      }

      const meta: any = {};
      // 用于subMenu处于展示状态
      // const sub = item.component.split("/")[0]
      meta.sub = data.name;
      // 给页面添加权限、标题、第三方网页链接
      meta.permTypes = item.permTypes ? item.permTypes : null;
      meta.oriTitle = item.title;
      meta.title = item.title ? `${item.title} - 前后端分离快速开发平台` : null;
      meta.url = item.url ? item.url : null;
      route.meta = meta;
      routes.push(route);
    }
  };

  // 封装导航条navList数据
  const handleNavList = (data: IMenuListRes[]) => {
    if (!data) return;
    const navList: INav[] = [];
    // 类型 -1顶部菜单
    for (const item of data) {
      if (item.type === -1) {
        const nav = {
          name: item.name,
          title: item.title,
          icon: item.icon,
          isMenu: item.isMenu,
          url: item.url,
          description: item.description,
          component: item.component,
          localize: item.localize,
          i18n: item.i18n
        };
        navList.push(nav);
      }
    }
  };

  // 封装左侧菜单menuList数据
  /* const handleMenuList = (name: string | number, menuData: IMenuListRes[]) => {
    for (const item of menuData) {
      if (item.name == name) {
        // 过滤
        menuList.value = item.children || [];
      }
    }
    currNavName.value = name as string;
  }; */

  return {
    getMenuData,
    getDynamicRoutes
  };
};
export default useInitRouter;
