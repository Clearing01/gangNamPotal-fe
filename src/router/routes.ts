import { RouteRecordRaw } from 'vue-router';
import router from '@/router';
import main from './main';
import mypage from './mypage';

// const loginState = async () => {
// 	console.log(router);
// };

export const routes: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: '/login',
	},
	{
		path: '/beforeEnter',
		name: 'beforeEnter',
		component: () => import('../pages/beforeEnter/index.vue'),
		// beforeEnter: [loginState],
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
