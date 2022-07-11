import express from 'express'

import {
	getBike,
	getBikes,
	registerBike,
	updateBike,
} from '../controllers/bike'
import { Roles } from '../definitions/user'
import { Schemas } from '../definitions/bike'
import authorize from '../middleware/authorize'
import { validateWithJoi } from '../middleware/joi'

const router = express.Router()

router.get('/', getBikes) //No middleware for easier testing
router.get('/activeCase', authorize(Roles.OFFICER), getBike)

router.post(
	'/',
	authorize(Roles.USER),
	validateWithJoi(Schemas.bike.creation),
	registerBike,
)

router.put(
	'/:bikeId',
	authorize(Roles.OFFICER),
	validateWithJoi(Schemas.bike.update),
	updateBike,
)

export default router
