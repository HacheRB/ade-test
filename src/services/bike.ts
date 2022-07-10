import { BikeCreation, BikeStatus } from '../definitions/bike'
import Bike from '../models/bike'

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

	const bike = new Bike({ ...bikeParams, status: BikeStatus.UNASSIGNED })

	await bike.save()

	return bike
}
