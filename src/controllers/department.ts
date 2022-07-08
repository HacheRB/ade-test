import { NextFunction, Request, Response } from 'express'

import { DepartmentName } from '../definitions/department'

import {
	getDepartments as getDepartmentsService,
	addDepartment as addDepartmentService,
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
