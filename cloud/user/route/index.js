const login = require('../src/login')

const { Route } = require('@vneo/cloud-utils')

const route = new Route([
  {
    url: '/login',
    behavior: login.login
  }
])

module.exports = route
