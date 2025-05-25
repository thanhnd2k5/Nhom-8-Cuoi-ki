import * as ApplicationsService from '@/app/services/applications.service'
import * as DocumentsService from '@/app/services/documents.service'
import * as ApplicationsResultService from '@/app/services/application_results.service'
import { abort } from '@/utils/helpers'

export async function createApplication(req, res) {
    const application = await ApplicationsService.createApplication(req.currentUser._id, req.body)
    res.jsonify(application)
}

export async function updateApplication(req, res) {
    console.log(req.body)
    const application = await ApplicationsService.updateApplication(req.application._id, req.currentUser._id, req.body)
    res.jsonify(application)
}

export async function deleteApplication(req, res) {
    const application = await ApplicationsService.deleteApplication(req.application._id, req.currentUser._id)
    res.jsonify(application)
}

export async function getApplicationById(req, res) {
    const application = await ApplicationsService.getApplicationById(req.application._id, req.currentUser._id)
    if (!application) {
        abort(404, 'Application not found')
    }
    const documents = await DocumentsService.getDocumentsByApplicationId(req.application._id)
    const applicationResult = await ApplicationsResultService.getApplicationResultByApplicationId(req.application._id)
    res.jsonify({ ...application.toObject(), documents, applicationResult })
}

export async function getAllApplicationsByUserId(req, res) {
    const applications = await ApplicationsService.getAllApplicationsByUserId(req.currentUser._id)
    res.jsonify(applications)
}

export async function createCompleteApplication(req, res) {
    try {
        console.log('req.body', req.body)
        const userId = req.currentUser._id
        const formData = {
            applicationData: {
                universityMajorId: req.body.universityMajorId,
                admissionMethod: req.body.admissionMethod,
                subjectCombinationId: req.body.subjectCombinationId
            },
            resultData: req.body.resultData,
            documentsData: req.body.documentsData
        }

        const result = await ApplicationsService.createCompleteApplication(userId, formData)
        
        res.jsonify(result)
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}