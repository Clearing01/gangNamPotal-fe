import api from '@/modules/axios';

class hrService {
	static async getManageMentList(selectValue: string, searchText: string) {
		return api.get('/hr/management', { params: { selectValue: selectValue, searchText: searchText } });
	}

	static async getTeamList() {
		return api.get('/hr/teamList');
	}

	static async getDeptList(affiliation: string, department: string, name: string) {
		if (affiliation === 'affiliation') {
			return api.get('/hr/dept', { params: { affiliation: department, name: name } });
		} else {
			return api.get('/hr/dept', { params: { department: department, name: name } });
		}
	}

	static async getAllDeptList() {
		return api.get('/hr/dept');
	}

	static async getInfo() {
		return api.get('/hr/info');
	}

	static async updateInfo(nameEn: string, phone: string, address: string) {
		return api.put('/hr/info', { params: { nameEn: nameEn, phone: phone, address: address } });
	}

	static async insertStartCommute(date: any) {
		return api.post('/commute/start', { date: date.date });
	}

	static async insertEndCommute(date: any) {
		return api.post('/commute/end', { date: date.date });
	}
}

export default hrService;
