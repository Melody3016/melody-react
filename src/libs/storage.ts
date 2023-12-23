/**
 * 存储localStorage
 */
export const setStore = (name: string, content: any) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
};

/**
 * 获取localStorage
 */
export const getStore = (name: string) => {
  if (!name) return;
  const v = window.localStorage.getItem(name);
  if (v == null) {
    return '';
  }
  return v;
};

/**
 * 删除localStorage
 */
export const removeStore = (name: string) => {
  if (!name) return;
  window.localStorage.removeItem(name);
};
