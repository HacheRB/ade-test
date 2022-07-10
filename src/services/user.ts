import jwt from 'jsonwebtoken'

import config from '../config/config'
import {
	IEmployeeCreation,
	IUserCreation,
	IUserToken,
	Roles,
} from '../definitions/user'
import User from '../models/user'
import { checkPassword, hashPassword } from '../utils/bcrypt'

export async function registerUser(
	userParams: IUserCreation | IEmployeeCreation,
) {
	const registeredUser = await User.findOne({ email: userParams.email })

	if (registeredUser) throw Error('user exists')

	const hashedPassword = await hashPassword(userParams.password)

	const user = new User({
		email: userParams.email,
		name: userParams.name,
		hashedPassword,
		role: userParams.role || Roles.USER,
	})

	await user.save()

	return user
}

export async function authenticateUser(email: string, password: string) {
	const registeredUser = await User.findOne({ email: email })

	if (!checkPassword(password, registeredUser.hashedPassword)) {
		throw Error('Incorrect email or password')
	}

	const responseUser: IUserToken = {
		id: registeredUser._id,
		email: registeredUser.email,
		role: registeredUser.role,
	}
	return responseUser
}

export function createUserToken(user: IUserToken) {
	return jwt.sign(user, config.JWT_SECRET, { expiresIn: '7d' })
}
