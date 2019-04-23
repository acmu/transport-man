const a = async () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(1);
    }, 1000);
  });
};

const b = async () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(2);
    }, 1000);
  });
};

const c = async () => {
  console.log('object');
  const x = await a();
  console.log(x, '--');
  const y = await b();
  console.log(y, '-=0-');
};

c();
