export default [
	{
		path: '/',
		component: './LandingPage',
		
		
	},
	{
		path: '/user/register',
		component: './User/LoginLogout/Register',
		layout: false,
	},
	{
		path: '/user/login',
		component: './User/LoginLogout/Login',
		layout: false,
	},
	{
		path: '/',
		component: './LandingPage/index',
		layout: false, // <--- Dòng này sẽ ẩn sidebar, header, footer ở trang landing
	},
	{
		path: '/user/dashboard',
		name: 'Trang chủ',
		icon: 'home',
		component: './User/Dashboard/index', // hoặc component trang chủ của bạn
	},
	{
		path: '/user/profile',
		name: 'Hồ sơ cá nhân',
		icon: 'user',
		component: './User/Profile/index',
	},
	{
		path: '/user/admission',
		name: 'Hồ sơ xét tuyển',
		icon: 'user',
		component: './User/Admission/index',
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

	{
		path: '/notification',
		routes: [
			{
				path: './subscribe',
				exact: true,
				component: './ThongBao/Subscribe',
			},
			{
				path: './check',
				exact: true,
				component: './ThongBao/Check',
			},
			{
				path: './',
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
