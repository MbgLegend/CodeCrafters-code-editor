import { toggleFaq } from './javaScript/faq.js'
import {  validateEmail } from './javaScript/validateEmail.js'
import { startQuiz } from './javaScript/quiz.js'

const menu = document.getElementById("menu")
const closeMenu = document.getElementById("close")
const navbarContent = document.querySelector("nav ul")
const navbarLinks = document.querySelectorAll("nav ul li a")

const faqHeaders = document.querySelectorAll("#Faq .box .header")

const newsletterInput = document.getElementById("email")
const newsletterSubmit = document.getElementById("subscribe")

const quizStartButtons = document.querySelectorAll("#quiz .btn")

function openNavbar(){
    navbarContent.classList.add("active")
}

function closeNavbar(){
    navbarContent.classList.remove("active")
}

document.addEventListener("DOMContentLoaded", () => {
    navbarLinks.forEach(link => {
        link.addEventListener("click", closeNavbar)
    })
    
    menu.onclick = openNavbar
    closeMenu.onclick = closeNavbar
    
    window.addEventListener("resize", () => {
        closeNavbar()
    })
    
    window.addEventListener("scroll", () => {
        closeNavbar()
    })
    
    window.onload = () => {
        newsletterSubmit.addEventListener("click", () => {
            validateEmail(newsletterInput.value)
        })
    }
    
    faqHeaders.forEach(faq => faq.addEventListener("click", toggleFaq))

    if (quizStartButtons) {
        quizStartButtons.forEach((button) => {
            button.addEventListener("click", (event) => {
                const type = event.target.getAttribute("data-quiztype")
                startQuiz(type)
            })
        })
    }
})