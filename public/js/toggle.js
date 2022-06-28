const toggleBtns = document.querySelectorAll('#toggleButton')

Array.from(toggleBtns).forEach(btn => {
  btn.addEventListener('click', toggleInfo)
})

function toggleInfo(e) {
  const memeImg = e.target.previousElementSibling
  const memeInfo = e.target.nextElementSibling

  console.log(memeImg)
  console.log(memeInfo)

  if (memeImg.classList.contains("darkenMeme")) {
    memeImg.classList.remove("darkenMeme")
    e.target.innerHTML = "Show Info"
  } else {
    memeImg.classList.add("darkenMeme")
    e.target.innerHTML = "Hide Info"
  }

  if (memeInfo.classList.contains("showInfo")) {
    memeInfo.classList.remove("showInfo")
  } else {
    memeInfo.classList.add("showInfo")
  }
}
