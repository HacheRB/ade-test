import express from 'express'

import { Schemas } from '../definitions/user'
import {
	authenticateUser,
	registerUser,
	testUserToken,
} from '../controllers/user'
import { validateWithJoi } from '../middleware/joi'
import { jwtAuthHandler } from '../middleware/jwt-auth-handler'

const router = express.Router()

router.get('/testToken', testUserToken) // Needs authorization middleware for current User
router.post('/', validateWithJoi(Schemas.user.creation), registerUser)
router.post(
	'/login',
	validateWithJoi(Schemas.user.login),
	authenticateUser,
	jwtAuthHandler,
)

export default router
