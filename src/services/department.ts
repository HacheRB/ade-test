import { DepartmentName } from '../definitions/department'
import Department from '../models/department'

export async function getDepartment(departmentId: string) {
	const department = await Department.find({ _id: departmentId })

	if (!department) throw Error('NOT_FOUND')

	return department
}

export async function getDepartments() {
	const departments = await Department.find()

	if (!departments || departments.length < 1) throw Error('NOT_FOUND')

	return departments
}

export async function addDepartment(departmentParams: DepartmentName) {
	const department = await Department.create(departmentParams)

	if (!department) throw Error('NOT_CREATED')

	return department
}

export async function updateDepartment(id: string, data: DepartmentName) {
	const department = await Department.findByIdAndUpdate(id, data, { new: true })

	if (!department) throw Error('NOT_UPDATED')

	return department
}

export async function getOfficersDepartment(officerId: string) {
	const department = await Department.findOne({
		officers: { $pull: [officerId] },
	})

	if (!department) throw Error('NOT_FOUND')

	return department
}

export async function deleteOfficerFromDepartment(officerId: string) {
	const department = await Department.findOne({
		officers: { $all: [officerId] },
	})

	if (!department) throw Error('NOT_FOUND')

	return department
}
