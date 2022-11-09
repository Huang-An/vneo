const route = require('./route')

exports.main = async (event, context) => {
  const { url, params } = event

  return await route.callRoute(url, params, event, context)
}
