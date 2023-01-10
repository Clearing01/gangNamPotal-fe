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
};

export default authService;
