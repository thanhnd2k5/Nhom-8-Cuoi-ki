import createModel, { ADMISSION_METHOD } from './base'
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
        universityMajorId: {
            type: Schema.Types.ObjectId,
            ref: 'UniversityMajor',
            required: true,
        },
        admissionMethod: {
            type: String,
            enum: Object.values(ADMISSION_METHOD),
            default: '',
        },
        subjectCombinationId: {
            type: Schema.Types.ObjectId,
            ref: 'SubjectCombination',
        },
        status: {
            type: String,
            default: '',
        },
    }
)

export default Application
