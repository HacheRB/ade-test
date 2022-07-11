import jwt from 'jsonwebtoken'

import config from '../config/config'

import { BikeStatus } from '../definitions/bike'
import { IUserCreation, IUserToken, Roles } from '../definitions/user'
import User from '../models/user'
import {
	getBike as getBikeService,
	updateBike as updateBikeService,
} from '../services/bike'
import { checkPassword, hashPassword } from '../utils/bcrypt'

export async function getUsers() {
	const users = await User.find()

	if (!users || users.length < 1) throw Error('NOT_FOUND')

	return users
}

export async function registerUser(userParams: IUserCreation) {
	const registeredUser = await User.findOne({ email: userParams.email })

	if (registeredUser) throw Error('OBJECT_EXISTS')

	const hashedPassword = await hashPassword(userParams.password)

	const user = new User({
		email: userParams.email,
		name: userParams.name,
		hashedPassword,
		role: userParams.role || Roles.USER,
	})

	const savedUser = await user.save()

	if (!savedUser) throw Error('NOT_CREATED')
	//Needs refactor
	if (savedUser.is_available) {
		handleAvailableOfficer(savedUser._id.toString())
	}
	return savedUser
}

export async function authenticateUser(email: string, password: string) {
	const registeredUser = await User.findOne({ email: email })

	if (!registeredUser) throw Error('NOT_FOUND')

	if (!checkPassword(password, registeredUser.hashedPassword)) {
		throw Error('Incorrect email or password')
	}

	const userTokenData: IUserToken = {
		id: registeredUser._id,
		email: registeredUser.email,
		role: registeredUser.role,
	}
	return userTokenData
}

export function createUserToken(user: IUserToken) {
	return jwt.sign(user, config.JWT_SECRET, { expiresIn: '7d' })
}

export async function findAvailableOfficerId() {
	const availableOfficer = await User.findOne({
		role: Roles.OFFICER,
		investigates_bikes: true,
		is_available: true,
	})

	if (!availableOfficer) return null

	return availableOfficer._id
}

export async function updateOfficerAvailability(
	officerId: string,
	isAvailable: boolean,
) {
	const officer = await User.findOneAndUpdate(
		{ _id: officerId },
		{ is_available: isAvailable },
		{
			new: true,
		},
	)

	return officer
}

//Add unassigned bike to available officer, ugly but works. Needs refactoring.
export async function handleAvailableOfficer(employeeId: string) {
	const unassignedBike = await getBikeService(null, BikeStatus.UNASSIGNED)

	if (!unassignedBike) {
		const updatedOfficer = await updateOfficerAvailability(employeeId, true)
	} else {
		const unassignedBikeId = unassignedBike._id.toString()
		const newBike = await updateBikeService(unassignedBikeId, {
			officer: employeeId,
			status: BikeStatus.ASSIGNED,
		})
	}
}
