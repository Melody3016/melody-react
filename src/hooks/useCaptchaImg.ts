import { useEffect, useState } from 'react';
import { initCaptcha, drawCodeImage } from '@/api/index';
import useAxios from './useAxios';

const useCaptchaImg = () => {
  const [loadingCaptcha, setLoadingCaptcha] = useState(false);
  const [captchaImg, setCaptchaImg] = useState('');
  const [captchaId, setCaptchaId] = useState('');
  const { fetchData } = useAxios();

  const getCaptchaImg = async () => {
    // 获取验证码
    setLoadingCaptcha(true);
    const res = await fetchData(initCaptcha);
    if (res) {
      setCaptchaId(res);
      setCaptchaImg(drawCodeImage + res);
    }
    setLoadingCaptcha(false);
  };

  // 每60s刷新一次验证码
  useEffect(() => {
    getCaptchaImg();
    const refreshInterval = setInterval(() => {
      getCaptchaImg();
    }, 60000); // 每 60 秒刷新一次
    return () => {
      clearInterval(refreshInterval);
    };
  }, []);
  return { loadingCaptcha, captchaImg, captchaId, getCaptchaImg };
};
export default useCaptchaImg;
