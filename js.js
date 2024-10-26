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

window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    
    // Set a minimum display time of 5 seconds (5000 milliseconds)
    setTimeout(function() {
        preloader.style.display = 'none';
    }, 1000); // 5000 ms = 5 seconds
});

window.addEventListener('load', () => {
    const content = document.querySelector('.content');
    content.classList.add('show'); // Apply the 'show' class to trigger the animation
});


