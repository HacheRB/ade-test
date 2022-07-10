import express from 'express'
import { Roles } from '../definitions/user'
import authorize from '../middleware/authorize'
import { validateWithJoi } from '../middleware/joi'

import {
	addDepartment,
	getDepartments,
	updateDepartment,
} from '../controllers/department'
import { Schemas } from '../definitions/department'

const router = express.Router()

router.get('/', getDepartments)

router.post(
	'/',
	authorize(Roles.ADMIN),
	validateWithJoi(Schemas.department.default),
	addDepartment,
)

router.put(
	'/:id',
	validateWithJoi(Schemas.department.default),
	updateDepartment,
)

export default router
