import express from 'express'
import { validateWithJoi } from '../middleware/joi'

import {
	addDepartment,
	getDepartments,
	updateDepartment,
} from '../controllers/department'
import { Schemas } from '../definitions/department'

const router = express.Router()

router.get('/', getDepartments)
router.post('/', validateWithJoi(Schemas.department.default), addDepartment)

router.put(
	'/:id',
	validateWithJoi(Schemas.department.default),
	updateDepartment,
)

export default router
