<template>
	<div class="app-pageheader">
		<span class="main-title">출퇴근 현황</span>
		<q-btn class="app-btn btn-basic btn-primary" flat v-if="authStore.user.permission" @click="insertModal(true)">등록</q-btn>
	</div>

	<div class="filter-table-wrapper">
		<Filter :filterData="filterDataSet" @emitAttendance="getDataByFilter" />
		<Table :tableData="tableDataSet" @emitPageData="getDataByTable" />
	</div>

	<q-dialog v-model="commuteInsertModal" persistent>
		<q-card>
			<q-card-section class="row items-center">
				<p class="q-ml-sm">출퇴근시간 등록</p>
			</q-card-section>
			<q-card-section>
				사번 <q-input class="app-input input-medium" v-model="commuteRegisterDTO.employeeId" outlined placeholder="입력하세요" />
			</q-card-section>
			<q-card-section>
				출근일
				<q-btn class="app-input-picker input-picker-medium" flat>
					<em class="icon-calendar-today"></em>
					<span class="picker-text">
						{{ input.duration.from ? getStartDateView(input.duration.from) : '기간을 선택하세요' }}
					</span>
					<q-popup-proxy transition-show="scale" transition-hide="scale">
						<q-date minimal v-model="input.duration.from" mask="YYYY-MM-DD" @update:model-value="startDurationPicker">
							<div class="row items-center justify-end">
								<q-btn v-close-popup label="닫기" flat />
							</div>
						</q-date>
					</q-popup-proxy>
				</q-btn>
			</q-card-section>
			<q-card-section>
				출근시간
				<q-input
					class="app-input input-medium"
					mask="time"
					v-model="commuteRegisterDTO.startDate"
					:rules="['time']"
					outlined
					placeholder="입력하세요"
				/>
			</q-card-section>
			<q-card-section>
				퇴근일
				<q-btn class="app-input-picker input-picker-medium" flat>
					<em class="icon-calendar-today"></em>
					<span class="picker-text">
						{{ input.duration.to ? getEndDateView(input.duration.to) : '기간을 선택하세요' }}
					</span>
					<q-popup-proxy transition-show="scale" transition-hide="scale">
						<q-date minimal v-model="input.duration.to" mask="YYYY-MM-DD" @update:model-value="endDurationPicker">
							<div class="row items-center justify-end">
								<q-btn v-close-popup label="닫기" flat />
							</div>
						</q-date>
					</q-popup-proxy>
				</q-btn>
			</q-card-section>
			<q-card-section>
				퇴근시간
				<q-input
					class="app-input input-medium"
					mask="time"
					v-model="commuteRegisterDTO.endDate"
					:rules="['time']"
					outlined
					placeholder="입력하세요"
				/>
			</q-card-section>

			<q-card-actions align="right">
				<q-btn flat label="등록" color="primary" @click="insertAdminCommute" />
				<q-btn flat label="취소" color="primary" v-close-popup />
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>

<script setup lang="ts">
import router from '@/router';
import { computed, onMounted, ref } from 'vue';
import Table from '@/components/Table.vue';
import Filter from '@/components/Filter.vue';
import { useUiStore } from '@/store/ui';
import { useAuthStore } from '@/store/auth';
import attendanceService from '@/service/attendanceService';
import { Moment } from '@/composables/util';

const uiStore = useUiStore();
const authStore = useAuthStore();

const commuteInsertModal = ref(false);

const commuteRegisterDTO = ref({
	employeeId: '',
	registerDate: '',
	startDate: '',
	endDate: '',
});

const input = ref({
	string: '',
	selectList: [],
	inputDuration: '',
	duration: {
		from: '',
		to: '',
	},
});

const attendanceVO = ref({
	startDate: '',
	endDate: '',
	name: '',
	orderBy: '',
	pageNumber: '',
	pageSize: '10',
	sort: '',
});

const getStartDateView = (startDt: string, endDt: string) => {
	let result;
	if (Moment.diffDay(startDt, endDt) === 0) {
		result = Moment.getYYYYMMDD(startDt);
	} else {
		result = `${Moment.getYYYYMMDD(startDt)}`;
	}
	// console.log(input.value.inputDuration);

	return result;
};

const getEndDateView = (startDt: string, endDt: string) => {
	let result;
	if (Moment.diffDay(startDt, endDt) === 0) {
		result = Moment.getYYYYMMDD(startDt);
	} else {
		result = `${Moment.getYYYYMMDD(startDt)}`;
	}
	// console.log(input.value.inputDuration);

	return result;
};

