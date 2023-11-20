import axios from 'axios'

// Una para buscar la info de los países soportados
export const getCountries = async () => {
    try {
        let countries = await axios.get('http://localhost:3001/countries')
        if (countries) {
            return countries.data
        }
    } catch(error) {
        console.error('Error getting countries at the handler', error)
    }
}

// Una para enviar la info a verificar -> y recibir respuesta a guardar en el estado local
export const validatePhone= async ({number, code}) => {
    console.log('lo que recibe el handle validatePhone. number:', number, 'code:', code )
    try{

        let results = await axios.post('http://localhost:3001/phone', {
            number,
            code
        })

        console.log('the result at the handler after sendig the phone to validate', results.data)
        return results.data

    }catch(error) {
        console.error('Error validating phone number at the handler', error)
    }
}

// Una para download el file CSV