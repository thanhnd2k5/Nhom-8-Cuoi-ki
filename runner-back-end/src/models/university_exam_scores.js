import createModel from './base'

const UniversityExamScore = createModel(
    'UniversityExamScore',
    'university_exam_scores',
    {
        applicationId: {
            type: String,
            required: true,
            ref: 'Application',
        },
        examName: {
            type: String,
            required: true,
        },
        score: {
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

export default UniversityExamScore
