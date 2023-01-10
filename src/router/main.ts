const main = [
	{
		path: '/dashboard',
		name: 'dashboard',
		component: () => import('../pages/dashboard/index.vue'),
		children: [],
		meta: {
			title: '대시보드',
			isMenu: false,
		},
	},
	{
		path: '/hr',
		name: 'hr',
		component: () => import('../pages/hr/index.vue'),
		children: [],
		meta: {
			title: '인사관리',
			isMenu: false,
		},
	},
	{
		path: '/attendance',
		name: 'attendance',
		component: () => import('../pages/attendance/index.vue'),
		children: [],
		meta: {
			title: '근태관리',
			isMenu: false,
		},
	},
];


export default main;