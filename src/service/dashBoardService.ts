import api from '@/modules/axios';

class dashBoardService {
	static async getMyCommuteList() {
		return api.get('/');
	}

	static async getAllCommuteList() {
		return api.get('/all');
	}
}

export default dashBoardService;
