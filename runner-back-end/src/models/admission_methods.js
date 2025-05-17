import createModel from './base'

const AdmissionMethod = createModel(
    'AdmissionMethod',
    'admission_methods',
    {
        name: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: '',
        },
        requiredDocuments: {
            type: [String],
            required: true,
        }
    }
)

export default AdmissionMethod
