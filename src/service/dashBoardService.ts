import api from '@/modules/axios';

class dashBoardService {
	static async getMyCommuteList(year: string, month: string) {
		return api.get('/commute/board', { params: { year: year, month: month } });
	}

	static async getAllCommuteList(year: string, month: string) {
		return api.get('/commute/board/all', { params: { year: year, month: month } });
	}
}

export default dashBoardService;
