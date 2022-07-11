import { NextFunction, Request, Response } from 'express'

export default function authorize(authorizedRole: string) {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			const { role } = req.user
			if (role && role === authorizedRole) {
				next()
			}
		} catch (err) {
			res.status(403).json({ message: 'Unauthorized' })
		}
	}
}
