import createModel from './base'
import { Schema } from 'mongoose'

const Major = createModel(
    'Major',
    'majors',
    {
        universityId: {
            type: Schema.Types.ObjectId,
            ref: 'University',
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
        },
        admissionMethods: {
            type: [String],
            default: [],
        },
    }
)

export default Major
