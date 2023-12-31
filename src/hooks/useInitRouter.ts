import Cookies from 'js-cookie';
import React, { useState } from 'react';
import useAxios from './useAxios';
import { getMenuList } from '@/api';
import util from '@/libs/util';
import Main from '@/views/Main';

const useInitRouter = () => {
  // 从store中获取是否已经获取菜单数据
  const hasMenuData = false;
  // 从store中获取是否已经添加新路由
  // const hasAddRouters = false;
  const [dynamicRoutes, setDynamicRoutes] = useState([]);

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
    // const res = await fetchData(getMenuList);
    const res = [
      {
        id: '125909152017944576',
        parentId: '0',
        name: 'xboot',
        showAlways: true,
        level: 0,
        type: -1,
        title: 'XBoot管理系统',
        path: '',
        component: 'normal',
        icon: 'md-home',
        isMenu: true,
        url: '',
        localize: true,
        i18n: 'xbootAdmin',
        description: 'undefined',
        buttonType: '',
        children: [
          {
            id: '5129710648430592',
            parentId: '125909152017944576',
            name: 'sys',
            showAlways: true,
            level: 1,
            type: 0,
            title: '系统管理',
            path: '/sys',
            component: 'Main',
            icon: 'ios-settings',
            isMenu: true,
            url: '',
            localize: false,
            i18n: null,
            description: '',
            buttonType: '',
            children: [
              {
                id: '5129710648430593',
                parentId: '5129710648430592',
                name: 'user-manage',
                showAlways: true,
                level: 2,
                type: 0,
                title: '用户管理',
                path: 'user-manage',
                component: 'sys/user-manage/userManage',
                icon: 'md-person',
                isMenu: true,
                url: '',
                localize: false,
                i18n: '',
                description: '',
                buttonType: '',
                children: null,
                permTypes: []
              }
            ],
            permTypes: null
          }
        ],
        permTypes: null
      }
    ];
    // 错误处理
    // if (!res) return;
    // setDynamicRoutes(getDynamicRoutes(res));
    // const r = getDynamicRoutes(res);
    // console.log('r', r);
    // return r;
    // console.log(getDynamicRoutes(res));
    // dispatch修改store中的menuData
    // menuData.value = res.result || [];
    // 标识已经获取菜单数据
    // hasMenuData.value = true;
  };

  // 处理获得路由数据
  const getDynamicRoutes = (menuData: IMenuListRes[]) => {
    const dynamicRoutes = [];
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
        const element = util.lazyLoading('Main');
        route.element = React.createElement(element);
      }
      if (item.level === 2) {
        const element = util.lazyLoading(item.component);
        route.element = React.createElement(element);
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

  return {
    getMenuData,
    dynamicRoutes
  };
};
export default useInitRouter;
