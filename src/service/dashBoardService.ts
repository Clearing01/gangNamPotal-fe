import api from '@/modules/axios';

class dashBoardService {
	static async getCommuteList(year: string, month: string, range: string) {
		return api.get('/commute/board', { params: { year: year, month: month, range: range } });
	}
}

export default dashBoardService;
