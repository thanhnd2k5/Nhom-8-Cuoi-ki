import { Document } from '@/models'
import { FileUpload } from '@/utils/classes'
export async function createDocument(data) {
    console.log('data', data)
    if (data.file) {
        console.log('data.file', data.file)
        data.file = await data.file.save()
    }
    const document = await Document.create(data)
    return document
}

export async function updateDocument(documentData, data) {
    if (data.file && documentData.file && data.file !== documentData.file) {
        FileUpload.remove(documentData.file)
        data.file = await data.file.save()
        documentData.file = data.file
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