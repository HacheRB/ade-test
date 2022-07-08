import Joi from 'joi'
import { Types } from 'mongoose'

export interface IDepartment {
	name: string
	officers: [Types.ObjectId]
}

export type DepartmentName = Pick<IDepartment, 'name'>

export const Schemas = {
	department: {
		default: Joi.object<DepartmentName>({
			name: Joi.string().min(4).max(144).required(),
		}),
	},
}
