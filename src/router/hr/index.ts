import { useAuthStore } from '@/store/auth';

const requireAuth = () => (to: any, from: any, next: any) => {
	const authStore = useAuthStore();

	if (authStore.getPermission === true || authStore.getPermission === 'ADMIN') {
		return next();
	}
	next('/dashboard');
};

const hr = [
	{
		path: '/hr/management',
		component: () => import('@/pages/hr/management/management.vue'),
		meta: {
			title: '인력',
			isActive: true,
			isAdmin: false,
		},
	},
	{
		path: '/hr/dept',
		component: () => import('@/pages/hr/management/dept.vue'),
		meta: {
			title: '소속/부서',
			isActive: true,
			isAdmin: false,
		},
	},
	{
		path: '/hr/create/admin',
		component: () => import('@/pages/hr/management/hrSave.vue'),
		meta: {
			title: '사원 추가',
			isActive: true,
			isAdmin: true,
		},
		beforeEnter: requireAuth(),
	},
	{
		path: '/hr/update/admin',
		name: 'UpdateEmployee',
		component: () => import('@/pages/hr/management/hrUpdate.vue'),
		meta: {
			title: '사원 수정',
			isActive: false,
			isAdmin: true,
		},
		beforeEnter: requireAuth(),
	},
];

export default hr;
