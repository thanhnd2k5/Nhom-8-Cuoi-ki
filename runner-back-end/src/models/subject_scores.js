import createModel from './base'

const SubjectScore = createModel(
    'SubjectScore',
    'subject_scores',
    {
        applicationId: {
            type: String,
            required: true,
            ref: 'Application',
        },
        subject1: {
            type: String,
            required: true,
        },
        score1: {
            type: Number,
            default: 0,
        },
        subject2: {
            type: String,
            required: true,
        },
        score2: {
            type: Number,
            default: 0,
        },
        subject3: {
            type: String,
            required: true,
        },
        score3: {
            type: Number,
            default: 0,
        },
        totalScore: {
            type: Number,
            default: 0,
        },
        priorityScore: {
            type: Number,
            default: 0,
        },
        // học bạ hoặc kì thi trung học phổ thông quốc gia
        source: {
            type: String,
            required: true,
        },
    }
)

export default SubjectScore
