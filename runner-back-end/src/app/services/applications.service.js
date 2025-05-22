import {Application, Document} from '@/models'

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
        .populate('userId')
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

