import { Request, Response } from 'express'
import { UserCreation, UserLogin } from '../definitions/user'
import User from '../models/user'
import {
	authenticateUser as authenticateUserService,
	createUserToken as createUserTokenService,
	registerUser as registerUserService,
} from '../services/user'

export const test = async (req: Request, res: Response) => {
	try {
		return res.status(200).json({ ok: 1, ...req.user })
	} catch (err) {
		res.status(500).json(err)
	}
}

export const getUsers = async (req: Request, res: Response) => {
	try {
		const users = await User.find()
		res.status(200).json({ ok: 1, users: users })
	} catch (err) {
		res.status(500).json({ ok: 0, message: err.message })
	}
}

export async function registerUser(req: Request, res: Response) {
	const userParams = req.body as UserCreation
	try {
		const user = await registerUserService(userParams)
		res.status(200).json({ ok: 1, message: 'User Registered' })
	} catch (err) {
		res.status(500).json({ ok: 0, message: err.message })
	}
}

export async function authenticateUser(req: Request, res: Response) {
	const { email, password } = req.body as UserLogin
	try {
		const user = await authenticateUserService(email, password)
		const token = createUserTokenService(user)
		res.cookie('token', token, {
			httpOnly: true,
		})
		res.status(200).json({ ok: 1, message: 'User Authenticated' })
	} catch (err) {
		res.status(500).json({ ok: 0, message: err.message })
	}
}
