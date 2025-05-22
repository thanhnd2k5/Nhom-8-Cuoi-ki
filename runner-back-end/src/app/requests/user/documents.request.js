import Joi from 'joi'

export const createDocumentSchema = Joi.object({
    applicationId: Joi.string().required(),
    type: Joi.string().required(),
    fileUrl: Joi.string().required(),
    fileType: Joi.string().required()
})

export const updateDocumentSchema = Joi.object({
    type: Joi.string(),
    fileUrl: Joi.string(),
    fileType: Joi.string()
}) 