const router = require(`express`).Router()
const tokenApiRoute = require(`./tokenApiRoute`)

// /api/tokenApiRoute
router.use(`/tokenApiRoute`, tokenApiRoute)

// 404 response
router.use((req, res, next) => {
  const err = new Error(`Route Not Found`)
  err.status = 404
  next(err)
})

module.exports = router
