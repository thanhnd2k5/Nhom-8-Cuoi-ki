import * as universityService from '@/app/services/university.service'

export async function getAll(req, res) {
    const universities = await universityService.getAllUniversities()
    res.json({ success: true, data: universities })
}

export async function getOne(req, res) {
    const university = await universityService.getUniversityById(req.university._id)
    if (!university) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy trường đại học' })
    }
    res.json({ success: true, data: university })
}