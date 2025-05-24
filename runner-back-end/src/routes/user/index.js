import {Router} from 'express'
import authRouter from './auth.router'
import profileRouter from './profile.route'
import highSchoolProfileRouter from './high_school_profile.route'
import applicationsRouter from './applications.route'
import applicationResultsRouter from './application_results.route'
import documentsRouter from './documents.route'

const user = Router()

user.use('/auth', authRouter)
user.use('/profile', profileRouter)
user.use('/high-school-profile', highSchoolProfileRouter)
user.use('/applications', applicationsRouter)
user.use('/application-results', applicationResultsRouter)
user.use('/documents', documentsRouter)

export default user
