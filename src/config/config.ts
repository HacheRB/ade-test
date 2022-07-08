import dotenv from 'dotenv'
dotenv.config()

const DB_URI = process.env.DB_URI
const JWT_SECRET = process.env.JWT_SECRET
const PORT = process.env.PORT

const config = {
	DB_URI: DB_URI,
	JWT_SECRET: JWT_SECRET,
	PORT: PORT,
}

export default config
