import express from 'express'
import { Roles } from '../definitions/user'
import authorize from '../middleware/authorize'
import { validateWithJoi } from '../middleware/joi'

import {
	addDepartment,
	addOfficerToDepartment,
	getDepartments,
	updateDepartment,
} from '../controllers/department'
import { Schemas } from '../definitions/department'

const router = express.Router()

router.get('/', getDepartments) //No middleware for easier testing

router.post(
	'/',
	authorize(Roles.ADMIN),
	validateWithJoi(Schemas.department.default),
	addOfficerToDepartment,
)
router.post(
	'/:departmentId/:officerId',
	authorize(Roles.ADMIN),
	validateWithJoi(Schemas.department.default),
	addDepartment,
)

router.put(
	'/:id',
	authorize(Roles.ADMIN),
	validateWithJoi(Schemas.department.default),
	updateDepartment,
)

export default router
