'use strict';

const postProxy = require('../proxy').Post;

/**
 * @api {get} /v1/post 请求文章列表
 * @apiName get
 * @apiGroup Post
 *
 * @apiParam {Number} page 第几页.
 * @apiParam {Number} limit 每页数据条数.
 *
 * @apiSuccess {Array} list Array of post.
 */

exports.fetch = async (ctx, next) => {
  let limit = ctx.query.limit || 10;
  let offset = ctx.query.offset || 0;

  ctx.body = await postProxy.fetchPosts(limit, offset);
};
