'use strict';

const router = require('koa-router')();

const postController = require('./v1/post');

router
  .get('/v1/posts', postController.fetch)


module.exports = router;
