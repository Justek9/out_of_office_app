const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const path = require('path')

const app = express()
const server = app.listen(process.env.PORT || '8000', () => {
	console.log('Server is running...')
})

if (process.env.NODE_ENV !== 'production') {
	app.use(
		cors({
			origin: ['http://localhost:3000', 'http://localhost:8000'],
			credentials: true,
		})
	)
}
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use((req, res) => {
	res.status(404).send({ message: 'Not found...' })
})
