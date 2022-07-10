import { NextFunction, Request, Response } from 'express'

export default function authorize(authorizedRole: string) {
	return (req: Request, res: Response, next: NextFunction) => {
		const { role } = req.user
		if (role && role === authorizedRole) {
			next()
		} else {
			res.status(403).json({ message: 'Unauthorized' })
		}
	}
}
