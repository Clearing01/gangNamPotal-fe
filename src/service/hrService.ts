import api from '@/modules/axios';

class hrService {
	static async getManageMentList(manageMentVO: any) {
		return api.get('/hr/management', { params: manageMentVO.value });
	}

	static async getTeamList() {
		return api.get('/hr/teams');
	}

	static async getDeptList(departmentVO: any) {
		return api.get('/hr/dept', { params: departmentVO.value });
	}

	static async getAllDeptList() {
		return api.get('/hr/dept');
	}

	static async getUserInfo(employeeId: number) {
		return api.get('/hr/info', { params: { employeeId: employeeId } });
	}

	static async getMy() {
		return api.get('/hr/my');
	}

	static async updateMy(nameEn: string, phone: string, address: string) {
		return api.put('/hr/my', { nameEn: nameEn, phone: phone, address: address });
	}

	static async getNames() {
		return api.get('/hr/names');
	}

	static async insertStartCommute(date: any) {
		return api.post('/commute/start', { date: date.date });
	}

	static async insertEndCommute(date: any) {
		return api.post('/commute/end', { date: date.date });
	}
}

export default hrService;
