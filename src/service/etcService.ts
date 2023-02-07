import api from '@/modules/axios';

class etcService {
	static async getWeatherInfo() {
		return api.get('/etc/weather');
	}

	static async getFortuneInfo() {
		return api.get('/etc/fortune');
	}

	static async getSubwayInfo() {
		return api.get('/etc/subway');
		// return api.get('/etc/test');
	}
}

export default etcService;
