const hr = [
	{
		path: '/hr/management',
		component: () => import('@/pages/hr/management/management.vue'),
		meta: {
			title: '인력',
			isActive: false,
		},
	},
	{
		path: '/hr/dept',
		component: () => import('@/pages/hr/management/dept.vue'),
		meta: {
			title: '소속/부서',
			isActive: false,
		},
	},
];

export default hr;
