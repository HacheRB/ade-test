import { NextFunction, Request, Response } from 'express'

import { BikeParams, BikeStatus, IBikeUpdateParams } from '../definitions/bike'
import {
	getBike as getBikeService,
	getBikes as getBikesService,
	registerBike as registerBikeService,
	updateBike as updateBikeService,
} from '../services/bike'
import {
	findAvailableOfficerId as findAvailableOfficerIdService,
	handleAvailableOfficer as handleAvailableOfficerService,
	updateOfficerAvailability as updateOfficerAvailabilityService,
} from '../services/user'

export async function getBike(req: Request, res: Response, next: NextFunction) {
	const userId = req.user.id
	try {
		const bike = await getBikeService(userId, BikeStatus.ASSIGNED)
		if (!bike) throw Error('NOT_FOUND')
		res.status(200).json(bike)
	} catch (err) {
		next(err)
	}
}

export async function getBikes(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const bikes = await getBikesService()
		res.status(200).json(bikes)
	} catch (err) {
		next(err)
	}
}

//Needs refactor
export async function registerBike(req: Request, res: Response) {
	const bikeParams = req.body as BikeParams
	const userId = req.user.id
	let status = BikeStatus.UNASSIGNED
	try {
		const availableOfficerId = await findAvailableOfficerIdService()

		if (availableOfficerId) {
			status = BikeStatus.ASSIGNED
		}

		const bike = await registerBikeService({
			...bikeParams,
			user: userId,
			officer: availableOfficerId,
			status,
		})

		if (bike && availableOfficerId) {
			await updateOfficerAvailabilityService(availableOfficerId, false)
		}
		res.status(200).json({
			ok: 1,
			bikeId: bike._id,
			message: `Bike with license plate ${bike.license_number} Registered`,
		})
	} catch (err) {
		res.status(500).json({ ok: 0, message: err.message })
	}
}

//Needs refactor
export async function updateBike(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const bikeId = req.params.bikeId
	const employeeId: string = req.user.id
	const data = req.body as IBikeUpdateParams
	try {
		const bike = await getBikeService(employeeId, BikeStatus.ASSIGNED)

		if (bike.officer.toString() !== employeeId) throw Error('UNAUTHORIZED')

		const updatedBike = await updateBikeService(bikeId, data)

		if (
			updatedBike.status === BikeStatus.CLOSED ||
			updatedBike.status === BikeStatus.UNASSIGNED
		) {
			const officer = handleAvailableOfficerService(employeeId)
		}
		res.status(200).json({ ok: 1, message: 'Bike updated' })
	} catch (err) {
		next(err)
	}
}
