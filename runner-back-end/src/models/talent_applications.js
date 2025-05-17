import createModel from './base'

const TalentApplication = createModel(
    'TalentApplication',
    'talent_applications',
    {
        applicationId: {
            type: String,
            required: true,
            ref: 'Application',
        },
        talentField: {
            type: String,
            default: '',
        },
        description: {
            type: String,
            default: '',
        },
        achievement: {
            type: String,
            default: '',
        },
        file: {
            type: String,
            default: '',
            ref: 'Document',
        },
        priorityScore: {
            type: Number,
            default: 0,
        },
    }
)

export default TalentApplication
