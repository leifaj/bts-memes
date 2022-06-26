const express = require('express')
const PORT = process.env.PORT || 3000
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId; 
const cors = require('cors')
const path = require('path')
const cloudinary = require('cloudinary').v2
const multer = require('multer')
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { json } = require('express');
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

cloudinary.config({
  cloud_name: process.env.CL_CLOUDNAME,
  api_key: process.env.CL_KEY,
  api_secret: process.env.CL_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "bts-memes",
  },
});

const upload = multer({ storage: storage });

// Middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static(path.join(__dirname, "./client/build")));


// Read (Get)
app.get('/', (req, res) => {
  memeCollection.find().toArray()
  .then(data => {
    res.render('filter.ejs', { memeData: data })
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
    console.log(data)
    res.render('filter.ejs', { memeData: data })
  })
  .catch(err => console.error(err))
})

// Read (Get)
app.get('/add', (req, res) => {
  memeCollection.find().toArray()
  .then(data => {
    res.render('add.ejs', { memeData: data })
  })
  .catch(err => console.error(err))
})

// Create (Post)
app.post('/addMeme', upload.single('memeImage'), (req, res) => {
  memeCollection.insertOne({
    member: req.body.member,
    category: req.body.category,
    description: req.body.description,
    imageUrl: req.file.path,
    idCloudinary: req.file.filename
  })
  .then(result => {
    console.log('Meme added')
    // res.redirect('/')
    res.render('image', {
      member: req.body.member,
      category: req.body.category,
      description: req.body.description,
      imageUrl: req.file.path,
    });
  })
  .catch(err => console.log(err))
})

// Edit (Put)
// app.put('/editMeme', (req, res) => {
//   memeCollection.updateOne(
//     {_id: ObjectId(req.body.idDatabase)},
//     {$set: {
//       member: req.body.member.toLowerCase(),
//       category: req.body.category.toLowerCase(),
//       description: req.body.description,
//       tags: req.body.tags.toLowerCase(),
//       imageUrl: req.file.path,
//       idCloudinary: req.file.filename
//     }}
//   )
//   .then(result => {
//       console.log('Meme updated')
//       res.json('Meme updated')
//   })
//   .catch(err => console.log(err))
// })

// Delete
app.delete('/deleteMeme', (req, res) => {
  memeCollection.deleteOne({_id: ObjectId(req.body.idDatabase)})
  .then(result => {
    cloudinary.uploader.destroy(req.body.idCloudinary, (err, res) => console.log(err, res))
    console.log('Meme deleted')
    res.json('Meme deleted')
  })
  .catch(err => console.log(err))
})

// ROUTES --------------------------------

// Return all memes
// app.get('/searchMeme', (req, res) => {
// IMPLEMENT THIS!!!!!
// })

// Return all memes
app.get('/memes', (req, res) => {
  memeCollection.find().toArray()
  .then(data => {
    res.status(200).json(data)
  })
  .catch(err => console.error(err))
})

// Return meme by id
app.get('/memes/id/:id', (req, res) => {
  memeCollection.find({"_id": ObjectId(req.params.id)}).toArray()
  .then(data => {
    res.status(200).json(data)
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
    res.status(200).json(data)
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
    res.status(200).json(data)
  })
  .catch(err => console.error(err))
})

// Return a random meme
app.get('/memes/random', (req, res) => {
  memeCollection.aggregate([{ $sample: { size: 1 } }])
  .toArray()
  .then(data => {
    res.status(200).json(data)
  })
  .catch(err => console.error(err))
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`)
})