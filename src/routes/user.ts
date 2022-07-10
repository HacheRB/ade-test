import express from 'express'

import { Roles, Schemas } from '../definitions/user'
import {
	authenticateUser,
	registerUser,
	getUsers,
	test,
} from '../controllers/user'
import authorize from '../middleware/authorize'
import { jwtAuthHandler } from '../middleware/jwt-auth-handler'
import { validateWithJoi } from '../middleware/joi'

const router = express.Router()

router.get('/', jwtAuthHandler, authorize(Roles.ADMIN), getUsers)
router.get('/test', jwtAuthHandler, test) // Needs authorization middleware for current User

router.post('/', validateWithJoi(Schemas.user.creation), registerUser)
router.post(
	'/employee',
	authorize(Roles.ADMIN),
	validateWithJoi(Schemas.user.employeeCreation),
	registerUser,
)
router.post('/login', validateWithJoi(Schemas.user.login), authenticateUser)

export default router
