const router = require(`express`).Router()
const axios = require(`axios`)
const YELP_AUTH_STR = require(process.env.YELP_AUTH_STR || `../../secrets`)

// GET /api/yelp
router.get(`/`, async (req, res, next) => {
  try{
    let queryString = `?categories=restaurants`
    Object.keys(req.query).forEach(key => {
      queryString += `&${key}=${req.query[key]}`
    })
    const authConfig = {headers : {Authorization : YELP_AUTH_STR}}
    const {data} = await axios.get(
      `https://api.yelp.com/v3/businesses/search${queryString}`,
      authConfig
    )
    res.json(data)
  }catch(err){
    if(err.response.status === 400){
      res.status(400).send()
    }else{
      next(err)
    }
  }
})

module.exports = router
