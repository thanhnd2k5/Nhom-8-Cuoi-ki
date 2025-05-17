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
        combinationId: {
            type: Schema.Types.ObjectId,
            ref: 'Combination',
            required: true,
        },
        admissionId: {
            type: Schema.Types.ObjectId,
            ref: 'Admission',
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        priorityScore: {
            type: Number,
            required: true,
        },
        totalScore: {
            type: Number,
            required: true,
        }
    }
)

export default Application
