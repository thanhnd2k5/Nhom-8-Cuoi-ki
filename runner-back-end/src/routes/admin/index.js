import {Router} from 'express'
import authRouter from './auth.router'
import roleRouter from './role.router'
import universityRouter from './university.route'
import universityMajorsRouter from './university_majors.route'
import subjectCombinationsRouter from './subject_combinations.route'

const admin = Router()

admin.use('/auth', authRouter)
admin.use('/roles', roleRouter)
admin.use('/universities', universityRouter)
admin.use('/university-majors', universityMajorsRouter)
admin.use('/subject-combinations', subjectCombinationsRouter)

export default admin
