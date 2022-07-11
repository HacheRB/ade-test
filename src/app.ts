import express, { Express } from 'express'
require('express-async-errors')
import cookieParser from 'cookie-parser'
import mongoSanitize from 'express-mongo-sanitize'
import helmet from 'helmet'

import { errorHandler } from './middleware/error-handler'
import logger from './utils/logger'
import router from './routes'

const app: Express = express()

app
	.use(helmet())
	.use(express.urlencoded({ extended: false }))
	.use(express.json())
	.use(cookieParser())
	.use(
		mongoSanitize({
			onSanitize: ({ req, key }) => {
				logger.info(`This request[${key}] is sanitized`)
			},
		}),
	)

	// Routes
	.use('/api', router)

	// Error Handler
	.use(errorHandler)

export default app
