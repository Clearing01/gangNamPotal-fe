import api from '@/modules/axios';

class etcService {
	static async getWeatherIfo(locationVO: any) {
		return api.get('/etc/weather', { params: { latitude: locationVO.latitude, longitude: locationVO.longitude } });
	}
}

export default etcService;
