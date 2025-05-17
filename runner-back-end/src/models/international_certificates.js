import createModel from './base'

const InternationalCertificate = createModel(
    'InternationalCertificate',
    'international_certificates',
    {
        applicationId: {
            type: String,
            required: true,
            ref: 'Application',
        },
        certificateType: {
            type: String,
            required: true,
        },
        totalScore: {
            type: Number,
            default: 0,
        },
        readingWritingScore: {
            type: Number,
            default: 0,
        },
        listeningScore: {
            type: Number,
            default: 0,
        },
        speakingScore: {
            type: Number,
            default: 0,
        },
        examDate: {
            type: Date,
            default: '',
        },
        priorityScore: {
            type: Number,
            default: 0,
        },
    }
)

export default InternationalCertificate
