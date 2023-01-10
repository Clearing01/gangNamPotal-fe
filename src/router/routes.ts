import { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: '/index',
	},
	{
		path: '/index',
		component: () => import('../layouts/MainLayout.vue'),
		children: [],
	},
	{
		path: '/:catchAll(.*)*',
		component: () => import('../pages/common/404.vue'),
	},
	{
		path: '/404',
		component: () => import('../pages/common/404.vue'),
	},
];
