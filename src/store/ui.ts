import { defineStore } from 'pinia';
import { Loading } from 'quasar';

interface Dialog {
	show?: boolean;
	code?: string;
	status?: string;
	message?: string;
}

export const useUiStore = defineStore('ui', {
	state: () => ({
		drawer: true,
		start: false,
		end: false,
		currentDate: '',
		dateString: '',
		timeString: '',
		img: '',
		name: '',
		department: '',
		rank: '',
		dialog: {
			show: false,
			code: '',
			status: '',
			message: '',
		} as Dialog,
	}),
	getters: {
		getDrawer: (state) => state.drawer,
		getDialog: (state) => state.dialog,
	},
	actions: {
		updateDrawer(payload: boolean) {
			this.drawer = payload;
		},
		showLoading() {
			Loading.show();
		},
		hideLoading() {
			Loading.hide();
		},
		showDialog(payload: Dialog) {
			this.dialog = {
				code: payload.code,
				message: payload.message,
				status: payload.status,
				show: true,
			};
		},
		hideDialog() {
			this.dialog = { show: false, code: '', status: '', message: '' };
		},
	},
});
