import api from '@/modules/axios';

class hrService {
	static async getManageMentList(selectValue: string, searchText: string) {
		return api.get('/hr/management', { params: { selectValue: selectValue, searchText: searchText } });
	}

	static async getTeamList() {
		return api.get('/hr/teamList');
	}

	static async getDeptList(department: string, name: string) {
		return api.get('/hr/dept', { params: { department: department, name: name } });
	}

	static async getInfo() {
		return api.get('/hr/info');
	}

	static async updateInfo(nameEn: string, phone: string, address: string) {
		return api.put('/hr/info', { params: { nameEn: nameEn, phone: phone, address: address } });
	}

	static async insertStartCommute(date: any) {
		return api.post('/commute/start', { params: { commuteStartEndDTO: date } });
	}

	static async insertEndCommute(date: any) {
		return api.post('/commute/end', { params: { commuteStartEndDTO: date } });
	}
}

export default hrService;
