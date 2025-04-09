//获取本地存储的数据
export function getLocal(key) {
  return localStorage.getItem(key);
}

//设置本地存储的数据
export function setLocal(key, val) {
  return localStorage.setItem(key, val);
}

//删除本地存储的数据
export function removeLocal(key) {
  return localStorage.removeItem(key);
}
