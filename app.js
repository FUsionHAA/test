/*** Toggle user name ***/
const toggleNameValidation = () => {
    option.style.opacity = phoneRadio.checked ? "0" : "0"

    phone.style.opacity = phoneRadio.checked ? "1" : "0"
    phoneInput.style.pointerEvents = phoneRadio.checked ? "all" : "none"

    email.style.opacity = emailRadio.checked ? "1" : "0"
    emailInput.style.pointerEvents = phoneRadio.checked ? "none" : "all"
}

/*** Change element display settings ***/
const setDisplay = (ele, type) => {
    document.getElementById(`${ele}`).style.display = `${type}`
}

/*** Form fields validation ***/
const checkEmail = () => {
    const email = document.getElementById("emailInput").value
    const validEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!validEmail.test(email)) {
        setDisplay('emailWarning', 'block')
        return false
    }
    setDisplay('emailWarning', 'none')
    return true
}

const checkPhone = () => {
    const phone = document.getElementById("phoneInput").value.replace(/\D/g, "")
    const validPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    if (!validPhone.test(phone)) {
        setDisplay('phoneWarning', 'block')
        return true
    }
    setDisplay('phoneWarning', 'none')
    return false
}

const checkUser = () => {
    if (phoneRadio.checked ? checkPhone() : checkEmail() === false) {
        return false
    }
    return true
}

const checkPassword = () => {
    const password = document.getElementById('password').value
    if (password === '') {
        setDisplay('passReq', 'block')
        return false
    }
    setDisplay('passReq', 'none')
    if (password !== document.getElementById('confirm').value) {
        setDisplay('confirmReq', 'block')
        return false
    }
    setDisplay('confirmReq', 'none')
    return true
}

const checkTerms = () => {
    const terms = document.getElementById('terms').checked
    if (!terms) {
        setDisplay('termsReq', 'block')
        return false
    }
    setDisplay('termsReq', 'none')
    return true
}

/*** Full form validation ***/
const validateForm = () => {
    const validate = item => {
        if (item === true) {
            return true
        }
        return false
    }
    const itemsArr = [checkUser(), checkPassword(), checkTerms()]
    return itemsArr.every(validate)
}

/*** Sending form data ***/
const sendAplication = () => {
    if (!validateForm()) {
        return
    }
    postData()
}

const postData = () => {
    const payload = {
        email: document.getElementById('emailInput').value,
        phone: document.getElementById('phoneInput').value,
        password: document.getElementById('password').value,
        currency: document.querySelector('input[name="currency"]:checked').value,
        newsletter: document.getElementById('newsletter').checked
    }
    const data = new FormData()
    data.append("json", JSON.stringify(payload))
    setDisplay('send', 'none')
    setDisplay('spinner', 'block')
    fetch("https://httpbin.org/post", {
        method: "POST",
        body: data
    })
        .then(res => { return res.json() })
        .then(data => {
            setDisplay('spinner', 'none')
            setDisplay('send', 'block')
            document.getElementById('popup').style.marginLeft = 0
            setDisplay('success', 'block')
            console.log(data.form.json)
        })
        .catch(error => {
            setDisplay('spinner', 'none')
            setDisplay('send', 'block')
            document.getElementById('popup').style.marginLeft = 0
            setDisplay('error', 'block')
            console.log(error)
        })
}

////// Popup btns
const goToLogin = () => {
    alert ('Going to login!')
}

const closePopup = () => {
    document.getElementById('popup').style.marginLeft = "-100%"
}

