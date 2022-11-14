const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')

function showError(input, message) {
  const formControl = input.parentElement
  formControl.className = 'form-control error'
  const small = formControl.querySelector('small')
  small.innerText = message
}

function showSuccess(input) {
  const formControl = input.parentElement
  formControl.className = 'form-control success'
}

function checkEmail(email) {
  const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  if (re.test(email.value.trim())) showSuccess(email)
  else showError(email, 'Email in not valid')
}

function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === '') showError(input, `${getFieldName(input)} in required`)
    else showSuccess(input)
  })
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

function checkLength(input, min, max) {
  if (input.value.length < min) showError(input, `${getFieldName(input)} must be at least ${min} characters`)
  else if (input.value.length > max) showError(input, `${getFieldName(input)} must be less than ${max} characters`)
  else showSuccess(input)
}

function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) showError(input2, 'Password is not match')
}

form.addEventListener('submit', function (event) {
  event.preventDefault()

  checkRequired([username, email, password, password2])
  checkEmail(email)
  checkLength(username, 3, 15)
  checkLength(password, 10, 15)
  checkPasswordsMatch(password, password2)
})
