import {Application, Document} from '@/models'
import * as ApplicationResultService from './application_results.service'
import * as DocumentService from './documents.service'
import { abort } from '@/utils/helpers'

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
    console.log(formData)

    // 1. Tạo đơn xét tuyển
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
                applicationId: application._id,
                ...document
            })
            createdDocuments.push(createdDocument)
        }
    }

    // 4. Trả về kết quả
    return {
        application,
        applicationResult,
        documents: createdDocuments
    }
}

// Lấy chi tiết đơn xét tuyển (bao gồm kết quả và tài liệu)
export async function getCompleteApplicationById(applicationId) {
    // 1. Lấy đơn xét tuyển
    const application = await Application.findById(applicationId)
        .populate('userId', 'name email')
        .populate('universityMajorId')
        .populate('subjectCombinationId')

    if (!application){
        abort(404, 'Application not found')
    }

    // 2. Lấy kết quả xét tuyển
    const applicationResult = await ApplicationResultService.getApplicationResultByApplicationId(applicationId)

    // 3. Lấy danh sách tài liệu
    const documents = await Document.find({ applicationId })

    // 4. Trả về đầy đủ
    return {
        application,
        applicationResult,
        documents
    }
}
