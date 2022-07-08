import app from './app'
import config from './config/config'
import { connectToDb } from './utils/dbConnection'
import logger from './utils/logger'

const PORT = config.PORT || 5000

//Server
app.listen(PORT, () => {
	logger.info(`Server is running on port ${PORT}.`)
	connectToDb()
})
