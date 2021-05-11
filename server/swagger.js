const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/api/admin.js']

swaggerAutogen(outputFile, endpointsFiles)