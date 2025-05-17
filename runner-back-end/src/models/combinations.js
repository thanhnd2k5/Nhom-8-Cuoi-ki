import createModel from './base'

const Combination = createModel(
    'Combination',
    'combinations',
    {
        name: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
        },
        subjects: {
            type: [String],
            required: true,
        }
    }
)

export default Combination
