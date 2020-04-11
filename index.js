const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./config')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const getPatients = (request, response) => {
  pool.query('SELECT * FROM patient_info.patient_name', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addPatient = (request, response) => {
  const { first_name, last_name } = request.body

  pool.query('INSERT INTO patient_info.patient_name (first_name, last_name) VALUES ($1, $2)', [first_name, last_name], error => {
    if (error) {
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Patient added.' })
  })
}

app
  .route('/patients')
  // GET endpoint
  .get(getPatients)
  // POST endpoint
  .post(addPatient)

// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening`)
})