import express from 'express'

import { Roles, Schemas } from '../definitions/user'
import { registerUser, getUsers } from '../controllers/user'
import authorize from '../middleware/authorize'
import { jwtAuthHandler } from '../middleware/jwt-auth-handler'
import { validateWithJoi } from '../middleware/joi'

const router = express.Router()

router.get('/', jwtAuthHandler, authorize(Roles.ADMIN), getUsers)

router.post(
	'/employee',
	authorize(Roles.ADMIN),
	validateWithJoi(Schemas.user.employeeCreation),
	registerUser,
)

export default router
