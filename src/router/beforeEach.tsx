import { useLocation, useNavigate } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import Cookies from 'js-cookie';
import util from '@/libs/util';

// 定义组件 Props 的类型
interface MyComponentProps {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>> | null;
}

const beforeEach: React.FC<MyComponentProps> = ({ children }) => {
  // 拿到路由组件信息
  const navigate = useNavigate();
  const route = useLocation();

  const name = String(route.pathname);
  // 白名单
  const whiteList = [
    '/login',
    '/login-qr',
    '/register',
    '/register-result',
    '/relate',
    '/reset',
    '/authorize',
    '/test'
  ];

  // 监听路由变化：route.pathname
  useEffect(() => {
    const title =
      children?.props?.routeContext?.outlet?.props?.match?.route?.meta?.title ||
      children?.props?.match?.route?.meta?.title;
    util.title(String(title));
    const isInWhiteList = util.oneOf(name, whiteList);
    if (!Cookies.get('userInfo') && !isInWhiteList) {
      // 判断是否已经登录且页面不在白名单
      navigate('/login');
    } else if (Cookies.get('userInfo') && name === '/login') {
      // 判断是否已经登录且前往的是登录页
      util.title();
      navigate('/home');
    } else {
      // navigate('/home');
    }
    // console.log('afterEach');
  }, [name]);
  return (
    <>
      <Suspense fallback={<h1>loading...</h1>}>
        {/* 路由懒加载必须添加 Suspense */}
        {children}
      </Suspense>
    </>
  );
};
export default beforeEach;
