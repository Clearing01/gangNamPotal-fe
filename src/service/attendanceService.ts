import api from '@/modules/axios';

class attendanceService {
	static async getCommuteList(startDate: string, endDate: string, name: string) {
		return api.get('/commute', { params: { startDate: startDate, endDate: endDate, name: name } });
	}

	static async insertAdminCommute(commuteRegisterDTO: any) {
		return api.post('/commute/admin', { params: { commuteRegisterDTO: commuteRegisterDTO } });
	}

	static async updateAdminCommute(commuteRegisterDTO: any) {
		return api.put('/commute/admin', { params: { commuteRegisterDTO: commuteRegisterDTO } });
	}
}

export default attendanceService;
