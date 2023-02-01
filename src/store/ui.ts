import { defineStore } from 'pinia';
import { Loading } from 'quasar';
import { Notify } from 'quasar';
import mitt from 'mitt';

const emitter = mitt();

interface Dialog {
	show?: boolean;
	code?: string;
	status?: string;
	message?: string;
}

interface Notification {
	caption: string;
	type: string;
	icon: string;
	classes: string;
	timeout: number;
}

export const useUiStore = defineStore('ui', {
	state: () => ({
		dataReload: false,
		selectMenu: '',
		emitter: emitter,
		drawer: true,
		start: false,
		end: false,
		currentDate: '',
		dateString: '',
		timeString: '',
		dialog: {
			show: false,
			code: '',
			status: '',
			message: '',
		} as Dialog,
		notification: {
			caption: '',
			type: '',
			icon: '',
			classes: '',
			timeout: 500,
		} as Notification,
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
		showNotification(payload: Notification) {
			this.notification = {
				caption: payload.caption,
				type: payload.type,
				icon: payload.icon,
				classes: payload.classes,
				timeout: payload.timeout,
			};

			Notify.create(this.notification);
		},
	},
});
