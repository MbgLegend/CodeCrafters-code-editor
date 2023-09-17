export function validateEmail(input) {
    const email = input.trim()
    if (email.length === 0) {
        showErrorMessage()
    } else {
        if (checkEmail(input)) {
            alert("✅ Thanks for subscribing to our newsletter!")
        } else {
            alert("❌ Error: Enter a valid Email!")
        }
    }
}

function checkEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    return emailRegex.test(email)
}

function showErrorMessage() {
    alert("❌ Error: Enter email address!")
}