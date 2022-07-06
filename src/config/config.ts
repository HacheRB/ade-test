import dotenv from 'dotenv'
dotenv.config()

const DB_URI = process.env.DB_URI

const config = {
	DB_URI: DB_URI,
}

export default config
