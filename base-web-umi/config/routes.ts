import component from "@/locales/en-US/component";

export default [
	{
		path: '/',
		component: './LandingPage',
		
		
	},
	{
		path: '/user/register',
		component: './User/Register',
	},
	{
		path: '/user/login',
		component: './User/Login',
	},
<<<<<<< HEAD
	{ 
		path: '/admin/dashboard',
		component: './Admin/Dashboard/index',

	},	
=======
	

>>>>>>> 4afd5aea3918128c730372083cd85c0ee88c52e0
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
