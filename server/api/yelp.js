const router = require(`express`).Router()
const axios = require(`axios`)
const YELP_AUTH_STR = require(process.env.YELP_AUTH_STR || `../../secrets`)

// GET /api/yelp/:city
router.get(`/:city`, async (req, res, next) => {
  try{
    const city = req.params.city
    const authConfig = {headers : {Authorization : YELP_AUTH_STR}}
    const {data} = await axios.get(
      `https://api.yelp.com/v3/businesses/search?categories=restaurants&location=${city}`,
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
