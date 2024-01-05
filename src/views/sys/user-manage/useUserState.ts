import { useState } from 'react';
import { getUserListData } from '@/api';
import useAxios from '@/hooks/useAxios';

const useUserState = () => {
  const { fetchData } = useAxios();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<IUserInfoRes[]>([]);
  // 总数，用于分页器
  const [total, setTotal] = useState(0);

  // 获取用户列表数据
  const getUserData = async (searchObj: IUserListParam) => {
    setIsLoading(true);
    const res = await fetchData(params => getUserListData(params as IUserListParam), searchObj);
    setIsLoading(false);
    if (!res) return;
    // 处理res数据
    res.content.forEach(item => {
      item.key = item.id;
    });
    setUserData(res.content);
    setTotal(res.totalElements);
  };

  return {
    isLoading,
    total,
    userData,
    getUserData
  };
};

export default useUserState;
