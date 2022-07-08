import { Roles } from './user'

interface IRequestUser {
	id: string
	email: string
	role: Roles
}

declare namespace Express {
	export interface Request {
		user?: IRequestUser
	}
}
