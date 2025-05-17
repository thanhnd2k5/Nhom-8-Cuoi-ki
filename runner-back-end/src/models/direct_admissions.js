import createModel from './base'

const DirectAdmission = createModel(
    'DirectAdmission',
    'direct_admissions',
    {
        applicationId: {
            type: String,
            required: true,
            ref: 'Application',
        },
        reason: {
            type: String,
            required: true,
        },
        achievement: {
            type: String,
            required: true,
        },
        evidence: {
            type: String,
            required: true,
            ref: 'Document',
        },
        approved: {
            type: Boolean,
            default: false,
        },
        notes: {
            type: String,
            default: '',
        },
    }
)

export default DirectAdmission
