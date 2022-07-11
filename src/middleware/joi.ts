import { NextFunction, Request, Response } from 'express'
import { ObjectSchema } from 'joi'
import logger from '../utils/logger'

//Don't use error-handler middleware so I send back validation errors by joi
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

//Getting TS Errors, need to refactor above method to accept Request Property(req.body or req.query) to validate different fields - no time.
export const validateQueryWithJoi = (schema: ObjectSchema) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await schema.validateAsync(req.query)
			next()
		} catch (error) {
			logger.error(error)
			return res
				.status(422)
				.json({ ok: 0, message: error.details[0].message, ...error })
		}
	}
}
