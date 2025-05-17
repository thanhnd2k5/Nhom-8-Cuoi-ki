import mongoose from 'mongoose'

export default function createModel(name, collection, definition, options) {
    const schema = new mongoose.Schema(definition, {
        timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'},
        versionKey: false,
        id: false,
        toJSON: {getters:true, virtuals: true},
        ...(options ?? {}),
    })

    return mongoose.model(name, schema, collection)
}

export const {ObjectId} = mongoose.Types

export const ROLE = {
    SUPER_ADMIN: 'super-admin'
}

export const PERMISSION = {
    SUPER_ADMIN: 'super-admin',
    // Role management
    LIST_ROLE: 'list-role',
    CREATE_ROLE: 'create-role',
    UPDATE_ROLE: 'update-role',
    DELETE_ROLE: 'delete-role',

    // Permission management
    UPDATE_PERMISSION_FOR_ROLE: 'update-permission-for-role',
}

export const USER_PERMISSION = {
    // Club management
    REMOVE_MEMBER: 'remove-member',
    ACCEPT_MEMBER: 'accept-member'
}

export const USER_ROLE = {
    MANAGER: 'manager',
    CENSOR: 'censor'
}

export const STATUS_ACCOUNT = {
    ACTIVE: 'ACTIVE',
    DE_ACTIVE: 'DE_ACTIVE',
}

export const PRIORITY_AREA = {
    KV1: 'KV1',
    KV2: 'KV2',
    KV2_NT: 'KV2-NT',
    KV3: 'KV3'
}

export const PRIORITY_GROUP = {
    GROUP_01: '01',
    GROUP_02: '02',
    GROUP_03: '03',
    GROUP_04: '04',
    GROUP_05: '05',
    GROUP_06: '06',
    GROUP_07: '07',
    OTHER: 'OTHER'
}

export const GENDER = {
    MALE: 'MALE',
    FEMALE: 'FEMALE',
    OTHER: 'OTHER'
}

export const STATUS_APPLICATION = {
    PENDING: 'PENDING',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED',
}

export const STATUS_DOCUMENT = {
    PENDING: 'PENDING',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED',
}

export const DOCUMENT_TYPE = {
    IDENTITY_CARD: 'IDENTITY_CARD',
    HIGH_SCHOOL_CERTIFICATE: 'HIGH_SCHOOL_CERTIFICATE',
    COLLEGE_CERTIFICATE: 'COLLEGE_CERTIFICATE',
    SAT: 'SAT',
    ACT: 'ACT',
    TOEFL: 'TOEFL',
    IELTS: 'IELTS',
    OTHER: 'OTHER'
}

export const NOTIFICATION_TYPE = {
    APPLICATION_STATUS_CHANGE: 'APPLICATION_STATUS_CHANGE',
    DOCUMENT_STATUS_CHANGE: 'DOCUMENT_STATUS_CHANGE',
    COMBINATION_STATUS_CHANGE: 'COMBINATION_STATUS_CHANGE',
    MAJOR_STATUS_CHANGE: 'MAJOR_STATUS_CHANGE',
    UNIVERSITY_STATUS_CHANGE: 'UNIVERSITY_STATUS_CHANGE',
    OTHER: 'OTHER'
}

export const INTERNATIONAL_CERTIFICATE_TYPE = {
    IELTS: 'IELTS',
    TOEFL: 'TOEFL',
    TOEIC: 'TOEIC',
    ACT: 'ACT',
    SAT: 'SAT',
}

export const UNIVERSITY_EXAM_SCORE_TYPE = {
    DGNL: 'DGNL', //Kì thi đánh giá năng lực của Đại học Quốc gia Hà Nội
    TSA: 'TSA', //Kì thi tư duy sáng tạo của ĐH Bách Khoa Hà Nội
}

export const DIRECT_ADMISSION_TYPE = {
    NATIONAL_EXCELLENT_STUDENT: 'NATIONAL_EXCELLENT_STUDENT',
    NATIONAL_SCI_TECH_AWARD: 'NATIONAL_SCI_TECH_AWARD',
    PROVINCIAL_EXCELLENT_STUDENT: 'PROVINCIAL_EXCELLENT_STUDENT',
    OTHER_SPECIAL_CASE: 'OTHER_SPECIAL_CASE'
}

export const TALENT_FIELD = {
    MUSIC: 'MUSIC',
    DANCE: 'DANCE',
    PAINTING: 'PAINTING',
    SPORTS: 'SPORTS',
    ROBOTICS: 'ROBOTICS',
    DEBATE: 'DEBATE',
    OTHER: 'OTHER'
}
