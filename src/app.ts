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

	.use((req, res, next) => {
		res.header('Access-Control-Allow-Origin', '*')
		res.header(
			'Access-Control-Allow-Headers',
			'Origin, X-Requested-With, Content-Type, Accept, Authorization',
		)
		if (req.method == 'OPTIONS') {
			res.header(
				'Access-Control-Allow-Methods',
				'PUT, POST, PATCH, DELETE, GET',
			)
			return res.status(200).json({})
		}
		next()
	})

	// Routes
	.use('/api', router)

	// Error Handler
	.use(errorHandler)

export default app
