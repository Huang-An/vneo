const articlesLikeCollect = require('../src/articles-like-collect')

const { Route } = require('@vneo/cloud-utils')

const route = new Route([
  {
    url: '/list',
    behavior: articlesLikeCollect.list
  },
  {
    url: '/add',
    behavior: articlesLikeCollect.add
  },
  {
    url: '/remove',
    behavior: articlesLikeCollect.remove
  }
])

module.exports = route
