import createModel from './base'
import { Schema } from 'mongoose'

const ApplicationResult = createModel(
    'ApplicationResult',
    'application_results',
    {
        applicationId: {
            type: Schema.Types.ObjectId,
            ref: 'Application',
            required: true,
        },
        method: {
            type: String,
            default: '',
        },
        gpaGrade10: {
            type: Number,
            default: 0,
        },
        gpaGrade11: {
            type: Number,
            default: 0,
        },
        gpaGrade12: {
            type: Number,
            default: 0,
        },
        subjectScores: {
            type: Object,
            default: {},
        },
        totalScore: {
            type: Number,
            default: 0,
        },
    }
)

export default ApplicationResult

