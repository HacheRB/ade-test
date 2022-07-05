import dotenv from 'dotenv'
dotenv.config()
import express, { Express } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import path from 'path'
import router from './routes'

const app: Express = express()

app
	.use(
		cors({
			origin: `http://localhost`, //Needs configuration
		}),
	)
	.use(helmet())
	.use(express.urlencoded({ extended: false }))
	.use(express.json())
	.use(express.static(path.join(__dirname, '..', 'public')))

	// Routes
	.use('/api', router)

export default app
