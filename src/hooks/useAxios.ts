import Cookies from 'js-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import { message as Message } from 'antd';
import { setStore } from '@/libs/storage';

const useAxios = () => {
  // const [res, setRes] = useState<T>();
  const location = useLocation();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const { code, message, result } = await fetchFunc(params);

  //       // 处理返回的数据
  //       // // 根据返回的code值来做不同的处理(和后端约定)
  //       switch (code) {
  //         case 302:
  //           break;
  //         case 401:
  //           // 未登录 清除已登录状态
  //           Cookies.set('userInfo', '');
  //           setStore('accessToken', '');
  //           if (location.pathname !== 'login') {
  //             if (message !== null) {
  //               Message.error(message);
  //             } else {
  //               Message.error('未知错误，请重新登录');
  //             }
  //             navigate('/login');
  //           }
  //           break;
  //         case 403:
  //           // 没有权限
  //           if (message !== null) {
  //             Message.error(message);
  //           } else {
  //             Message.error('未知错误');
  //           }
  //           break;
  //         case 500:
  //           // 错误
  //           if (message !== null) {
  //             Message.error(message);
  //           } else {
  //             Message.error('未知错误');
  //           }
  //           break;
  //         default:
  //           setRes(result);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const fetchData = async <T, R = any>(fetchFunc: (p?: R) => Promise<IData<T>>, params?: R) => {
    try {
      const { code, message, result } = await fetchFunc(params);

      // 处理返回的数据
      // // 根据返回的code值来做不同的处理(和后端约定)
      switch (code) {
        case 302:
          break;
        case 401:
          // 未登录 清除已登录状态
          Cookies.set('userInfo', '');
          setStore('accessToken', '');
          if (location.pathname !== 'login') {
            if (message !== null) {
              Message.error(message);
            } else {
              Message.error('未知错误，请重新登录');
            }
            navigate('/login');
          }
          break;
        case 403:
          // 没有权限
          if (message !== null) {
            Message.error(message);
          } else {
            Message.error('未知错误');
          }
          break;
        case 500:
          // 错误
          if (message !== null) {
            Message.error(message);
          } else {
            Message.error('未知错误');
          }
          break;
        default:
          return result;
      }
    } catch (error) {
      // Message.error(String(error));
      console.error('useAxios error:', error);
    }
  };

  return { fetchData };
};

export default useAxios;
