import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { userInfo } from '@/api';
import useAxios from '@/hooks/useAxios';
import { setStore } from '@/libs/storage';

const useAfterLogin = () => {
  const navigate = useNavigate();
  const { fetchData } = useAxios();
  const afterLogin = async (token: string, saveLogin = false) => {
    // 登录成功，获取到token，获取用户信息，进行路由动态加载
    setStore('accessToken', token);
    // 获取用户信息
    const res = await fetchData(userInfo);
    if (!res) return;
    // 避免超过大小限制
    delete res.permissions;
    // 当前用户拥有的角色
    const roles: string[] = [];
    res.roles?.forEach(e => {
      roles.push(e.name);
    });
    delete res.roles;
    // 本地存储
    setStore('roles', roles);
    setStore('saveLogin', saveLogin);
    setStore('userInfo', res);
    // 设置cookie
    if (saveLogin) {
      // 保存7天
      Cookies.set('userInfo', JSON.stringify(res), {
        expires: 7
      });
    } else {
      Cookies.set('userInfo', JSON.stringify(res));
    }
    // result存入store中
    // const { setUserInfo } = useUserStore();
    // setUserInfo(res.result);
    // 加载菜单
    // util.initRouter(this)
    // window.location.reload();
    // instance?.proxy?.$router.push({
    //   name: 'HomeIndex'
    // });
    navigate('/home');
  };

  return {
    afterLogin
  };
};
export default useAfterLogin;
