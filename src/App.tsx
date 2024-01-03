import { ConfigProvider } from 'antd';
import { useEffect } from 'react';
import { useRoutes, useLocation } from 'react-router-dom';
import BeforeEach from './router/beforeEach';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectRouters, setMenuList, setMenuData, insetRouter } from '@/store/reducers/appSlice';
import './app.scss';
import useInitRouter from './hooks/useInitRouter';

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const routers = useAppSelector(selectRouters);
  const { getMenuData, getDynamicRoutes } = useInitRouter();

  const initMainViewData = async () => {
    const res = await getMenuData();
    if (!res) return;
    // 将菜单数据添加到store中
    dispatch(setMenuData(res));
    // 将左侧菜单添加到store中
    dispatch(setMenuList(res[0].name));
    // 将后台返回封装好的routers添加到路由表中
    const newRouters = getDynamicRoutes(res);
    dispatch(insetRouter(newRouters));
  };
  // 获取数据
  useEffect(() => {
    initMainViewData();
  }, [location.pathname]);

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
