import * as ApplicationsService from '@/app/services/applications.service'
import * as MailService from '@/app/services/mail.service'
import { abort } from '@/utils/helpers'

export async function updateApplicationStatus(req, res) {
    const applicationId = req.application._id
    const { status } = req.body

    // Validate status
    const validStatuses = ['cho_duyet', 'da_duyet', 'tu_choi']
    if (!validStatuses.includes(status)) {
        abort(400, 'Invalid status')
    }

    // Update status
    const application = await ApplicationsService.updateApplicationStatus(applicationId, status)

    // Send email notification
    await MailService.sendApplicationStatusEmail(application)

    res.jsonify(application)
}

// Thêm route để lấy tất cả đơn xét tuyển cho admin
export async function getAllApplications(req, res) {
    try {
        const applications = await ApplicationsService.getAllApplications()
        res.jsonify(applications)
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: error.message
        })
    }
}
