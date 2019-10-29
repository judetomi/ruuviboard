const express = require('express')

// create express instance
const app = express()

// Require API routes
const tagdata = require('./routes/tagdata')

// Import API Routes
app.use(tagdata)

// Export the server middleware
module.exports = {
	path: '/api',
	handler: app
}
