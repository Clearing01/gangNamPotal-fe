import { createRouter, createWebHistory, RouterOptions } from 'vue-router';
import { routes } from './routes';

const option: RouterOptions = {
	scrollBehavior: () => ({ left: 0, top: 0 }),
	history: createWebHistory(),
	routes,
};

const router = createRouter(option);

router.beforeEach(async (to) => {
	const hasToken = () => false;
	if (hasToken()) {
		return true;
	} else {
		return true;
	}
});

export default router;
