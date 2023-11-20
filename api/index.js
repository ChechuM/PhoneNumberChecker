const express = require('express');
const app = express();
const cors = require('cors');
const generateCsvString = require('./generateCsvString')
const countries = require('./countries')
const validatePhone = require('./validatePhone')

// Middlewares
app.use(express.json())
app.use(cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = [
        'http://localhost:8080',
        'http://localhost:3000',
      ]
  
      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true)
      }
  
      if (!origin) {
        return callback(null, true)
      }
  
      return callback(new Error('Not allowed by CORS'))
    }
  }))

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