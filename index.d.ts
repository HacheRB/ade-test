import { IResponseUser } from './src/definitions/user'

declare namespace Express {
	export interface Request {
		user?: IResponseUser
	}
}
