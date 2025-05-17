import createModel from './base'
import { Schema } from 'mongoose'

const University = createModel(
    'University',
    'universities',
    {
        name: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
        },
        logo: {
            type: String,
            default: '',
        },
        address: {
            type: String,
            default: '',
        },
        website: {
            type: String,
            default: '',
        },
        email: {
            type: String,
            default: '',
        },
        phone: {
            type: String,
            default: '',
        },
        description: {
            type: String,
            default: '',
        },
    }
)

export default University
