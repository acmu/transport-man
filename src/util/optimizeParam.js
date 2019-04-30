/**
 * 删除 obj 中 string 类型的前后空格
 * @param {Objec} obj Form的values
 */
const optimizeParam = obj => {
  // 对象内 string 删去空格
  const newObj = {};
  Object.keys(obj).forEach(v => {
    newObj[v] = typeof obj[v] === 'string' ? obj[v].trim() : obj[v];
  });
  return newObj;
};

export default optimizeParam;
