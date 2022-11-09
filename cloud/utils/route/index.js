const { createResponeByNotFound, createResponeByError } = require('../respone')

exports.Route = class Route {
  constructor(routes) {
    this.routes = routes
  }

  routes = []

  getRoute(url) {
    if (!url) return

    return this.routes.find(route => route.url === url)
  }

  async callRoute(url, ...args) {
    const route = this.getRoute(url)

    if (!route || !route.behavior) {
      return createResponeByNotFound()
    }

    try {
      return await route.behavior(...args)
    } catch (error) {
      console.log(error)

      return createResponeByError()
    }
  }
}
