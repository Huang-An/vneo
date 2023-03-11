const app = require('../src/app')

const { Route } = require('@vneo/cloud-utils')

const route = new Route([
  {
    url: '/config',
    behavior: app.config
  }
])

module.exports = route
