import Cookies from 'js-cookie';
import useAxios from './useAxios';
import { getMenuList } from '@/api';

const useInitRouter = () => {
  // 从store中获取是否已经获取菜单数据
  const hasMenuData = false;
  // 从store中获取是否已经添加新路由
  // const hasAddRouters = false;

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
    // 错误处理
    if (!res) return;
    console.log('');
    // dispatch修改store中的menuData
    // menuData.value = res.result || [];
    // 标识已经获取菜单数据
    // hasMenuData.value = true;
  };

  // 处理获得路由数据
  /* const getDynamicRoutes = (menuData: IMenuListRes[]) => {
    const dynamicRoutes = [];
    for (const item of menuData) {
      if (item.type === -1 && item.children) {
        handleRoute(dynamicRoutes, item);
      }
    }
    return dynamicRoutes;
  };

  // 将后台返回的数据封装为路由格式
  const handleRoute = (routes: never[], data: IMenuListRes) => {
    if (!data.children) return;
    for (const item of data.children) {
      const route: any = {};
      route.path = item.name;
      // menu.component = import(`@/views/${menu.component}.vue`);
      // level为1代表无需组件，只需重定向至home
      if (item.level === 1) {
        route.redirect = '/home';
      } else if (item.level === 2) {
        route.component = lazyLoading(item.component);
        // route.component = modules[`../../../views/${item.component}.vue`]
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
      meta.title = item.title
        ? item.title + ' - XBoot一站式前后端分离快速开发平台 By: Exrick'
        : null;
      meta.url = item.url ? item.url : null;
      route.meta = meta;
      routes.push(route);
    }
  }; */

  return {
    getMenuData
  };
};
export default useInitRouter;
