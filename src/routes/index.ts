import express, { Request, Response } from 'express'

import authRouter from '../routes/auth'
import bikeRouter from '../routes/bike'
import departmentRouter from '../routes/department'
import userRouter from '../routes/user'

const router = express.Router()

router.use('/auth', authRouter)
router.use('/bikes', bikeRouter)
router.use('/departments', departmentRouter)
router.use('/users', userRouter)

router.get('/healthcheck', (req: Request, res: Response) => {
	res.sendStatus(200)
})

export default router
