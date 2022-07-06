import { NextFunction, Request, Response } from 'express'
import { ObjectSchema } from 'joi'
import logger from '../utils/logger'

export const validateWithJoi = (schema: ObjectSchema) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await schema.validateAsync(req.body)
			next()
		} catch (error) {
			logger.error(error)
			return res
				.status(422)
				.json({ ok: 0, message: error.details[0].message, ...error })
		}
	}
}
