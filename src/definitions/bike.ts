import Joi from 'joi'
import { Types } from 'mongoose'

export enum BikeStatus {
	REPORTED = 'REPORTED',
	ASSIGNED = 'ASSIGNED',
	UNASSIGNED = 'UNASSIGNED',
	CLOSED = 'CLOSED',
}

export interface IBike {
	license_number: string
	color: string
	type: string
	date_stolen: Date
	last_updated: Date
	theft_description: string
	status: BikeStatus
	user: Types.ObjectId
	officer: Types.ObjectId
	department: Types.ObjectId
}

export type BikeCreation = Omit<
	IBike,
	'date_stolen' | 'last_updated' | 'officer' | 'department' | 'status'
>
export type BikeParams = Omit<BikeCreation, 'user'>

export const Schemas = {
	bike: {
		creation: Joi.object<BikeCreation>({
			license_number: Joi.string().min(4).max(64).required(),
			color: Joi.string().min(3).max(64).required(),
			type: Joi.string().min(3).max(64).required(),
			theft_description: Joi.string().max(500).required(),
		}),
	},
}
