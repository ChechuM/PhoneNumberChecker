const createCsvWriter = require('csv-writer').createObjectCsvWriter;

function generateCsvString(validationDetails) {

    const { isValid, isPossible, type, intFormat } = validationDetails

    const csvWriter = createCsvWriter({
        path: 'validation_results.csv',
        header: [
        { id: 'isValid', title: 'IsValid' },
        { id: 'isPossible', title: 'IsPossible' },
        { id: 'phoneType', title: 'PhoneType' },
        { id: 'internationalFormat', title: 'InternationalFormat' },
        ],
    });

    const data = [
        {
        isValid: isValid,
        isPossible: isPossible,
        phoneType: type,
        internationalFormat: intFormat,
        },
    ];

    return csvWriter.writeRecords(data)
    .then(() => {
      console.log('CSV file written successfully');
    })
    .catch((err) => {
      console.error('Error writing CSV file:', err);
    });
}

module.exports = generateCsvString