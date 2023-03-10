const user = require('../src/user')

const { Route } = require('@vneo/cloud-utils')

const route = new Route([
  {
    url: '/login',
    behavior: user.login
  },
  {
    url: '/addOrUpdate',
    behavior: user.addOrUpdate
  }
])

module.exports = route
