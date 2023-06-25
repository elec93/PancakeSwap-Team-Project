const modal = document.querySelector("#settings-modal")
const options = document.querySelectorAll(".nav-options")
const opacity = document.querySelector(".modal-fade")
const btns = document.querySelectorAll("#settings-modal .settings-modal-container .settings-modal-main .settings-modal-options:last-child button")
const swtichers = document.querySelectorAll("#settings-modal .settings-modal-container .settings-modal-main .settings-modal-options .color-scheme-switcher.preserve .color-scheme-switcher-bubble")

function close(element) {
    const svg = document.querySelector(".settings-modal-header .settings-modal-close")
    const util = []
    util.push(opacity, svg)
    util.forEach((el) => {
        el.addEventListener("click", () => {
            element.classList.remove("active")
            element.classList.add("deactive")
            opacity.classList.remove("active")
            opacity.classList.add("deactive")
        })
    });
}

options.forEach((option) => {
    option.addEventListener("click", () => {
        modal.classList.remove("deactive")
        modal.classList.toggle("active")
        opacity.classList.remove("deactive")
        opacity.classList.toggle("active")
    })
})

close(modal)

// buttons logic

btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        for (let buttons of btns){
            buttons.classList.add("deactive")
        }
        btn.classList.toggle("deactive")
    })
})

//switcher logic

swtichers.forEach((switcher) => {
    switcher.addEventListener("click", () => {
        switcher.classList.toggle("active")
        switcher.classList.toggle("deactive")
        switcher.parentNode.classList.toggle("active")
        switcher.parentNode.classList.toggle("deactive")
    })
})