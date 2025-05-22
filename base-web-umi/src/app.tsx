import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import { notification } from 'antd';
import 'moment/locale/vi';
import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
import { getIntl, getLocale, history } from 'umi';
import type { RequestOptionsInit, ResponseError } from 'umi-request';
import defaultSettingsConfig from '../config/defaultSettings';
import allAppRoutes from '../config/routes';
import ErrorBoundary from './components/ErrorBoundary';
// import LoadingPage from './components/Loading';
import { OIDCBounder } from './components/OIDCBounder';
import { unCheckPermissionPaths } from './components/OIDCBounder/constant';
import OneSignalBounder from './components/OneSignalBounder';
import NotAccessible from './pages/exception/403';
import NotFoundContent from './pages/exception/404';
import type { IInitialState } from './services/base/typing';
import './styles/global.less';
import { currentRole as currentRoleFromUtilsIp } from './utils/ip';

/**  loading */
export const initialStateConfig = {
	loading: <></>,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<IInitialState> {
	let currentUser: { name: string; role: string; avatar?: string; id?: string; [key: string]: any } | undefined =
		undefined;
	const loginPath = '/login';

	try {
		const storedRole = localStorage.getItem('user_role');
		if (storedRole === 'admin') {
			currentUser = { name: 'Admin (Mock)', role: 'admin', avatar: '/avatar-admin.png', id: 'admin1' };
		} else if (storedRole === 'user') {
			currentUser = { name: 'User (Mock)', role: 'user', avatar: '/avatar-user.png', id: 'user1' };
		}
	} catch (e) {
		console.error('Lỗi khi truy cập localStorage hoặc xác định người dùng:', e);
	}

	if (currentUser) {
		return {
			currentUser,
			authorizedPermissions: [],
			permissionLoading: false,
			settings: defaultSettingsConfig,
		};
	}

	return {
		permissionLoading: false,
		settings: defaultSettingsConfig,
	};
}

// Tobe removed
const authHeaderInterceptor = (url: string, options: RequestOptionsInit) => ({});

/**
 * @see https://beta-pro.ant.design/docs/request-cn
 */
export const request: RequestConfig = {
	errorHandler: (error: ResponseError) => {
		const { messages } = getIntl(getLocale());
		const { response } = error;

		if (response && response.status) {
			const { status, statusText, url } = response;
			const requestErrorMessage = messages['app.request.error'];
			const errorMessage = `${requestErrorMessage} ${status}: ${url}`;
			const errorDescription = messages[`app.request.${status}`] || statusText;
			notification.error({
				message: errorMessage,
				description: errorDescription,
			});
		}

		if (!response) {
			notification.error({
				description: 'Yêu cầu gặp lỗi',
				message: 'Bạn hãy thử lại sau',
			});
		}
		throw error;
	},
	requestInterceptors: [authHeaderInterceptor],
};

// ProLayout  https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
	const userRole = initialState?.currentUser?.role;

	return {
		unAccessible: (
			<OIDCBounder>
				<NotAccessible />
			</OIDCBounder>
		),
		noFound: <NotFoundContent />,
		rightContentRender: () => <RightContent currentUser={initialState?.currentUser} setInitialState={setInitialState} />,
		disableContentMargin: false,
		footerRender: () => <Footer />,

		onPageChange: () => {
			const { currentUser } = initialState || {};
			const { location } = history;
			const loginPath = '/login';

			if (currentUser) {
				const role = currentUser.role;

				if (location.pathname === '/' || location.pathname === loginPath) {
					if (role === 'admin') {
						history.replace('/admin/dashboard');
					} else if (role === 'user') {
						history.replace('/user/profile');
					} else {
						history.replace('/dashboard');
					}
					return;
				}

				if (role === 'user' && location.pathname.startsWith('/admin')) {
					history.replace('/403');
					return;
				}
				if (role === 'admin' && location.pathname.startsWith('/user')) {
					history.replace('/403');
					return;
				}

				const isUncheckPath = unCheckPermissionPaths.some((path) =>
					window.location.pathname.includes(path),
				);
				if (
					!isUncheckPath &&
					currentRoleFromUtilsIp &&
					initialState?.authorizedPermissions?.length &&
					!initialState?.authorizedPermissions?.find((item) => item.rsname === currentRoleFromUtilsIp)
				) {
					history.replace('/403');
				}
			} else {
				const publicPaths = [
					loginPath,
					'/',
					'/landingpage',
					...unCheckPermissionPaths,
					'/notification/subscribe',
					'/notification/check',
					'/403',
					'/hold-on',
				];
				const isPublicPage = publicPaths.some((path) => location.pathname.startsWith(path));

				if (!isPublicPage && location.pathname !== '/404') {
					history.replace(loginPath);
				}
			}
		},

		menuDataRender: () => {
			if (userRole === 'admin') {
				const adminTopRoute = allAppRoutes.find((r) => r.path === '/admin');
				return adminTopRoute?.routes?.filter((r: any) => r.name && r.path) || [];
			}
			if (userRole === 'user') {
				const userTopRoute = allAppRoutes.find((r) => r.path === '/user');
				return userTopRoute?.routes?.filter((r: any) => r.name && r.path) || [];
			}
			return [];
		},

		menuItemRender: (item: any, dom: any) => (
			<a
				className='not-underline'
				key={item?.key || item?.path}
				href={item?.key || item?.path}
				onClick={(e) => {
					e.preventDefault();
					history.push(item?.key || item?.path ?? '/');
				}}
				style={{ display: 'block' }}
			>
				{dom}
			</a>
		),

		childrenRender: (dom) => (
			<OIDCBounder>
				<ErrorBoundary>
					<OneSignalBounder>{dom}</OneSignalBounder>
				</ErrorBoundary>
			</OIDCBounder>
		),
		menuHeaderRender: undefined,
		...initialState?.settings,
	};
};
