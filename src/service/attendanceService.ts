import api from '@/modules/axios';

class attendanceService {
	static async getCommuteList(attendanceVO: any) {
		return api.get('/commute', { params: attendanceVO.value });
	}

	static async insertAdminCommute(commuteRegisterDTO: any) {
		return api.post('/commute/admin', commuteRegisterDTO);
	}

	static async updateAdminCommute(commuteRegisterDTO: any) {
		return api.put('/commute/admin', commuteRegisterDTO);
	}

	static async exportExcelCommute(startDate: string, endDate: string, name: string) {
		return api.get('/commute/excel', { params: { startDate: startDate, endDate: endDate, name: name } });
	}
}

export default attendanceService;
