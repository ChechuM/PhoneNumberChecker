const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const generateCsvFile = async (validationDetails) => {
  try {
      const { isValid, isPossible, type, intFormat } = validationDetails

      const data = [{
      isValid: isValid,
      isPossible: isPossible,
      phoneType: type,
      internationalFormat: intFormat,
      }];
      
      const csvWriter = createCsvWriter({
        path: './toDownload/validation_results.csv',
        header: [
          { id: 'isValid', title: 'IsValid' },
          { id: 'isPossible', title: 'IsPossible' },
          { id: 'phoneType', title: 'PhoneType' },
          { id: 'internationalFormat', title: 'InternationalFormat' },
        ],
      });

      await csvWriter.writeRecords(data)

      return './toDownload/validation_results.csv'
    }
    catch(error) {
      console.error('Error writing CSV file at the generator:', error);
      throw error;
    };
}

module.exports = generateCsvFile
