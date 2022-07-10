import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

import config from '../config/config'
import { IUserToken } from '../definitions/user'

const JWT_SECRET = config.JWT_SECRET

//dev.to/kwabenberko/extend-express-s-request-object-with-typescript-declaration-merging-1nn5
//https://github.com/TypeStrong/ts-node/issues/745
export function jwtAuthHandler(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const token = req.cookies.token
	try {
		const { id, email, role } = jwt.verify(token, JWT_SECRET) as IUserToken
		req.user = { id, email, role }
		next()
	} catch (err) {
		res.clearCookie('token')
		res.sendStatus(500).json({ ok: 0, message: 'Something went wrong' })
	}
}
