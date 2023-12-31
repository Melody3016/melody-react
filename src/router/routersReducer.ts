import util from '@/libs/util';

const routersReducer = (routers, action) => {
  switch (action.type) {
    case 'ADD_ROUTERS': {
      // 深拷贝routers
      const newRouters = util.deepClone(routers);
      // 将后台返回封装好的routers添加到路由表中
      for (const item of action.data) {
        newRouters[newRouters.length - 1].children.push(item);
      }
      break;
    }
    default: {
      throw Error(`Unknown action: ${action.type}`);
    }
  }
};
export default routersReducer;
