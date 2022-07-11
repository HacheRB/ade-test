import Joi from 'joi'
import { Types } from 'mongoose'

export enum BikeStatus {
	ASSIGNED = 'ASSIGNED',
	UNASSIGNED = 'UNASSIGNED',
	CLOSED = 'CLOSED',
}

// Not much time, would need to investigate how to transform an enum to a iterable object/array with ts.
const BikeStatusArray = ['ASSIGNED', 'UNASSIGNED', 'CLOSED']

export interface IBike {
	license_number: string
	color: string
	type: string
	theft_description: string
	user: Types.ObjectId
	date_stolen: Date
	last_updated: Date
	status: BikeStatus
	officer: Types.ObjectId | null
	department: Types.ObjectId
}

export type BikeCreation = Omit<
	IBike,
	'date_stolen' | 'last_updated' | 'department'
>

export type BikeParams = Omit<
	IBike,
	'date_stolen' | 'last_updated' | 'status' | 'department' | 'user'
>

export interface IBikeUpdateParams {
	color?: string
	type?: string
	officer?: string | null
	theft_description?: string
	status?: BikeStatus
}

export const Schemas = {
	bike: {
		creation: Joi.object<BikeCreation>({
			license_number: Joi.string().min(4).max(64).required(),
			color: Joi.string().min(3).max(64).required(),
			type: Joi.string().min(3).max(64).required(),
			theft_description: Joi.string().max(500).required(),
		}),
		update: Joi.object<BikeCreation>({
			color: Joi.string().min(3).max(64),
			type: Joi.string().min(3).max(64),
			theft_description: Joi.string().max(500),
			status: Joi.string().valid(...BikeStatusArray),
		}),
	},
}
