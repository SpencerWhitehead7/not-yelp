const router = require(`express`).Router()
const yelp = require(`./yelp`)

// /api/yelp
router.use(`/yelp`, yelp)

// 404 response
router.use((req, res, next) => {
  const err = new Error(`Route Not Found`)
  err.status = 404
  next(err)
})

module.exports = router
