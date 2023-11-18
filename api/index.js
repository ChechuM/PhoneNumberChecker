const express = require('express');
const app = express();
const cors = require('cors');
const generateCsvString = require('./generateCsvString')
const countries = require('./countries')
const validatePhone = require('./validatePhone')

const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,  
  };

// Middlewares
app.use(express.json())
app.use(cors(corsOptions));

app.disable('x-powered-by')

// Routes

app.get('/countries', (req, res) => {
    res.status(200).json(countries)
})


app.post('/phone', (req, res) => {
    const result = validatePhone(req.body)

    if (!result) {
        res.status(400).json({message: "Oops"})
    }

    res.status(200).json(result)
    
})


app.get('/download/:isValid/:isPossible/:type/:intFormat', (req, res) => {
    const csvString = generateCsvString(req.params)

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=validation_results.csv');
    res.status(200).send(csvString);
})

// Listening - port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server now listening on port http://localhost:${PORT}`)
});