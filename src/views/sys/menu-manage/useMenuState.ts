import { useState } from 'react';
import { getAllPermissionList } from '@/api';
import useAxios from '@/hooks/useAxios';
import util from '@/libs/util';

const useUserState = () => {
  const { fetchData } = useAxios();
  const [isLoading, setIsLoading] = useState(false);
  const [permissionData, setPermissionData] = useState<IPermissionRes[]>([]);

  // 获取权限菜单列表数据
  const getPermissionData = async () => {
    setIsLoading(true);
    const res = await fetchData(getAllPermissionList);
    setIsLoading(false);
    if (!res) return;
    // 处理res数据
    util.addKey(res);
    console.log(res, 'key res');

    setPermissionData(res);
  };

  return {
    isLoading,
    permissionData,
    getPermissionData
  };
};

export default useUserState;
