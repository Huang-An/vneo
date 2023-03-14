const articlesComment = require('../src/articles-comment')

const { Route } = require('@vneo/cloud-utils')

const route = new Route([
  {
    url: '/list',
    behavior: articlesComment.list
  },
  {
    url: '/add',
    behavior: articlesComment.add
  },
  {
    url: '/remove',
    behavior: articlesComment.remove
  }
])

module.exports = route
