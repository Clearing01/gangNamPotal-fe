import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useAuthStore } from '@/store/auth';
import { useUiStore } from '@/store/ui';
import { Notify } from 'quasar';
import router from '@/router';

export interface HttpResponse<T = unknown> {
	data: T;
	code: string;
	status: string;
	message?: string;
}

interface Notification {
	caption: string;
	type: string;
	icon: string;
	classes: string;
	timeout: number;
	message?: string;
}

const TIMEOUT = 30000;

const api: AxiosInstance = Axios.create({
	// baseURL: import.meta.env.BASE_URL + '/api',
	// baseURL: import.meta.env.BASE_URL,
	baseURL: 'http://10.220.230.129:8080',
	headers: {
		'Access-Control-Allow-Origin': '*',
	},
	timeout: TIMEOUT,
});

api.interceptors.response.use(
	(res: AxiosResponse<HttpResponse>) => {
		if (res.data) {
			return res;
		}
		errorStatus(res);
		return Promise.reject(res);
	},
	async (error) => {
		const response = error.response;

		response?.data?.code === '401' || response?.data?.code === '403' ? errorDialog(response) : errorStatus(response);

		return Promise.reject(response);
	}
);
api.interceptors.request.use((req: AxiosRequestConfig) => {
	req.headers = authHeader(req);
	return req;
});
const authHeader = (req: AxiosRequestConfig) => {
	const authStore = useAuthStore();
	const token = authStore.getAuthorization;
	if (token) {
		req.headers!.Authorization = token;
	}
	return req.headers;
};
const errorStatus = (response: AxiosResponse) => {
	let notify: Notification = {
		caption: response?.data?.message,
		type: 'negative',
		icon: 'warning',
		classes: 'app-notify',
		timeout: 3,
	};

	switch (response?.status) {
		case 400:
			notify = { ...notify };
			break;
		// case 401:
		// 	notify = { ...notify };
		// 	break;
		// case 403:
		// 	notify = { ...notify, message: '잘못된 요청' };
		// 	break;
		case 404:
			notify = { ...notify };
			break;
		case 405:
			notify = { ...notify };
			break;
		case 406:
			notify = { ...notify };
			break;
		case 408:
			notify = { ...notify };
			break;
		case 409:
			notify = { ...notify };
			break;
		case 500:
			break;
		case 501:
			break;
		case 502:
			break;
		case 504:
			break;
		default: {
		}
	}
	Notify.create(notify);
};

const errorDialog = (res: AxiosResponse) => {
	const uiStore = useUiStore();
	uiStore.showDialog(res.data);
};

export default api;
