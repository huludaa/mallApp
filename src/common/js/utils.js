//获取本地存储的数据
export function getLocal(key) {
  return localStorage.getItem(key);
}

//设置本地存储的数据
export function setLocal(key, val) {
  return localStorage.setItem(key, val);
}

// 移除本地存储
export const removeLocal = (key) => {
  localStorage.removeItem(key);
};

// 清空本地存储
export const clearLocal = () => {
  localStorage.clear();
};
