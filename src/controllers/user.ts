import { NextFunction, Request, Response } from 'express'

import { IUserCreation, IUserLogin } from '../definitions/user'
import User from '../models/user'
import {
	authenticateUser as authenticateUserService,
	createUserToken as createUserTokenService,
	getUsers as getUsersService,
	registerUser as registerUserService,
} from '../services/user'

//Test endpoint to verify token in testing, that's why there's no service and not using error-handler middleware.
export const testUserToken = async (req: Request, res: Response) => {
	try {
		return res.status(200).json({ ok: 1, ...req.user })
	} catch (err) {
		res.status(500).json(err)
	}
}

export const getUsers = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const users = await getUsersService()
		res.status(200).json(users)
	} catch (err) {
		next(err)
	}
}

export async function registerUser(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const userParams = req.body as IUserCreation
	try {
		const user = await registerUserService(userParams)

		res.status(200).json({ ok: 1, message: 'User Registered' })
	} catch (err) {
		next(err)
	}
}

export async function authenticateUser(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const { email, password } = req.body as IUserLogin
	try {
		const user = await authenticateUserService(email, password)
		const token = createUserTokenService(user)

		res.cookie('token', token, {
			httpOnly: true,
		})
		res.status(200).json({ ok: 1, message: 'User authenticated' })
	} catch (err) {
		next(err)
	}
}
