import express, { Request, Response } from 'express'
import departmentRouter from '../routes/department'

const router = express.Router()

router.use('/departments', departmentRouter)

router.get('/healthcheck', (req: Request, res: Response) => {
	res.sendStatus(200)
})

export default router
