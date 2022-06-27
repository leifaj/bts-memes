const deleteBtns = document.querySelectorAll('#deleteButton')
const randomBtn = document.querySelector('#randomButton')

Array.from(deleteBtns).forEach(btn => {
  btn.addEventListener('click', deleteMeme)
})

randomBtn.addEventListener('click', getRandomMeme)

async function deleteMeme(e) {
  const idDatabase = e.target.attributes['idDatabase'].value;
  const idCloudinary = e.target.attributes['idCloudinary'].value;
  try {
    const response = await fetch('deleteMeme', {
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'idDatabase': idDatabase,
        'idCloudinary': idCloudinary})
    })

    const data = await response.json()
    console.log(data)
    location.reload()

  } catch(err) {
    console.log(err)
  }
}
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