import api from '@/modules/axios';

const authService = {
	async login(email: string, password: string) {
		const enEmail = email;
		const enPassword = password;
		let response;
		try {
			response = await api.post('/auth/login', {
				email: enEmail,
				password: enPassword,
			});
		} catch (e) {
			return e;
		}
		return response || false;
	},
	async googleLogin() {
		let response;

		try {
			response = await api.get('/auth/google/login');
		} catch (e) {
			return e;
		}
		return response || false;
	},
	async kakaoLogin() {
		let response;

		try {
			response = await api.get('/auth/kakao/login');
		} catch (e) {
			return e;
		}
		return response;
	},
	async getRefreshToken(refreshtoken: any) {
		let response;

		try {
			response = await api.get('/auth/reissue', { params: { refreshtoken: refreshtoken } });
		} catch (e) {
			return e;
		}
		return response;
	},
	async logout(accesstoken: any) {
		let response;

		try {
			response = await api.get('/auth/logout');
		} catch (e) {
			return e;
		}
		return response;
	},
};

export default authService;
