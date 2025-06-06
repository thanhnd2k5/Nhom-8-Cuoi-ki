import createModel, {ObjectId} from './base'

const UserRole = createModel(
    'UserRole',
    'user_roles',
    {
        name: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            default: null,
        },
        description: {
            type: String,
            default: '',
        },
        can_delete: {
            type: Boolean,
            required: true,
            default: true,
        },
        permission_ids: {
            type: [ObjectId],
            required: true,
            default: [],
        }
    }
)

export default UserRole
