import Joi from 'joi'
import { Types } from 'mongoose'

export enum Roles {
	ADMIN = 'ADMIN',
	DIRECTOR = 'DIRECTOR',
	OFFICER = 'OFFICER',
	USER = 'USER',
}

export interface IUser {
	email: string
	hashedPassword: string
	verified: boolean
	name: string
	role: Roles
	bike_case?: Types.ObjectId
	bikes?: [Types.ObjectId]
}

export interface UserCreation {
	email: string
	password: string
	name: string
}

export interface UserLogin {
	email: string
	password: string
}

export const Schemas = {
	user: {
		creation: Joi.object<UserCreation>({
			email: Joi.string().email().required(),
			password: Joi.string().min(4).max(64).required(),
			name: Joi.string().min(4).max(144).required(),
		}),
		login: Joi.object<UserCreation>({
			email: Joi.string().email().required(),
			password: Joi.string().min(4).max(64).required(),
		}),
	},
}
