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
}

export default hrService;
