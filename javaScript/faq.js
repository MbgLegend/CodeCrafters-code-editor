const faqBoxes = document.querySelectorAll("#Faq .box")

export function toggleFaq(event){
    const activeFAQ = event.target.parentNode

    faqBoxes.forEach(faq => faq.classList.remove("active"))

    activeFAQ.classList.add("active")
}