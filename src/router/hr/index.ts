const hr = [
	{
		path: '/hr/management',
		component: () => import('@/pages/hr/management/management.vue'),
		meta: {
			title: '인력',
			isActive: false,
			isAdmin: false,
		},
	},
	{
		path: '/hr/dept',
		component: () => import('@/pages/hr/management/dept.vue'),
		meta: {
			title: '소속/부서',
			isActive: false,
			isAdmin: false,
		},
	},
	{
		path: '/hr/create/admin',
		component: () => import('@/pages/hr/management/hrAdmin.vue'),
		meta: {
			title: '사원 추가',
			isActive: false,
			isAdmin: true,
		},
	},
];

export default hr;
