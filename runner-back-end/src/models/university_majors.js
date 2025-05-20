import createModel from './base'
import mongoose from 'mongoose'

const UniversityMajors = createModel(
    'UniversityMajors',
    'university_majors', 
    {
        university_id: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'University' 
        },
        major_id: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Major'
        },
        major_code: {
            type: String,
        },
    }
)

export default UniversityMajors
