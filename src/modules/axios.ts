import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useAuthStore } from '@/store/auth';
import { useUiStore } from '@/store/ui';
import authService from '@/service/authService';
import { debounce } from 'lodash-es';
import router from '@/router';

export interface HttpResponse<T = unknown> {
	data: T;
	code: string;
	status: string;
	message?: string;
}

const TIMEOUT = 30000;

const api: AxiosInstance = Axios.create({
	// baseURL: import.meta.env.BASE_URL + '/api',
	// baseURL: import.meta.env.BASE_URL,
	// baseURL: 'http://localhost:8080',
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

		errorStatus(response);
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
	const refreshToken = authStore.getRefreshToken;
	if (token && refreshToken) {
		req.headers!.Authorization = token;
		req.headers!.RefreshToken = refreshToken;
	}
	return req.headers;
};

const onRequest = async () => {
	await updateToken();
	router.go(0);
};

const updateToken = async () => {
	const authStore = useAuthStore();
	try {
		const response: any = await authService.getRefreshToken(authStore.getRefreshToken);
		const result = response.data.data;

		await authStore.setUserInfo(result);

		return result;
	} catch {}
};

const errorStatus = (response: AxiosResponse) => {
	switch (response?.status) {
		case 400:
			break;
		case 401:
			if (response.data.message == '해당 Token이 만료되었습니다.') {
				onRequest();
			}
			break;
		case 403:
			break;
		case 404:
			break;
		case 405:
			break;
		case 406:
			break;
		case 408:
			break;
		case 409:
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
};

export default api;
