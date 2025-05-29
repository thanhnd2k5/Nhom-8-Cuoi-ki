import { Router } from 'express'
import * as ApplicationsController from '@/app/controllers/admin/applications.controller'
import * as authMiddleware from '@/app/middleware/admin/auth.middleware'
import { checkApplicationExists } from '../../app/middleware/admin/applications.middleware'
import * as aplicationsRequest from '@/app/requests/admin/applications.request'
import {asyncHandler} from '@/utils/helpers'
import validate from '@/app/middleware/admin/validate'

const router = Router()

router.use(asyncHandler(authMiddleware.checkValidToken))

router.get('/', asyncHandler(ApplicationsController.getAllApplications))
router.patch(
    '/:applicationId/status',
    asyncHandler(checkApplicationExists),
    asyncHandler(validate(aplicationsRequest.updateStatusApplicationSchema)),
    asyncHandler(ApplicationsController.updateApplicationStatus))

export default router 