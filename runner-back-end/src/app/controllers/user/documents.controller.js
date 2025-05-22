import * as DocumentsService from '@/app/services/documents.service'

export async function createDocument(req, res) {
    try {
        const document = await DocumentsService.createDocument(req.body)
        res.json(document)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export async function updateDocument(req, res) {
    try {
        const document = await DocumentsService.updateDocument(req.params.id, req.body)
        res.json(document)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export async function deleteDocument(req, res) {
    try {
        const document = await DocumentsService.deleteDocument(req.params.id)
        res.json(document)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export async function getDocumentById(req, res) {
    try {
        const document = await DocumentsService.getDocumentById(req.params.id)
        if (!document) {
            return res.status(404).json({ message: 'Document not found' })
        }
        res.json(document)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export async function getDocumentsByApplicationId(req, res) {
    try {
        const documents = await DocumentsService.getDocumentsByApplicationId(req.params.applicationId)
        res.json(documents)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
} 