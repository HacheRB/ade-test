import app from './app'
import { connectToDb } from './utils/dbConnection'
import http from 'http'
import logger from './utils/logger'
import process from 'process'

const PORT = process.env.PORT || 5000

const httpServer = http.createServer(app)

httpServer.listen(PORT, () => {
	logger.info(`Server is running on port ${PORT}.`)
	connectToDb()
})
