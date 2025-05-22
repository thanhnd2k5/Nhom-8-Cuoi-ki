import Joi from 'joi'

export const createApplicationSchema = Joi.object({
    userId: Joi.string().required(),
    universityId: Joi.string().required(),
    majorId: Joi.string().required(),
    subjectCombinationId: Joi.string(),
    admissionMethod: Joi.string(),
    status: Joi.string()
})

export const updateApplicationSchema = Joi.object({
    universityId: Joi.string(),
    majorId: Joi.string(),
    subjectCombinationId: Joi.string(),
    admissionMethod: Joi.string(),
    status: Joi.string()
}) 