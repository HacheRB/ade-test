import express, { Request, Response } from 'express'

import { jwtAuthHandler } from '../middleware/jwt-auth-handler'
import authRouter from '../routes/auth'
import bikeRouter from '../routes/bike'
import departmentRouter from '../routes/department'
import userRouter from '../routes/user'

const router = express.Router()

router.use('/auth', authRouter)
router.use('/bikes', jwtAuthHandler, bikeRouter)
router.use('/departments', jwtAuthHandler, departmentRouter)
router.use('/users', jwtAuthHandler, userRouter)

router.get('/healthcheck', (req: Request, res: Response) => {
	res.sendStatus(200)
})

export default router
