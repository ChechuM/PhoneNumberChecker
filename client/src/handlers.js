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

// Una para download el file CSV