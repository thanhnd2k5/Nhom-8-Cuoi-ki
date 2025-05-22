import { Document } from '@/models'

export async function createDocument(data) {
    const document = await Document.create(data)
    return document
}

export async function updateDocument(id, data) {
    const document = await Document.findByIdAndUpdate(id, data, { new: true })
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