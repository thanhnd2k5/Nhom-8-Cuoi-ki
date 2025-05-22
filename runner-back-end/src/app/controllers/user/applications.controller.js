import * as ApplicationsService from '@/app/services/applications.service'
import * as DocumentsService from '@/app/services/documents.service'
import { abort } from '@/utils/helpers'

export async function createApplication(req, res) {
    const application = await ApplicationsService.createApplication(req.body)
    res.jsonify(application)
}

export async function updateApplication(req, res) {
    const application = await ApplicationsService.updateApplication(req.params.id, req.body)
    res.jsonify(application)
}

export async function deleteApplication(req, res) {
    const application = await ApplicationsService.deleteApplication(req.params.id)
    res.jsonify(application)
}

export async function getApplicationById(req, res) {
    const application = await ApplicationsService.getApplicationById(req.params.id)
    if (!application) {
        abort(404, 'Application not found')
    }
    const documents = await DocumentsService.getDocumentsByApplicationId(req.params.id)
    res.jsonify({ ...application.toObject(), documents })
}

export async function getAllApplicationsByUserId(req, res) {
    const applications = await ApplicationsService.getAllApplicationsByUserId(req.currentUser._id)
    res.jsonify(applications)
}