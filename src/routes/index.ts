import express, { Request, Response } from 'express'

import { jwtAuthHandler } from '../middleware/jwt-auth-handler'
import bikeRouter from '../routes/bike'
import departmentRouter from '../routes/department'
import userRouter from '../routes/user'

const router = express.Router()

router.use('/bikes', jwtAuthHandler, bikeRouter)
router.use('/departments', jwtAuthHandler, departmentRouter)
router.use('/users', userRouter)

router.get('/healthcheck', (req: Request, res: Response) => {
	res.sendStatus(200)
})

export default router
