import * as statisticsService from '@/app/services/statistics.service'

export async function getStatisticsByUniversity(req, res) {
    try {
        const statistics = await statisticsService.getStatisticsByUniversity()
        return res.status(200).json({
            success: true,
            data: statistics
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export async function getStatisticsByMajor(req, res) {
    try {
        const statistics = await statisticsService.getStatisticsByMajor()
        return res.status(200).json({
            success: true,
            data: statistics
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export async function getStatisticsByStatus(req, res) {
    try {
        const statistics = await statisticsService.getStatisticsByStatus()
        return res.status(200).json({
            success: true,
            data: statistics
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export async function getStatisticsByDate(req, res) {
    try {
        const statistics = await statisticsService.getStatisticsByDate()
        return res.status(200).json({
            success: true,
            data: statistics
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export async function getStatisticsByMonth(req, res) {
    try {
        const statistics = await statisticsService.getStatisticsByMonth()
        return res.status(200).json({
            success: true,
            data: statistics
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export async function getStatisticsByYear(req, res) {
    try {
        const statistics = await statisticsService.getStatisticsByYear()
        return res.status(200).json({
            success: true,
            data: statistics
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export async function getStatisticsBetweenUniversities(req, res) {
    try {
        const statistics = await statisticsService.getStatisticsBetweenUniversities()
        return res.status(200).json({
            success: true,
            data: statistics
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}