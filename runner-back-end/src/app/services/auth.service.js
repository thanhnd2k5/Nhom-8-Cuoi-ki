import moment from 'moment'
import jwt from 'jsonwebtoken'
import {cache, LOGIN_EXPIRE_IN, TOKEN_TYPE, VALIDATE_EMAIL_REGEX} from '@/configs'
import {abort, generateToken} from '@/utils/helpers'
import {Admin, Permission, STATUS_ACCOUNT, User} from '@/models'

export const tokenBlocklist = cache.create('token-block-list')

export async function checkValidLoginAdmin({phone, password}) {
    const user = await Admin.findOne({phone, deleted: false})

    if (user) {
        const verified = user.verifyPassword(password)
        if (verified) {
            if (user.status === STATUS_ACCOUNT.DE_ACTIVE) {
                abort(400, 'Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản lý.')
            }
            return user
        }
    }

    return false
}

export function authToken(admin) {
    const accessToken = generateToken({adminId: admin._id}, TOKEN_TYPE.ADMIN_AUTHORIZATION, LOGIN_EXPIRE_IN)
    const decode = jwt.decode(accessToken)
    const expireIn = decode.exp - decode.iat
    return {
        access_token: accessToken,
        expire_in: expireIn,
        auth_type: 'Bearer Token',
    }
}

export async function profileAdmin(currentAdmin) {
    const acc = await Admin.findById(currentAdmin._id).select('-password')
        .populate({path: 'roles'})
        .lean()
    const permissionIds = [...acc.roles]
        .map((role) => role.permission_ids)
        .flat()
    const permissions = await Permission.find({_id: {$in: permissionIds}})
    acc.permissions = permissions.map(({code}) => code)
    delete acc.role_ids
    delete acc.roles
    return acc
}

export async function checkValidLoginUser({email, password}) {
    const user = await User.findOne({email, deleted: false})

    if (user) {
        const verified = user.verifyPassword(password)
        if (verified) {
            if (user.status === STATUS_ACCOUNT.DE_ACTIVE) {
                abort(400, 'Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản lý.')
            }
            return user
        }
    }

    return false
}

export function authTokenUser(user) {
    const accessToken = generateToken({userId: user._id}, TOKEN_TYPE.USER_AUTHORIZATION, LOGIN_EXPIRE_IN)
    const decode = jwt.decode(accessToken)
    const expireIn = decode.exp - decode.iat
    return {
        access_token: accessToken,
        expire_in: expireIn,
        auth_type: 'Bearer Token',
    }
}

export async function blockToken(token) {
    const decoded = jwt.decode(token)
    const expiresIn = decoded.exp
    const now = moment().unix()
    await tokenBlocklist.set(token, 1, expiresIn - now)
}

export async function registerUser(userData) {
    // Xác định username là email hay phone
    const isEmail = VALIDATE_EMAIL_REGEX.test(userData.email)
    
    // Kiểm tra email/phone đã tồn tại chưa
    if (isEmail) {
        const existingEmail = await User.findOne({ email: userData.email, deleted: false })
        if (existingEmail) {
            abort(400, 'Email đã được sử dụng.')
        }
    }
    
    // Tạo user mới
    const user = await User.create(userData)
        
    return user
}
