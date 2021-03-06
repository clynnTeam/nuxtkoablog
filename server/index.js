import Koa from 'koa'
import { Nuxt, Builder } from 'nuxt'
import bodyParser from 'koa-bodyparser'

let config = require('../nuxt.config.js')

Object.assign(process.env, config.env)
process.env.mysqlConfig = JSON.stringify(config.env.mysqlConfig)

const app = new Koa()
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3001

app.use(bodyParser())

let api = require('./api/index')
app.use(api.routes())

async function start() {
  // Import and Set Nuxt.js options
  
  config.dev = !(app.env === 'production')

  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.use(async (ctx, next) => {
    await next()
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset
    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject)
      })
    })
  })

  app.listen(port)
  console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
}

if (true) {
  start()
} else {
  app.listen(port)
}
