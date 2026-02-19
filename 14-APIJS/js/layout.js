const views = document.querySelectorAll("main")
let currentView = 0 // [0 - 4]

// Buttons & Anchors
const btnLogin = document.querySelector(".btn-login")
const btnLogout = document.querySelector(".btn-logout")
const btnBacks = document.querySelectorAll(".btn-back")
const btnAdd = document.querySelector(".btn-add")
const btnEdits = document.querySelectorAll(".btn-edit")
const btnSave = document.querySelector(".btn-save")
const btnCancels = document.querySelectorAll(".btn-cancel")
const btnShows = document.querySelectorAll(".btn-show")

btnLogin.addEventListener("click", () => {
    currentView = 1
    showView()
})

btnLogout.addEventListener("click", () => {
    currentView = 0
    showView()
})

btnAdd.addEventListener("click", () => {
    currentView = 2
    showView()
})

btnBacks.forEach(element => {
    element.addEventListener('click', () => {
        currentView = 1
        showView()
    })
})

btnShows.forEach(element => {
    element.addEventListener('click', () => {
        currentView = 4
        showView()
    })
})

btnEdits.forEach(element => {
    element.addEventListener('click', () => {
        currentView = 3
        showView()
    })
})

btnCancels.forEach(element => {
    element.addEventListener('click', () => {
        currentView = 1
        showView()
    })
})

function showView() {
    views.forEach(element => {
        element.classList.remove("animateView")
        element.style.display = "none"
    })
    views[currentView].classList.add('animateView')
    views[currentView].style.display = "block"
}
showView()

