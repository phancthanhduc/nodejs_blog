const path = require('path')
const express = require('express')
const handlebars = require('express-handlebars')
const morgan = require('morgan')
const app = express()
const port = 3000
const routes = require('./routes')

//use static files
app.use(express.static(path.join(__dirname, 'public/')))

app.use(express.urlencoded({extended:true}))
app.use(express.json())
//Http logger
// app.use(morgan('combined'))

//Template engine
app.engine('hbs', handlebars.engine({extname: '.hbs'}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources/views'))


// app.get('/', (req, res) => {
//   res.render('home')
// })

// app.get('/search', (req, res) => {
//   res.render('search')
// })

// app.post('/search', (req, res) => {
//   console.log(req.body)
//   res.render('search')
// })
routes(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})