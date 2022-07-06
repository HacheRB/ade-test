import config from '../config/config'
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
	try {
		await mongoose.connect(config.DB_URI)
	} catch (error) {
		logger.error(error)
	}
}

export async function mongoDisconnectFromDb() {
	await mongoose.disconnect()
}
