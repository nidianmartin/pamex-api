const createError = require('http-errors');

module.exports.isAuthenticated = (req, _, next) => {
  if (req.session.user) {
    next()
  } else {
    console.log('Entrando aqui')
    next(createError(401))
  }
}

module.exports.isNotAuthenticated = (req, _, next) => {
  if (req.session.user) {
    console.log(req.session.user)
    next(createError(403))
  } else {
    next()
  }
}
