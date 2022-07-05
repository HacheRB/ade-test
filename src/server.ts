import app from './app'
import cluster from 'cluster'
import config from 'config'
import { connectToDb } from './utils/dbConnection'
import { cpus } from 'os'
import http from 'http'
import logger from './utils/logger'
import process from 'process'

const ENVIRONMENT = process.env.NODE_ENV
const NUMCPUS = process.env.NODE_ENV === 'production' ? cpus().length : 1
const PORT = config.get<number>('port')

// Basic Clustering
if (cluster.isPrimary) {
	logger.info(
		`Server is running on port ${PORT} in ${ENVIRONMENT} environment.`,
	)
	logger.info(`Primary cluster ${process.pid} is running`)
	connectToDb()

	// Fork workers.
	for (let i = 0; i < NUMCPUS; i++) {
		cluster.fork()
	}

	cluster.on('online', (worker) => {
		logger.info(`Worker ${worker.process.pid} is running`)
	})

	cluster.on('exit', (worker, code, signal) => {
		logger.info(
			`worker ${worker.process.pid} died with code ${code} and signal ${signal}`,
		)
		cluster.fork()
	})
} else {
	const httpServer = http.createServer(app)
	httpServer.listen(PORT, () => {
		connectToDb()
	})
}
