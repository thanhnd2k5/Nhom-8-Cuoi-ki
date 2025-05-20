import createModel from './base'
import { Schema } from 'mongoose'


const MajorCombination = createModel(
    'MajorCombination',
    'major_combinations',
    {
        majorId: {
            type: Schema.Types.ObjectId,
            ref: 'Major',
            required: true,
        },
        subjectCombinationId: {
            type: Schema.Types.ObjectId,
            ref: 'SubjectCombination',
            required: true,
        },
    }
)

export default MajorCombination
