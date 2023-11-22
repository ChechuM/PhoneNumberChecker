import axios from 'axios'
import { saveAs } from 'file-saver';

export const getCountries = async () => {
    try {
        let countries = await axios.get('http://localhost:3001/countries')
        if (countries)  return countries.data
    } catch(error) {
        console.error('Error getting countries at the handler', error)
    }
}



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
        alert('Error validating phone number. Please check the information input and try again')
        return error
    }
}



export const downloadCSVfile = async ({ isValid, isPossible, type, intFormat }) => {
    try {
      const response = await axios({
        method: 'get',
        url: `http://localhost:3001/download/${isValid}/${isPossible}/${type}/${intFormat}`,
        responseType: 'blob',
      });
  
      const blob = new Blob([response.data], { type: 'text/csv' });
  
      saveAs(blob, 'downloaded_file.csv');
  
      return response.data;
    } catch (error) {
      console.error('Error creating CSV file at the handler', error);
    }
  };