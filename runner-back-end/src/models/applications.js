import createModel from './base'
import { Schema } from 'mongoose'

const Application = createModel(
    'Application',
    'applications',
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        universityId: {
            type: Schema.Types.ObjectId,
            ref: 'University',
            required: true,
        },
        majorId: {
            type: Schema.Types.ObjectId,
            ref: 'Major',
            required: true,
        },
        subjectCombinationId: {
            type: Schema.Types.ObjectId,
            ref: 'SubjectCombination',
        },
        admissionMethod: {
            type: String,
            default: '',
        },
        status: {
            type: String,
            default: '',
        },
    }
)

export default Application
