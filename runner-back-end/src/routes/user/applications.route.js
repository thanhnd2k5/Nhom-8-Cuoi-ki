import express from 'express'
import * as ApplicationsController from '../../app/controllers/user/applications.controller'
import validate from '../../app/middleware/user/validate'
import { checkApplicationExists } from '../../app/middleware/user/applications.middleware'
import { createApplicationSchema, updateApplicationSchema } from '../../app/requests/user/applications.request'
import { checkValidToken } from '../../app/middleware/user/auth.middleware'
import { asyncHandler } from '@/utils/helpers'

const router = express.Router()

router.use(asyncHandler(checkValidToken))

router.post('/', 
    asyncHandler(validate(createApplicationSchema)),
    asyncHandler(ApplicationsController.createApplication)
)

router.put('/:applicationId',
    asyncHandler(checkApplicationExists),
    asyncHandler(validate(updateApplicationSchema)),
    asyncHandler(ApplicationsController.updateApplication)
)

router.delete('/:applicationId',
    asyncHandler(checkApplicationExists),
    asyncHandler(ApplicationsController.deleteApplication)
)

router.get('/:applicationId',
    asyncHandler(checkApplicationExists),
    asyncHandler(ApplicationsController.getApplicationById)
)

router.get('/',
    asyncHandler(ApplicationsController.getAllApplicationsByUserId)
)

export default router 