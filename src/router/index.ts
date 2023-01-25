import { createRouter, createWebHistory, RouterOptions } from 'vue-router';
import { routes } from './routes';
import { useAuthStore } from '@/store/auth';

const option: RouterOptions = {
	scrollBehavior: () => ({ left: 0, top: 0 }),
	history: createWebHistory(),
	routes,
};

const router = createRouter(option);

router.beforeEach(async (to) => {
	const authStore = useAuthStore();
	const hasToken = authStore.isAuthenticated;

	if (!hasToken && to.path !== '/login' && to.path !== '/beforeEnter') {
		await router.replace('/login');
		return true;
	} else {
		return true;
	}
});

export default router;
