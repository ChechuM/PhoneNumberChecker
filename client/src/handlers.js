import axios from 'axios'

// Una para buscar la info de los países soportados
export const getCountries = async () => {
    try {
        let countries = await axios.get('http://localhost:3001/countries')
        if (countries)  return countries.data
    } catch(error) {
        console.error('Error getting countries at the handler', error)
    }
}

// Una para enviar la info a verificar -> y recibir respuesta a guardar en el estado local
export const validatePhone = async ({number, code}) => {

    try{
        let results = await axios.post('http://localhost:3001/phone', {
            number,
            code
        })

        return results.data
    }
    catch(error) {
        console.error('Error validating phone number at the handler', error)
    }
}

// Una para download el file CSV

export const downloadCSVfile = async ({isValid,isPossible,type,intFormat}) => {
    try {
        let response = await axios({
            method: 'get',
            url: `http://localhost:3001/download/${isValid}/${isPossible}/${type}/${intFormat}`,
            responseType: 'blob'
        })
        const blob = new Blob([response.data], { type: 'text/csv' });

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'downloaded_file.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        return response.data
    }
    catch (error) {
        console.error('Error creating CSV file at the handler', error)
    }
}