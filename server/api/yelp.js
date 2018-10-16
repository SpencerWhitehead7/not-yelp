const router = require(`express`).Router()
const axios = require(`axios`)
/* eslint-disable global-require */
const YELP_AUTH_STR = process.env.YELP_AUTH_STR || require(`../../secrets`)
/* eslint-enable global-require */

// GET /api/yelp
router.get(`/`, async (req, res, next) => {
  try{
    const authConfig = {headers : {Authorization : YELP_AUTH_STR}}
    const {data} = await axios.get(
      `https://api.yelp.com/v3/businesses/search${req.query.queryString}`,
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
