export default [
	{
		path: '/',
		component: './LandingPage',
	},
	{
		path: '/user',
		layout: false,
		routes: [
			// Routes không dùng layout (Auth pages)
			{
				path: '/user/register',
				component: './User/Auth/Register',
			},
			{
				path: '/user/login',
				component: './User/Auth/Login',
			},
			// Routes sử dụng UserLayout
			{
				path: '/user',
				component: '@/layouts/UserLayout',
				routes: [
					{
						path: '/user/dashboard',
						component: './User/Dashboard',
					},
					{
						path: '/user/profile',
						component: './User/ProfilePage',
					},
					{
						path: '/user/applications',
						name: 'applications',
						component: './User/ApplicationsPage',
					},
					// {
					// 	path: '/user/applications/:id',
					// 	name: 'applicationDetail',
					// 	component: './User/ApplicationDetailPage',
					// },
					{
						path: '/user/applications/new',
						name: 'newApplication',
						component: './User/NewApplication/Step1',
					},
					{
						path: '/user/applications/new/step2',
						name: 'newApplicationStep2',
						component: './User/NewApplication/Step2',
					},

					{
						path: '/user/applications/new/step3',
						name: 'newApplicationStep3',
						component: './User/NewApplication/Step3',
					},
					{
						path: '/user/applications/new/step4',
						name: 'newApplicationStep4',
						component: './User/NewApplication/Step4',
					},
					{
						path: '/user/applications/new/step5',
						name: 'newApplicationStep5',
						component: './User/NewApplication/Step5',
					},
					{
						path: '/user/applications/new/step6',
						name: 'newApplicationStep6',
						component: './User/NewApplication/Step6',
					},

					{
						path: '/user/applications/:id',
						name: 'detailApplication',
						component: './User/DetailApplications',

					}
					
					// {
					// 	path: '/user/settings',
					// 	component: './User/Settings', // Tạo component này sau
					// },
				],
			},
		],
	},
	{
		path: '/admin',
		routes: [
			{
				path: '/admin/login',
				component: './Admin/Auth/LoginPage',
			},
			{
				path: '/admin/Statistics',
				component: './Admin/Statistics',
			
			}
		],
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
