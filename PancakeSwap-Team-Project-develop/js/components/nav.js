import { hasScrolledDown } from "../utils/hasScrolledDown.js"

const nav = document.querySelectorAll(".nav-top")
let lastKnownPos = 0
const bottom_items = document.querySelectorAll(".nav-mobile .nav-bottom-items")

function removeDropdown(bottom_items) {
    bottom_items.forEach((item) => {
        try {
            const dropdown = item.querySelector(".nav-util-js")
            console.log(dropdown)
            dropdown.classList.remove("nav-util-js")
            dropdown.classList.add("nav-dropdown")
        } catch {

        }

    })
}

function removeOpacity(opacities) {
    opacities.forEach((item) => {
        try {
            item.style.visibility = "hidden"
            item.style.opacity = "0"
        } catch {

        }

    })
}

document.addEventListener("scroll", (evt) => {
    let top
    if (hasScrolledDown(lastKnownPos, window.scrollY)) {
        top = "-56px"
    } else {
        top = "0"
    }
    nav.forEach((nav) => {
        nav.style.top = top
    })
    lastKnownPos = window.scrollY
})


const opacities = document.querySelectorAll(".nav-mobile .nav-hidden-opacity")

bottom_items.forEach((item, i) => {
    item.addEventListener("click", (evt) => {
        console.log(evt.currentTarget)
        const dropdown = evt.currentTarget.querySelector(".nav-dropdown")
        removeDropdown(bottom_items)
        removeOpacity(opacities)
        console.log(opacities[i])
        opacities[i - 1].style.visibility = "visible"
        opacities[i - 1].style.opacity = "0.3"
        dropdown.classList.add("nav-util-js")
        dropdown.classList.remove("nav-dropdown")
        dropdown.style.left = `${i * 16 - 16}px`
    })
})
const main = document.getElementsByTagName("main")[0]
opacities.forEach((opacity) => {
    opacity.addEventListener("click", (evt) => {
        evt.stopPropagation()
        removeDropdown(bottom_items)
        removeOpacity(opacities)
    })
})
const languageSwitcher = document.querySelectorAll(".nav-language-switcher")
main.addEventListener("click", () => {
    languageSwitcher.forEach((el) => {
        el.querySelector(".options-selection").style.opacity = ""
        el.querySelector(".options-selection").style.maxHeight = ""
        el.querySelector(".options-selection").style.transition = ""
        el.querySelector(".options-selection").style.top = ""
        el.querySelector(".options-selection").style.overflowY = ""
    })
})


languageSwitcher.forEach((el) => {
    el.addEventListener("click", () => {
        el.querySelector(".options-selection").style.opacity = "1"
        el.querySelector(".options-selection").style.maxHeight = "400px"
        el.querySelector(".options-selection").style.transition = "opacity 0.3s ease-in-out 0s"
        el.querySelector(".options-selection").style.top = "40px"
        el.querySelector(".options-selection").style.overflowY = "auto"
        el.querySelector(".options-selection").style.pointerEvents = "auto"
    })
})