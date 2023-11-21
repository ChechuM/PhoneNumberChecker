const express = require('express');
const app = express();
const cors = require('cors');
const generateCsvFile = require('./generateCsvFile');
const countries = require('./countries')
const validatePhone = require('./validatePhone')
const fs = require('fs').promises;
const path = require('path');


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



app.get('/download/:isValid/:isPossible/:type/:intFormat', async (req, res) => {
   try {
    await generateCsvFile(req.params)

    const filePath = path.join(__dirname, 'toDownload', 'validation_results.csv');

    const fileExists = await fs.access(filePath)
        .then(() => true)
        .catch(() => false);

    if (fileExists) {
      const fileContent = await fs.readFile(filePath, 'utf-8');

      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename=validation_results.csv');
      res.status(200).send(fileContent);
    } else {
      console.error('File does not exist:', filePath);
      res.status(404).send('File Not Found');
    }
    
    // to delete file after sending it:
    await fs.unlink(filePath);
   }
   catch (error) {
    console.error('Error generating csvfile at the back', error)
    res.status(500).send('Internal Server Error');
   }
})

// Listening - port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server now listening on port http://localhost:${PORT}`)
});