import { defineStore } from 'pinia';

export const useUiStore = defineStore('ui', {
	state: () => ({
		drawer: true,
		start: false,
		end: false,
		currentDate: '',
	}),
	getters: {
		getDrawer: (state) => state.drawer,
	},
	actions: {
		updateDrawer(payload: boolean) {
			this.drawer = payload;
		},
	},
});
