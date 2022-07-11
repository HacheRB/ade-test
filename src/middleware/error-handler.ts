import { NextFunction, Request, Response } from 'express'

//NEEDS REFACTOR, tune response status

//github.com/DefinitelyTyped/DefinitelyTyped/blob/507e9d3c8e48b2db81d3e071d270a2a297eed151/types/express-serve-static-core/index.d.ts#L32
export function errorHandler(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	err: any,
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const ERROR_MESSAGE = err.message

	switch (true) {
		case ERROR_MESSAGE === 'NOT_FOUND':
			return res.status(500).json({ ok: 0, error: 'No resources found.' })
		case ERROR_MESSAGE === 'NOT_CREATED':
			return res.status(500).json({ ok: 0, error: "Resource wasn't created." })
		case ERROR_MESSAGE === 'NOT_UPDATED':
			return res.status(500).json({ ok: 0, error: "Resource wasn't updated." })
		case ERROR_MESSAGE === 'OBJECT_EXISTS':
			return res.status(500).json({ ok: 0, error: 'Resource already exists.' })
		case ERROR_MESSAGE === 'UNAUTHORIZED':
			return res.status(403).json({ ok: 0, error: 'Unauthorized.' })
		default:
			return next(err)
	}
}
