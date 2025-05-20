import Joi from 'joi'
import { University } from '@/models'

export const createUniversityRequest = Joi.object({
    name: Joi.string().label('Tên trường'),
    code: Joi.string()
        .label('Mã trường')
        .custom(async (value, helpers) => {
            console.log(value)
            const university = await University.findOne({ code: value })
            if (university) {
                return helpers.message('Mã trường đã tồn tại')
            }
            return value
        }),
    description: Joi.string().label('Mô tả'),
    address: Joi.string().label('Địa chỉ'),
})

export const updateUniversityRequest = Joi.object({
    name: Joi.string().label('Tên trường'),
    code: Joi.string().label('Mã trường'),
    description: Joi.string().label('Mô tả'),
    address: Joi.string().label('Địa chỉ'),
})

export const deleteUniversityRequest = Joi.object({
    id: Joi.string().label('ID'),
})

