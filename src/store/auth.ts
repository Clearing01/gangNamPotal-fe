import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

export const useAuthStore = defineStore('auth', {
	state: () => ({
		user: useLocalStorage('auth/login', {
			id: '1',
			name: '김테스트',
			email: 'test@test.com',
			role: 'admin',
			token: 'ABC123',
		}),
	}),
	getters: {
		isAuthenticated: (state) => !!state.user.token,
	},
	actions: {
		/*
		 * @param {Object} payload
		 */
		login: ({ state, payload }: { state: any; payload: any }) => {
			state.user = payload;
		},
	},
});
