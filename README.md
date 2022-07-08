# BTS Memes API

## About
A RESTful API that uses HTTP requests to create, delete, and read bts meme images from a MongoDB database.
[Click here](https://bts-memes-api.herokuapp.com/) to view the public site.

**The public api allows GET requests to view images from the MongoDB database.**
- GET (read): This request returns memes from the MongoDB database. In the public site, the memes can be filtered by member, category, or both.
<img src="./public/assets/search-demo.gif" width="100%">

**The public api does not offer POST or DELETE requests, but these are implemented in a private tool shown below:**
- POST (create): This request creates a new meme to store in MongoDB. In the example, a new meme is created with a form. 
- DELETE: This request deletes a meme from MongoDB. In the example, a meme is deleted with a button.


## How It's Made
**Tech used:** HTML, CSS, JavaScript, Node.js, Express, MongoDB, Cloudinary, Heroku

## Lessons Learned
- **Using MongoDB and Cloudinary** Instead of storing the images in the MongoDB database, I opted to store the image URL instead. When a POST request is made, the image is first uploaded via [Cloudinary](https://cloudinary.com/documentation/upload_images). The Cloudinary URL is then passed into the MongoDB database, along with any other meme details from the form. When a DELETE request is made, the image is deleted from Cloudinary. The meme information is also deleted from MongoDB. 