import {Router} from 'express'
import authRouter from './auth.router'
import profileRouter from './profile.route'
import highSchoolProfileRouter from './high_school_profile.route'

const user = Router()

user.use('/auth', authRouter)
user.use('/profile', profileRouter)
user.use('/high-school-profile', highSchoolProfileRouter)

export default user
