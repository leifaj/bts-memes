# BTS Memes API

## About
A RESTful API that uses HTTP requests to create, delete, and read bts meme images from a MongoDB database.
[Click here](https://bts-memes-api.herokuapp.com/) to view the public site.

### GET Endpoint (Public)
- This request returns memes from the MongoDB database. 
- The public site shows an example of how the memes can be filtered by member and category:
<img src="./public/assets/search-demo.gif" width="100%">

- The following GET requests can be made:

<table>
    <tr>
        <td>Endpoint</td>
        <td>Description</td>
    </tr>
    <tr>
        <td>GET/memes</td>
        <td>Return all memes</td>
    </tr>
    <tr>
        <td>GET/memes/member/:member</td>
        <td>Return array of memes by member</td>
    </tr>
    <tr>
        <td>GET/memes/category/:category</td>
        <td>Return array of memes by category</td>
    </tr>
    <tr>
        <td>GET/memes/random</td>
        <td>Return a random meme</td>
    </tr>
</table>

- Each resource object will come with:

<table>
    <tr>
        <td>Property</td>
        <td>Description</td>
    </tr>
    <tr>
        <td>member</td>
        <td>[String] Name of the BTS member in the meme.</td>
    </tr>
    <tr>
        <td>category</td>
        <td>[String] Category of the meme, usually an emotion or theme.</td>
    </tr>
    <tr>
        <td>description</td>
        <td>[String] (Optional) Description of the meme.</td>
    </tr>
    <tr>
        <td>imageUrl</td>
        <td>[String] URL of the meme image that is hosted on Cloudinary.</td>
    </tr>
</table>

### POST (not public): This request creates a new meme to store in MongoDB. In the example, a new meme is created with a form.
### DELETE (not public): This request deletes a meme from MongoDB. In the example, a meme is deleted with a button.


## How It's Made
**Tech used:** HTML, CSS, JavaScript, Node.js, Express, MongoDB, Cloudinary, Heroku

## Lessons Learned
- **Using MongoDB and Cloudinary** Instead of storing the images in the MongoDB database, I opted to store the image URL instead. When a POST request is made, the image is first uploaded via [Cloudinary](https://cloudinary.com/documentation/upload_images). The Cloudinary URL is then passed into the MongoDB database, along with any other meme details from the form. When a DELETE request is made, the image is deleted from Cloudinary. The meme information is also deleted from MongoDB. 