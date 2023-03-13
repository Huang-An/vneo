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
    url: '/remove',
    behavior: articles.remove
  },
  {
    url: '/details',
    behavior: articles.details
  }
])

module.exports = route
