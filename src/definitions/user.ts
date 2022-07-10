import Joi from 'joi'
import { Types } from 'mongoose'

export enum Roles {
	ADMIN = 'ADMIN',
	DIRECTOR = 'DIRECTOR',
	OFFICER = 'OFFICER',
	USER = 'USER',
}

// Not much time, would need to investigate how to transform an enum to a iterable object with ts.
const rolesArray = ['ADMIN', 'DIRECTOR', 'OFFICER', 'USER']

export interface IUser {
	email: string
	hashedPassword: string
	verified: boolean
	name: string
	role: Roles
	bike_case?: Types.ObjectId
	bikes?: [Types.ObjectId]
}
export interface IUserCreation {
	email: string
	password: string
	name: string
	role: Roles
}

export interface IUserLogin {
	email: string
	password: string
}

export interface IUserToken {
	id: string
	email: string
	role: Roles
}

export const Schemas = {
	user: {
		creation: Joi.object<IUserCreation>({
			email: Joi.string().email().required(),
			password: Joi.string().min(4).max(64).required(),
			name: Joi.string().min(4).max(144).required(),
		}),
		// Investigate how to generate base schema
		employeeCreation: Joi.object<IUserCreation>({
			email: Joi.string().email().required(),
			password: Joi.string().min(4).max(64).required(),
			name: Joi.string().min(4).max(144).required(),
			role: Joi.string()
				.required()
				.valid(...rolesArray),
		}),

		login: Joi.object<IUserLogin>({
			email: Joi.string().email().required(),
			password: Joi.string().min(4).max(64).required(),
		}),
	},
}
