const Router = require('koa-router');

const imageRouter = require('./images');

const router = new Router();

router.get('/', (ctx, next) => {
    ctx.body = {
      apiStatus: 'active',
    };
});
  

router.use(imageRouter.routes())

module.exports = router;