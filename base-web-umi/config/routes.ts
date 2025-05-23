export default [
	{
		path: '/',
		component: './LandingPage',
		
		
	},
	{
		path: '/user/register',
		component: './User/Register',
		layout: false,
	},
	{
		path: '/user/login',
		component: './User/Login',
		layout: false,
	},
	{
		path: '/',
		component: './LandingPage',
		layout: false, // <--- Dòng này sẽ ẩn sidebar, header, footer ở trang landing
	  },
	{
		path: '/user/dashboard',
		name: 'Trang chủ',
		icon: 'home',
		component: './User/Dashboard', // hoặc component trang chủ của bạn
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
