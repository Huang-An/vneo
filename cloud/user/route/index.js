const user = require('../src/user')

const { Route } = require('@vneo/cloud-utils')

const route = new Route([
  {
    url: '/login',
    behavior: user.login
  },
  {
    url: '/register',
    behavior: user.register
  },
  {
    url: '/update',
    behavior: user.update
  }
])

module.exports = route
