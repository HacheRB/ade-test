import { DepartmentName } from '../definitions/department'
import Department from '../models/department'

export async function getDepartments() {
	const departments = await Department.find()

	if (!departments || departments.length < 1) throw Error('NOT_FOUND')

	return departments
}

export async function addDepartment(departmentParams: DepartmentName) {
	const department = await Department.create(departmentParams)

	//Handle errors

	return department
}

export async function updateDepartment(id: string, data: DepartmentName) {
	const department = await Department.findByIdAndUpdate(id, data, { new: true })

	// Need to Handle errors if department doesn't exist
	if (!department) throw Error('NOT_UPDATED')

	return department
}