const startDurationPicker = (val: any) => {
	input.value.duration.from = Moment.getYYYY_MM_DD(val);
};

const endDurationPicker = (val: any) => {
	input.value.duration.to = Moment.getYYYY_MM_DD(val);
};

const insertModal = (flag: any) => {
	commuteInsertModal.value = flag;
};

const tableDataSet = ref({
	list: [
		{
			registerDate: '2023.01.04 (수)',
			nameKr: '박민호',
			startDate: '09:58',
			endDate: '19:36',
		},
		{
			registerDate: '2023.01.04 (수)',
			nameKr: '정연호',
			startDate: '08:33',
			endDate: '18:48',
		},
	], // 테이블에 들어갈 데이터 --> 더미 데이터는 여기에
	total: 0,
	pageSize: '',
	isAttendance: true,
	isLoading: true,
	columnList: [
		// 테이블 컬럼정보 정의 및 커스텀
		{
			name: 'registerDate',
			align: 'center',
			label: '날짜',
			field: 'registerDate',
			headerStyle: '',
			style: '',
			classes: 'app-fw-6',
			sortable: true,
		},
		{ name: 'nameKr', align: 'center', label: '이름', field: 'nameKr', sortable: true },
		{ name: 'startDate', align: 'center', label: '출근시간', field: 'startDate', headerStyle: '', style: '', classes: '' },
		{ name: 'endDate', align: 'center', label: '퇴근시간', field: 'endDate', headerStyle: '', style: '', classes: '' },
	],
	sortKey: {
		nameKr: 'nameKr',
		rank: 'rank',
		joinDt: 'joinDt',
		stat: 'stat',
	},
});

const filterDataSet = ref({
	isManagement: false,
	isAttendance: true,
	titleList: [
		{
			name: 'nameKr',
			label: '이름',
		},
	],
});

const getDataByFilter = (emitData: any) => {
	attendanceVO.value.startDate = emitData.startDate;
	attendanceVO.value.endDate = emitData.endDate;
	attendanceVO.value.name = emitData.name;
	onRequest();
};

const getDataByTable = (emitData: any) => {
	attendanceVO.value.orderBy = emitData.orderBy;
	attendanceVO.value.pageNumber = emitData.pageNumber;
	attendanceVO.value.pageSize = emitData.pageSize;
	attendanceVO.value.sort = emitData.sort;
	tableDataSet.value.pageSize = emitData.pageSize;

	onRequest();
};

const onRequest = async () => {
	const list = await getCommuteList2(attendanceVO);

	tableDataSet.value.list = list.commuteStateData;
	tableDataSet.value.total = list.totalPages * Number(attendanceVO.value.pageSize);
};

const getCommuteList = async (startDate: string, endDate: string, name: string) => {
	await uiStore.showLoading();
	try {
		const response = await attendanceService.getCommuteList(startDate, endDate, name);
		const result = response.data.data.commuteStateData;

		return result;
	} catch (error: any) {
	} finally {
		uiStore.hideLoading();
	}
};

const getCommuteList2 = async (attendanceVO: any) => {
	await uiStore.showLoading();
	try {
		const response = await attendanceService.getCommuteList2(attendanceVO);
		const result = response.data.data;

		return result;
	} catch (error: any) {
	} finally {
		uiStore.hideLoading();
	}
};

const insertAdminCommute = async () => {
	await uiStore.showLoading();
	try {
		const data = {
			employeeId: 0,
			registerDate: '',
			startDate: '',
			endDate: '',
		};
		data.employeeId = Number(commuteRegisterDTO.value.employeeId);
		data.registerDate = input.value.duration.from;
		data.startDate = `${input.value.duration.from} ${commuteRegisterDTO.value.startDate}:00`;
		data.endDate = `${input.value.duration.to} ${commuteRegisterDTO.value.endDate}:00`;

		console.log(data);
		const response = await attendanceService.insertAdminCommute(data);
		router.push('/attendance');
	} catch (error: any) {
	} finally {
		uiStore.hideLoading();
		commuteInsertModal.value = false;
		router.go(0);
	}
};
</script>

<style scoped lang="scss">
.app-pageheader {
	.q-btn {
		margin-left: 87%;
	}
}
</style>
