let darkmode = localStorage.getItem('darkmode')
const themeswitch = document.getElementById('themeswitch') // Use the correct ID

const enableDarkmode = () => {
    document.body.classList.add('darkmode')
    localStorage.setItem('darkmode', 'active')
}

const disableDarkmode = () => {
    document.body.classList.remove('darkmode')
    localStorage.setItem('darkmode', null)
}

if(darkmode === "active") enableDarkmode()

themeswitch.addEventListener("click", () => {
    darkmode = localStorage.getItem('darkmode')
    darkmode = localStorage.getItem('darkmode')
    if (darkmode !== "active") {
        enableDarkmode()
    } else {
        disableDarkmode()
    }
})
