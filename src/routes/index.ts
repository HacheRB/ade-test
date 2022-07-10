import express, { Request, Response } from 'express'
import departmentRouter from '../routes/department'
import userRouter from '../routes/user'

const router = express.Router()

router.use('/departments', departmentRouter)
router.use('/users', userRouter)

router.get('/healthcheck', (req: Request, res: Response) => {
	res.sendStatus(200)
})

export default router
