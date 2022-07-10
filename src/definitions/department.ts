import Joi from 'joi'
import { Types } from 'mongoose'

export interface IDepartment {
	name: string
	officers: [IOfficerObject]
}

export interface IOfficerObject {
	investigates_bikes: boolean
	is_available: boolean
	officer_id: Types.ObjectId
}

export type DepartmentName = Pick<IDepartment, 'name'>

export const Schemas = {
	department: {
		default: Joi.object<DepartmentName>({
			name: Joi.string().min(4).max(144).required(),
		}),
	},
}
