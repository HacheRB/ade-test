import {
	BikeCreation,
	BikeStatus,
	IBikeUpdateParams,
} from '../definitions/bike'
import Bike from '../models/bike'

import { findAvailableOfficerId as findAvailableOfficerIdService } from './user'

export async function getBike(
	officerId: string | null,
	status = BikeStatus.UNASSIGNED,
) {
	const bikes = await Bike.find({
		officer: officerId,
		status,
	})

	if (!bikes || bikes.length < 1) return null

	return bikes[0]
}

export async function getBikes() {
	const bikes = await Bike.find()

	if (!bikes || bikes.length < 1) throw Error('NOT_FOUND')

	return bikes
}

export async function registerBike(bikeParams: BikeCreation) {
	const registeredBike = await Bike.findOne({
		license_number: bikeParams.license_number,
	})

	if (registeredBike) throw Error('OBJECT_EXISTS')

	const bike = new Bike({ ...bikeParams })

	const savedBike = await bike.save()

	if (!savedBike) throw Error('NOT_CREATED')

	return savedBike
}

export async function updateBike(id: string, data: IBikeUpdateParams) {
	const bike = await Bike.findByIdAndUpdate(id, data, { new: true })
	if (!bike) throw Error('NOT_UPDATED')
	return bike
}
