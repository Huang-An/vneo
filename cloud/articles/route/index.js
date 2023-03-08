const articles = require('../src/articles')

const { Route } = require('@vneo/cloud-utils')

const route = new Route([
  {
    url: '/list',
    behavior: articles.list
  },
  {
    url: '/add',
    behavior: articles.add
  },
  {
    url: '/likeOrCollect',
    behavior: articles.likeOrCollect
  }
])

module.exports = route
