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

	static async insertStartCommute() {
		return api.post('/commute/start');
	}

	static async insertEndCommute() {
		return api.post('/commute/end');
	}

	static async getAffiliation() {
		return api.get('/hr/admin');
	}

	static async getDepartment(affiliationId: number) {
		return api.get('/department', { params: { affiliationId: affiliationId } });
	}

	static async getDepartmentList() {
		return api.get('/department/list');
	}

	static async getRanks() {
		return api.get('/ranks');
	}

	static async saveEmployeeInfo(data: any) {
		return api.post('/hr/admin', data, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	}

	static async updateEmployeeInfo(data: any) {
		return api.put('/hr/admin', data);
	}
}

export default hrService;
