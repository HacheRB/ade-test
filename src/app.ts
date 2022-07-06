import express, { Express } from 'express'
import helmet from 'helmet'
import router from './routes'

const app: Express = express()

app
	.use(helmet())
	.use(express.urlencoded({ extended: false }))
	.use(express.json())

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

export default app
