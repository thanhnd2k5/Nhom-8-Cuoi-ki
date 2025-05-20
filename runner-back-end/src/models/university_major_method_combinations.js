import createModel from './base'
import mongoose from 'mongoose'

const UniversityMajorMethodCombinations = createModel(
    'UniversityMajorMethodCombinations',
    'university_major_method_combinations',
    {
        university_major_method_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UniversityMajorMethods',
        },
        subject_combination_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SubjectCombinations',
        },
    }
)

export default UniversityMajorMethodCombinations
