import hr from './hr';

const main = [
	{
		path: '/dashboard',
		name: 'dashboard',
		component: () => import('../pages/dashboard/index.vue'),
		meta: {
			title: '대시보드',
			isMenu: false,
		},
	},
	{
		path: '/hr',
		name: 'hr',
		component: () => import('../pages/hr/index.vue'),
		redirect: '/hr/management',
		children: [...hr],
		meta: {
			title: '인사관리',
			isMenu: false,
		},
	},
	{
		path: '/attendance',
		name: 'attendance',
		component: () => import('../pages/attendance/index.vue'),
		meta: {
			title: '근태관리',
			isMenu: false,
		},
	},
];

export default main;
