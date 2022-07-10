import express from 'express'
import { Schemas } from '../definitions/user'
import {
	authenticateUser,
	registerUser,
	getUsers,
	test,
} from '../controllers/user'

import { jwtAuthHandler } from '../middleware/jwt-auth-handler'
import { validateWithJoi } from '../middleware/joi'

const router = express.Router()

router.get('/', getUsers)
router.get('/test', jwtAuthHandler, test)

router.post('/', validateWithJoi(Schemas.user.creation), registerUser)
router.post('/login', validateWithJoi(Schemas.user.login), authenticateUser)

export default router
