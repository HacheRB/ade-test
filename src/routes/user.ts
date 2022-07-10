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

router.get('/', getUsers) // Needs authorization middleware for Admin
router.get('/test', jwtAuthHandler, test) // Needs authorization middleware for current User

router.post('/', validateWithJoi(Schemas.user.creation), registerUser)
router.post(
	'/employee',
	validateWithJoi(Schemas.user.employeeCreation),
	registerUser,
) //Admin Route for employee creation
router.post('/login', validateWithJoi(Schemas.user.login), authenticateUser)

export default router
