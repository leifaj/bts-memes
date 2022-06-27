const express = require('express')
const PORT = process.env.PORT || 3000;
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId; 
const app = express()
querystring = require('querystring')
url = require('url')
require('dotenv').config()

let db, memeCollection
let dbConnectionStr = process.env.DB_STRING
let dbName = 'bts-memes'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
  .then(client => {
    console.log(`Connected to ${dbName} database.`)
    db = client.db(dbName)
    memeCollection = db.collection('memes')
  })

// Middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Read (Get)
app.get('/', (req, res) => {
  memeCollection.find().toArray()
  .then(data => {
    res.render('index.ejs', { memeData: data })
  })
  .catch(err => console.error(err))
})

// Filter
app.get('/filter', (req, res) => {
  const queryObj = url.parse(req.url, true).query
  const query = JSON.parse(JSON.stringify(queryObj))
  if (query.member === "All") {delete query.member}
  if (query.category === "All") {delete query.category}

  memeCollection.find(
    {...query},
    { collation: // case insensitive index
      { 
      locale: 'en', 
      strength: 2 
      }
    }
  ).toArray()
  .then(data => {
    res.render('filter.ejs', { memeData: data })
  })
  .catch(err => console.error(err))
})

// PUBLIC API ROUTES --------------------------------

// Return all memes
app.get('/memes', (req, res) => {
  memeCollection.find().toArray()
  .then(data => {
    res.status(200).json({"member": data[0].member,
    "category": data[0].category,
    "description": data[0].description,
    "imageUrl": data[0].imageUrl})
  })
  .catch(err => console.error(err))
})

// Return array of memes by member
app.get('/memes/member/:member', (req, res) => {
  memeCollection.find(
    {"member": req.params.member},
    { collation: // case insensitive index
      { 
      locale: 'en', 
      strength: 2 
      }
    }
  ).toArray()
  .then(data => {
    res.status(200).json({"member": data[0].member,
    "category": data[0].category,
    "description": data[0].description,
    "imageUrl": data[0].imageUrl})
  })
  .catch(err => console.error(err))
})

// Return array of memes by category
app.get('/memes/category/:category', (req, res) => {
  memeCollection.find(
    {"category": req.params.category},
    { collation: // case insensitive index
      { 
      locale: 'en', 
      strength: 2 
      }
    }
  ).toArray()
  .then(data => {
    res.status(200).json({"member": data[0].member,
    "category": data[0].category,
    "description": data[0].description,
    "imageUrl": data[0].imageUrl})
  })
  .catch(err => console.error(err))
})

// Return a random meme
app.get('/memes/random', (req, res) => {
  memeCollection.aggregate([{ $sample: { size: 1 } }])
  .toArray()
  .then(data => {
    res.status(200).json({"member": data[0].member,
      "category": data[0].category,
      "description": data[0].description,
      "imageUrl": data[0].imageUrl})
  })
  .catch(err => console.error(err))
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`)
})