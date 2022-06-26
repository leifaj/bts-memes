const deleteBtns = document.querySelectorAll('#deleteButton')

Array.from(deleteBtns).forEach(btn => {
  btn.addEventListener('click', deleteMeme)
})

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