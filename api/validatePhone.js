
const library = require('libphonenumber-js/max')
const isPossible = library.isPossiblePhoneNumber
const isValid = library.isValidPhoneNumber
const parsePhone = library.parsePhoneNumber


function validatePhone (phone) {
    const {number, code} = phone

    if (typeof number !== 'string' || typeof code !== 'string') {
        console.error('this should never get this far!')
        throw new Error({message: 'Phone number and Code must be a string'})
    }

    try {
    
        const parsed = parsePhone(number, code)
    
        let result = {
            isValid: isValid(number, code),
            isPossible: isPossible(number, code),
            type: parsed.getType(),
            intFormat: parsed.formatInternational()
        }

        return result

    } catch (error) {
        console.error('Error validating phone number. Phone number and Code must be a string', error)
    }
}

module.exports = validatePhone