import { loginReq } from '@/api';
import useAxios from '@/hooks/useAxios';

const useLogin = () => {
  // 账户密码登录
  const loginByAccount = async (formValues: ILoginParam, captchaId: string) => {
    const { fetchData } = useAxios();
    // 登录
    const params = {
      ...formValues,
      captchaId
    };
    const res = await fetchData(params => loginReq(params as ILoginParam), params);
    return res;
  };

  // 手机短信登录
  const loginByMobile = () => {};
  return {
    loginByAccount,
    loginByMobile
  };
};

export default useLogin;
