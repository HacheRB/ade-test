import { NextFunction, Request, Response } from 'express'
import { ObjectSchema } from 'joi'

import logger from '../utils/logger'

const DEFAULT_PAGE_LIMIT = 0
const DEFAULT_PAGE_NUMBER = 1

export interface PaginationQuery {
	limit: number
	page: number
}

export interface Pagination {
	limit: number
	skip: number
}

export function getPagination(query: PaginationQuery): Pagination {
	const limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT
	const page = Math.abs(query.page) || DEFAULT_PAGE_NUMBER
	const skip = (page - 1) * limit

	return {
		limit,
		skip,
	}
}

// export const queryBuilder = (
// 	schema: ObjectSchema,
// 	pagination: PaginationQuery,
// ) => {
// 	return async (req: Request, res: Response, next: NextFunction) => {
// 		try {
// 			const limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT
// 			const page = Math.abs(query.page) || DEFAULT_PAGE_NUMBER
// 			const skip = (page - 1) * limit

// 			let query = {}

// 			return {
// 				limit,
// 				skip,
// 			}
// 		} catch (err) {
// 			logger.error(err)
// 		}
// 	}
// }
