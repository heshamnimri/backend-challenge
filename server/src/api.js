const koa = require('koa')
const cors = require('@koa/cors');
const router = require('./routes');
const koaBody = require('koa-body');
const PORT = 1234;

const app = new koa()

app.use(cors())
app.use(koaBody({ multipart: true }))
app.use(router.routes());
app.use(router.allowedMethods());

const server = app.listen(PORT)
console.log(`App starting API - listening on port ${PORT}`)

module.exports = { app }