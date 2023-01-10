import { RouteRecordRaw } from 'vue-router';
import main from './main';
import mypage from './mypage';

export const routes: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: '/index',
	},
	{
		path: '/index',
		component: () => import('../layouts/MainLayout.vue'),
		redirect: '/dashboard',
		children: [...main],
	},
	{
		path: '/hr/management/mypage',
		component: () => import('../layouts/MainLayout.vue'),
		children: [...mypage],
	},
	{
		path: '/login',
		component: () => import('../pages/login.vue'),
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
