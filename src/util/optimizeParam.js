const optimizeParam = obj => {
  // 对象内 string 删去空格
  const newObj = {};
  Object.keys(obj).forEach(v => {
    newObj[v] = obj[v] && obj[v].trim();
  });
  return newObj;
};

export default optimizeParam;
