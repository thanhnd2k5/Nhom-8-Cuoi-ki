export default [
	{
		path: '/login',
		component: './User/Login',
		layout: false,
	},
	{
		path: '/',
		component: './LandingPage',
	},

	// DANH MUC HE THONG
	// {
	// 	name: 'DanhMuc',
	// 	path: '/danh-muc',
	// 	icon: 'copy',
	// 	routes: [
	// 		{
	// 			name: 'ChucVu',
	// 			path: 'chuc-vu',
	// 			component: './DanhMuc/ChucVu',
	// 		},
	// 	],
	// },

	// Admin Routes
	{
		path: '/admin',
		routes: [
			{
				path: '/admin/dashboard',
				name: 'Bảng điều khiển Admin',
				icon: 'dashboard',
				component: './Admin/Dashboard',
			},
			{
				path: '/admin/users',
				name: 'Quản lý người dùng',
				icon: 'team',
				component: './Admin/Users',
			},
			{ path: '/admin', redirect: '/admin/dashboard', exact: true },
			{ component: './exception/404' },
		],
	},

	// User Routes
	{
		path: '/user',
		routes: [
			{
				path: '/user/profile',
				name: 'Hồ sơ của tôi',
				icon: 'profile',
				component: './User/Profile',
			},
			{
				path: '/user/settings',
				name: 'Cài đặt tài khoản',
				icon: 'setting',
				component: './User/Settings',
			},
			{ path: '/user', redirect: '/user/profile', exact: true },
			{ component: './exception/404' },
		],
	},

	{
		path: '/notification',
		routes: [
			{
				path: '/notification/subscribe',
				exact: true,
				component: './ThongBao/Subscribe',
			},
			{
				path: '/notification/check',
				exact: true,
				component: './ThongBao/Check',
			},
			{
				path: '/notification/',
				exact: true,
				component: './ThongBao/NotifOneSignal',
			},
		],
		layout: false,
		hideInMenu: true,
	},
	{
		path: '/403',
		component: './exception/403/403Page',
		layout: false,
	},
	{
		path: '/hold-on',
		component: './exception/DangCapNhat',
		layout: false,
	},
	{
		component: './exception/404',
	},
];
