import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import useInitRouter from '@/hooks/useInitRouter';
import { RoutersContext, SetRoutersContext } from '@/router/RoutersContext';
import util from '@/libs/util';

const Main: React.FC = () => {
  // const routers = useContext(RoutersContext);
  // const setRouters = useContext(SetRoutersContext);
  const { getMenuData } = useInitRouter();

  useEffect(() => {
    const getRouters = async () => {
      // const r = await getMenuData();
      // if (!r) return;
      // console.log(r);
      // // dispatch({
      // //   type: 'ADD_ROUTERS',
      // //   data: dynamicRoutes
      // // });
      // // 深拷贝routers
      // const newRouters = util.deepClone(routers);
      // // 将后台返回封装好的routers添加到路由表中
      // for (const item of r) {
      //   newRouters[newRouters.length - 1].children.push(item);
      // }
      // console.log('newRouters', newRouters);
      // setRouters(newRouters);
    };
    getRouters();
  }, []);

  return (
    <div className='main'>
      <h1>This is Main</h1>
      <br />
      <Outlet />
    </div>
  );
};
export default Main;
