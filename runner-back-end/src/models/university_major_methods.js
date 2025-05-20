import createModel from './base'
import mongoose from 'mongoose'

const UniversityMajorMethods = createModel(
    'UniversityMajorMethods', 
    'university_major_methods', {
        university_major_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UniversityMajors',
            required: true,
        },
        method: {
            type: String,
            required: true,
        },
    })

export default UniversityMajorMethods
