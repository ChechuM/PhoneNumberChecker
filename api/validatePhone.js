
const library = require('libphonenumber-js/max')
const isPossible = library.isPossiblePhoneNumber
const isValid = library.isValidPhoneNumber
const isValidLenght = library.validatePhoneNumberLength
const parsePhone = library.parsePhoneNumber


function validatePhone (phone) {
    const {number, code} = phone
    const parsed = parsePhone(number, code)

    let result = {
        isValid: isValid(number, code),
        isPossible: isPossible(number, code),
        type: parsed.getType(),
        intFormat: parsed.formatInternational()
    }

    return result
}

module.exports = validatePhone