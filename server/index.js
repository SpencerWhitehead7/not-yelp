const express = require(`express`)
const volleyball = require(`volleyball`)
const path = require(`path`)

const app = express()

// Logging middleware
app.use(volleyball)

// Body parsing middleware
app.use(express.json())
app.use(express.urlencoded({extended : true}))

// Static file serving middleware
app.use(express.static(path.join(__dirname, `../public`)))

// API requests
app.use(`/api`, require(`./api`))

// All other requests
app.get(`*`, (req, res) => {
  res.sendFile(path.join(__dirname, `../public/index.html`))
})

// 404 response
app.use((req, res, next) => {
  const err = new Error(`Page Not Found`)
  err.status = 404
  next(err)
})

// Error handling endware
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500)
  res.send(err.message || `Internal Server Error`)
})

// Define port
const PORT = process.env.PORT || 1337

// Start server
app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}\n`))
