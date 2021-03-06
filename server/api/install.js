import { writeFile, readFile } from '../tools'

const router = require('koa-router')()
const _ = require('lodash')
const moment = require('moment')
let db = require('../../util/db')
var filepath = './server/config/config.js'

router.get('/', async (ctx, next) => {
  let sql = 'select * from options'
  let res = await db.query(sql)
  if (res.err && res.notInstalled) {
    ctx.status = 200
    ctx.body = {
      code: 201,
      message: 'not installed',
      notInstalled: true
    }
  } else {
    ctx.status = 200
    ctx.body = {
      code: 200
    }
  }
})

// 执行数据库安装操作
router.post('/installtable', async (ctx, next) => {
  let sql = 'select * from options'
  let res = await db.query(sql)
  if (!res.err || !res.notInstalle) {
    ctx.status = 200
    ctx.body = `It's already installed`
    return
  }

  let create = require('../config/sql/create')
  let initdata = require('../config/sql/initdata')

  var results = []
  for (let i in create) {
    var result = await db.query(create[i])
    if (!result.err) {
      if (create[i].indexOf('DROP') > -1) {
        results.push('删除' + i.replace('drop', '') + '成功！')
      } else {
        results.push('创建' + i + '成功！')
      }
    }
  }
  for (let i in initdata) {
    var result = await db.query(initdata[i])
    if (!result.err) {
      results.push('插入初始化数据' + i + '成功！')
    }
  }

  ctx.status = 200
  ctx.body = results
})

module.exports = router
