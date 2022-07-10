import { IResponseUser } from './user'

declare module 'express-serve-static-core' {
	interface Request {
		user?: IResponseUser
	}
}
declare namespace Express {
	interface Request {
		user?: IResponseUser
	}
}
