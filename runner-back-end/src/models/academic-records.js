import createModel from './base'
import { Schema } from 'mongoose'

const AcademicRecords = createModel(
    'AcademicRecords',
    'academic-records',
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        schoolName: {   
            type: String,
            required: true,
        },
        graduationYear: {
            type: String,
            required: true,
        },
        gpa10: {
            type: Number,
            default: 0,
        },
        gpa11: {
            type: Number,
            default: 0,
        },
        gpa12: {
            type: Number,
            default: 0,
        },

        priorityArea: {
            type: String,
            default: '',
        },
        priorityGroup: {
            type: String,
            default: '',
        },
    }
)

export default AcademicRecords
