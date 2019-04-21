const Koa = require('koa');

const app = new Koa();

app.use(async ctx => {
  ctx.body = 'hello xio';
});

const port = 3001;

app.listen(port, () => {
  console.log(`server listen in ${port}`);
});
