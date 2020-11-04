import express from 'express'
const router = express.Router()
import { authUsers } from '../controllers/userController.js'

router.post('/login', authUsers)

export default router
