import { Document } from '@/models'
import { FileUpload } from '@/utils/classes'
export async function createDocument(data) {
    if (data.fileUrl) {
        data.fileUrl = await data.fileUrl.save()
    }
    const document = await Document.create(data)
    return document
}

export async function updateDocument(documentData, data) {
    if (data.fileUrl && documentData.fileUrl && data.fileUrl !== documentData.fileUrl) {
        FileUpload.remove(documentData.fileUrl)
        data.fileUrl = await data.fileUrl.save()
        documentData.fileUrl = data.fileUrl
    }
    const document = await Document.findByIdAndUpdate(documentData._id, data, { new: true })
    return document
}

export async function deleteDocument(id) {
    const document = await Document.findByIdAndDelete(id)
    return document
}

export async function getDocumentById(id) {
    const document = await Document.findById(id)
    return document
}

export async function getDocumentsByApplicationId(applicationId) {
    const documents = await Document.find({ applicationId })
    return documents
} 