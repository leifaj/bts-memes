const randomBtn = document.querySelector('#randomButton')
randomBtn.addEventListener('click', getRandomMeme)

async function getRandomMeme(e) {
  try {
    const response = await fetch('/memes/random', {
      method: 'get',
      headers: {'Content-Type': 'application/json'},
    })

    const data = await response.json()
    document.querySelector("#memeImage").src = data.imageUrl;
    document.querySelector("#memeMember").innerHTML = data.member
    document.querySelector("#memeCategory").innerHTML = data.category
    document.querySelector("#memeDescription").innerHTML = data.description

  } catch(err) {
    console.log(err)
  }
}