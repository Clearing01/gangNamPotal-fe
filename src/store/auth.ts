import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import router from '@/router';

export const useAuthStore = defineStore('auth', {
	state: () => ({
		user: useLocalStorage('auth/login', {
			token: null,
			refreshToken: null,
			permission: null,
		}),
	}),
	getters: {
		isAuthenticated: (state) => !!state.user.token,
		getAuthorization: (state) => state.user.token,
	},
	actions: {
		// login: ({ state, payload }: { state: any; payload: any }) => {
		// 	state.user = payload;
		// },
		googleLogin: () => {},
		kakaoLogin: () => {},
		logout() {
			this.user.token = null;
			this.user.refreshToken = null;
			this.user.permission = null;
			router.push('/login');
		},
	},
});
