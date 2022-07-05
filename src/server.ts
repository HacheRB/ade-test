import app from './app'
import cluster from 'cluster'
import config from 'config'
import { cpus } from 'os'
import http from 'http'
import process from 'process'

const ENVIRONMENT = process.env.NODE_ENV
const NUMCPUS = process.env.NODE_ENV === 'production' ? cpus().length : 1
const PORT = config.get<number>('port')

// Basic Clustering
if (cluster.isPrimary) {
	console.log('Master cluster')

	// Fork workers.
	for (let i = 0; i < NUMCPUS; i++) {
		cluster.fork()
	}

	cluster.on('online', (worker) => {
		console.log('Worker online')
	})

	cluster.on('exit', (worker, code, signal) => {
		console.log('Worker offline')

		cluster.fork()
	})
} else {
	const httpServer = http.createServer(app)
	httpServer.listen(PORT, () => {
		console.log('Server start up')
	})
}
