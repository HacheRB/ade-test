import { NextFunction, Request, Response } from 'express'

import { BikeParams } from '../definitions/bike'
import {
	getBikes as getBikesService,
	registerBike as registerBikeService,
} from '../services/bike'

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

export async function registerBike(req: Request, res: Response) {
	const bikeParams = req.body as BikeParams
	const userId = req.user.id
	try {
		const bike = await registerBikeService({ ...bikeParams, user: userId })
		// Need to assign available officer
		res.status(200).json({ ok: 1, message: 'Bike Registered' })
	} catch (err) {
		res.status(500).json({ ok: 0, message: err.message })
	}
}
