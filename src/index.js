const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000
const handlebars = require('express-handlebars')
const path = require('path')
const route = require('./route')
const methodOverride = require('method-override')
app.use(express.json());
app.use(express.urlencoded());

const db = require('./config/db')
db.connect()
app.use(methodOverride('_method'))

app.use(express.static(path.join(__dirname, 'public')))


app.engine('hbs', handlebars({
  extname: '.hbs'
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname,'resources','views'))

app.use(morgan('combined'))

//route init
route(app)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})




