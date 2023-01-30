<template>
	<div class="app-pageheader">
		<span class="main-title">출퇴근 현황</span>
		<q-space />
		<q-btn class="app-btn btn-basic btn-primary" flat v-if="authStore.user.permission" @click="insertModal(true)">등록</q-btn>
	</div>

	<div class="filter-table-wrapper">
		<Filter :filterData="filterDataSet" @emitAttendance="getDataByFilter" />
		<Table :tableData="tableDataSet" @emitPageData="getDataByTable" />
	</div>

	<q-dialog v-model="commuteInsertModal" persistent class="dialog-wrapper">
		<q-card>
			<q-card-section class="row items-center">
				<p class="q-ml-sm">출퇴근시간 등록</p>
			</q-card-section>
			<q-card-section>
				이름 <q-select class="selectBox" :options="nameList" v-model="commuteRegisterDTO.name" />
				<!-- 이름 <q-input class="app-input input-medium" v-model="commuteRegisterDTO.employeeId" outlined placeholder="입력하세요" /> -->
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
				<q-btn
					flat
					label="등록"
					color="primary"
					@click="insertAdminCommute"
					:disabled="
						input.duration.to.length === 0 ||
						input.duration.from.length === 0 ||
						commuteRegisterDTO.name.length === 0 ||
						commuteRegisterDTO.startDate.length < 5 ||
						commuteRegisterDTO.endDate.length < 5
					"
				/>
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
import hrService from '@/service/hrService';

import { Moment } from '@/composables/util';

const uiStore = useUiStore();
const authStore = useAuthStore();

const commuteInsertModal = ref(false);
const employeeList = ref([]);
const nameList = ref([]);

const commuteRegisterDTO = ref({
	employeeId: '',
	registerDate: '',
	startDate: '',
	endDate: '',
	name: '',
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

	return result;
};

const getEndDateView = (startDt: string, endDt: string) => {
	let result;
	if (Moment.diffDay(startDt, endDt) === 0) {
		result = Moment.getYYYYMMDD(startDt);
	} else {
		result = `${Moment.getYYYYMMDD(startDt)}`;
	}

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
	setNameList();
};

const tableDataSet = ref({
	list: [], // 테이블에 들어갈 데이터 --> 더미 데이터는 여기에
	total: 0,
	pageSize: '',
	isAttendance: true,
	isLoading: true,
	startDate: '',
	endDate: '',
	name: '',
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
		},
		{ name: 'nameKr', align: 'center', label: '이름', field: 'nameKr' },
		{ name: 'startDate', align: 'center', label: '출근시간', field: 'startDate', headerStyle: '', style: '', classes: '' },
		{ name: 'endDate', align: 'center', label: '퇴근시간', field: 'endDate', headerStyle: '', style: '', classes: '' },
	],
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
	tableDataSet.value.startDate = emitData.startDate;
	tableDataSet.value.endDate = emitData.endDate;
	tableDataSet.value.name = emitData.name;

	onRequest();
};

const getDataByTable = (emitData: any) => {
	if (emitData.pageNumber > Math.ceil(tableDataSet.value.total / emitData.pageSize)) {
		emitData.pageNumber = Math.ceil(tableDataSet.value.total / emitData.pageSize);
	}
	attendanceVO.value.orderBy = emitData.orderBy;
	attendanceVO.value.pageNumber = emitData.pageNumber;
	attendanceVO.value.pageSize = emitData.pageSize;
	attendanceVO.value.sort = emitData.sort;
	tableDataSet.value.pageSize = emitData.pageSize;

	onRequest();
};

const onRequest = async () => {
	const list = await getCommuteList(attendanceVO);

	tableDataSet.value.list = list.commuteStateDataList;
	tableDataSet.value.total = list.totalCount;
};

const getCommuteList = async (attendanceVO: any) => {
	await uiStore.showLoading();
	try {
		const response = await attendanceService.getCommuteList(attendanceVO);
		const result = response.data.data;

		return result;
	} catch (error: any) {
	} finally {
		uiStore.hideLoading();
	}
};

const setNameList = async () => {
	const list = await getNameList();

	employeeList.value = list;
	nameList.value = list.map((v: any) => {
		return v.name;
	});
};

const getNameList = async () => {
	await uiStore.showLoading();
	try {
		const response = await hrService.getNames();
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

		const nameVo = employeeList.value.filter((v: any) => {
			v.name === commuteRegisterDTO.value.name;

			if (v.name === commuteRegisterDTO.value.name) {
				console.log(1111111);

				return;
			}
		});

		// data.employeeId = nameVo.employeeNo;
		data.registerDate = input.value.duration.from;
		data.startDate = `${input.value.duration.from} ${commuteRegisterDTO.value.startDate}:00`;
		data.endDate = `${input.value.duration.to} ${commuteRegisterDTO.value.endDate}:00`;

		const response = await attendanceService.insertAdminCommute(data);

		if (response.status === 200) {
			onRequest();
			router.push('/attendance');
		}

		let notify = {
			caption: response.data.message,
			type: 'positive',
			icon: 'info',
			classes: 'app-notify',
			timeout: 500,
		};

		uiStore.showNotification(notify);
	} catch (error: any) {
	} finally {
		uiStore.hideLoading();
		commuteInsertModal.value = false;
	}
};
</script>

<style scoped lang="scss">
.dialog-wrapper {
	.app-input,
	.app-input-picker {
		margin-top: 10px;
	}
}
</style>
