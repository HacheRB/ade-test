import { NextFunction, Request, Response } from 'express'

//add validation for multiple roles
export default function authorize(authorizedRole: string) {
	return (req: Request, res: Response, next: NextFunction) => {
		const { role } = req.user
		try {
			if (role !== authorizedRole) throw Error('UNAUTHORIZED')
			next()
		} catch (err) {
			next(err)
		}
	}
}
