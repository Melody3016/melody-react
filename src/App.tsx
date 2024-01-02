import { ConfigProvider } from 'antd';
import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import BeforeEach from './router/beforeEach';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { insetRouter, selectRouters, setMenuList } from '@/store/reducers/appSlice';
import './app.scss';
import useInitRouter from './hooks/useInitRouter';

function App() {
  const dispatch = useAppDispatch();
  const routers = useAppSelector(selectRouters);
  const { getMenuData, getDynamicRoutes, handleMenuList } = useInitRouter();

  useEffect(() => {
    const getRouters = async () => {
      const res = await getMenuData();
      if (!res) return;
      const newRouters = getDynamicRoutes(res);
      // 将后台返回封装好的routers添加到路由表中
      dispatch(insetRouter(newRouters));
      // 将左侧菜单添加到store中
      const menuList = handleMenuList(res[0].name, res);
      dispatch(setMenuList(menuList));
    };
    getRouters();
  }, []);

  console.log('app.tsx ==> routers', routers);
  const element = useRoutes(routers);
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token，影响范围大
          colorPrimary: '#0074a6'
        }
      }}
    >
      {/* <BeforeEach>{element}</BeforeEach> */}
      <BeforeEach>{element}</BeforeEach>
    </ConfigProvider>
  );
}

export default App;
