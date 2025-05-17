import createModel from './base'
import { Schema } from 'mongoose'

const Document = createModel(
    'Document',
    'documents',
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        applicationId: {
            type: Schema.Types.ObjectId,
            ref: 'Application',
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        //tài liệu minh chứng
        file: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        }
    }
)

export default Document
