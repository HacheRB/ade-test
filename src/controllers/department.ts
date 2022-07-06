import { Request, Response } from 'express'
import { DepartmentName } from '../definitions/department'
import Department from '../models/department'

export const getDepartments = async (req: Request, res: Response) => {
	Department.find()
		.then((departments) => {
			res.status(200).json(departments)
		})
		.catch((err) => res.status(500).json(err))
}

export const addDepartment = (req: Request, res: Response) => {
	const data = req.body as DepartmentName

	Department.create(data)
		.then((department) => {
			res.status(200).json(department)
		})
		.catch((err) => res.status(500).json(err))
}

export const updateDepartment = (req: Request, res: Response) => {
	const id = req.params.id
	const data = req.body as DepartmentName

	Department.findByIdAndUpdate(id, data, { new: true })
		.then((department) => {
			res.status(200).json(department)
		})
		.catch((err) => res.status(500).json(err))
}
