import express from 'express'

import { getBikes, registerBike } from '../controllers/bike'
import { Roles } from '../definitions/user'
import { Schemas } from '../definitions/bike'
import authorize from '../middleware/authorize'
import { validateWithJoi } from '../middleware/joi'

const router = express.Router()

router.get('/', getBikes)
router.post(
	'/',
	authorize(Roles.USER),
	validateWithJoi(Schemas.bike.creation),
	registerBike,
)

export default router
