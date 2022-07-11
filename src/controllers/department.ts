import { NextFunction, Request, Response } from 'express'

import { DepartmentName } from '../definitions/department'

import {
	addDepartment as addDepartmentService,
	getDepartments as getDepartmentsService,
	getOfficersDepartment as getOfficersDepartmentService,
	updateDepartment as updateDepartmentService,
} from '../services/department'

export async function getDepartments(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const departments = await getDepartmentsService()
		res.status(200).json(departments)
	} catch (err) {
		next(err)
	}
}

export async function addDepartment(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const departmentParams = req.body as DepartmentName
	try {
		const department = await addDepartmentService(departmentParams)

		res.status(200).json(department)
	} catch (err) {
		next(err)
	}
}

export async function updateDepartment(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const id = req.params.id
	const data = req.body as DepartmentName
	try {
		const department = await updateDepartmentService(id, data)

		res.status(200).json(department)
	} catch (err) {
		next(err)
	}
}
export async function addOfficerToDepartment(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const { departmentId, officerId } = req.params

	try {
		//maybe check officerId exists too
		const currentDepartment = await getOfficersDepartmentService(officerId)

		if (currentDepartment._id === departmentId) {
			res.status(200).json({ ok: 1, message: 'Same department' })
		}
		res.status(200).json({ ok: 1, message: 'test' })
	} catch (err) {
		next(err)
	}
}
