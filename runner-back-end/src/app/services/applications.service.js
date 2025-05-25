import {Application, Document} from '@/models'
import * as ApplicationResultService from './application_results.service'
import * as DocumentService from './documents.service'

export async function createApplication(userId, data) {
    const application = await Application.create({ ...data, userId })
    return application
}

export async function updateApplication(id, userId, data) {
    const application = await Application.findByIdAndUpdate(id, { ...data, userId }, { new: true })
    return application
}

export async function deleteApplication(id) {
    // Xóa tất cả documents liên quan
    await Document.deleteMany({ applicationId: id })
    // Xóa application
    const application = await Application.findByIdAndDelete(id)
    return application
}

export async function getApplicationById(id) {
    const application = await Application.findById(id)
        .populate('userId', 'name email')
        .populate('universityMajorId')
        .populate('subjectCombinationId')

    return application
}

export async function getAllApplicationsByUserId(userId) {
    const applications = await Application.find({ userId })
        .populate('userId')
        .populate('universityMajorId')
        .populate('subjectCombinationId')

    return applications
}

export async function createCompleteApplication(userId, formData) {
    const { applicationData, resultData, documentsData } = formData

    // 1. Tạo đơn xét tuyển trước
    const application = new Application({
        userId,
        universityMajorId: applicationData.universityMajorId,
        subjectCombinationId: applicationData.subjectCombinationId || null,
        admissionMethod: applicationData.admissionMethod,
        status: 'cho_duyet'
    })
    await application.save()

    // 2. Tạo kết quả nếu có
    let applicationResult = null
    if (resultData && resultData.method) {
        applicationResult = await ApplicationResultService.createApplicationResult(
            application._id,
            resultData
        )
    }

    // 3. Tạo tài liệu nếu có
    const createdDocuments = []
    if (documentsData && Array.isArray(documentsData)) {
        for (const document of documentsData) {
            const createdDocument = await DocumentService.createDocument({
                ...document,
                applicationId: application._id
            })
            createdDocuments.push(createdDocument)
        }
    }
    console.log('createdDocuments', createdDocuments)
    // 4.Trả về đơn xét tuyển với kết quả
    return {
        application,
        applicationResult,
        documents: createdDocuments
    }
}

