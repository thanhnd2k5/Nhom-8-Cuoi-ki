import createModel from './base'

const Major = createModel(
    'Major',
    'majors',
    {
        name: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
        },
        universityId: {
            type: String,
            required: true,
            ref: 'University',
        },
        description: {
            type: String,
        },
    }
)

export default Major
