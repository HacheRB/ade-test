import config from 'config'
import logger from './logger'
import mongoose from 'mongoose'
import process from 'process'

const PID = process.pid

mongoose.connection.on('open', () => {
	logger.info(`${PID} established connection with DB!`)
})

mongoose.connection.on('error', (error: typeof mongoose.Error) => {
	logger.error(error)
})

export async function connectToDb() {
	const dbUri = config.get<string>('dbUri')
	try {
		await mongoose.connect(dbUri)
	} catch (error) {
		process.exit(1)
	}
}

export async function mongoDisconnectFromDb() {
	await mongoose.disconnect()
}
