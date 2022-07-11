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

mongoose.connection.on('disconnected', (error: typeof mongoose.Error) => {
	//Need to handle reconnection
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
	logger.info('${PID} disconnected from Mongoose')
	await mongoose.disconnect()
}
