<template>
	<div class="app-pageheader">
		<span class="main-title" @dblclick="showChart(true)">출퇴근 현황</span>
		<q-space />
		<q-btn class="app-btn btn-basic btn-primary" flat v-if="authStore.user.permission" @click="insertModal(true)">등록</q-btn>
	</div>

	<div class="filter-table-wrapper">
		<Filter :filterData="filterDataSet" @emitAttendance="getDataByFilter" />
		<Table :tableData="tableDataSet" @emitPageData="getDataByTable" />
	</div>

	<q-dialog v-model="commuteInsertModal" class="dialog-wrapper">
		<q-card>
			<q-card-section class="row items-center">
				<p class="q-ml-sm">출퇴근시간 등록</p>
			</q-card-section>
			<q-card-section>
				이름
				<q-select
					:options="nameList"
					v-model="commuteRegisterDTO.name"
					class="app-input input-medium input-select"
					outlined
					dropdown-icon="icon-keyboard-arrow-down"
					label="선택하세요"
					popup-content-class="select-popup"
				/>
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

	<q-dialog v-model="chartModal">
		<canvas id="myChart"></canvas>
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
import Chart from 'chart.js/auto';
import { Moment } from '@/composables/util';

const uiStore = useUiStore();
const authStore = useAuthStore();

const commuteInsertModal = ref(false);
const employeeList = ref([]);
const nameList = ref([]);
const filterNameList = ref([]);
const chartModal = ref(false);

let myChart: any = null;

const showChart = (flag: boolean) => {
	chartModal.value = flag;
	createChart();
};

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
	employeeId: 0,
	orderBy: '',
	pageNumber: '',
	pageSize: '',
	sort: '',
});

const getStartDateView = (startDt: string) => {
	let result;
	let endDt = '';

	if (startDt === 'Invalid date') {
		return '기간을 선택하세요';
	}

	if (Moment.diffDay(startDt, endDt) === 0) {
		result = Moment.getYYYYMMDD(startDt);
	} else {
		result = `${Moment.getYYYYMMDD(startDt)}`;
	}

	return result;
};

const getEndDateView = (startDt: string) => {
	let result;
	let endDt = '';

	if (startDt === 'Invalid date') {
		return '기간을 선택하세요';
	}

	if (Moment.diffDay(startDt, endDt) === 0) {
		result = Moment.getYYYYMMDD(startDt);
	} else {
		result = `${Moment.getYYYYMMDD(startDt)}`;
	}

	return result;
};

const startDurationPicker = (val: any) => {
	if (val === null) {
		input.value.duration.from = '';
	} else {
		input.value.duration.from = Moment.getYYYY_MM_DD(val);
	}
};

const endDurationPicker = (val: any) => {
	if (val === null) {
		input.value.duration.to = '';
	} else {
		input.value.duration.to = Moment.getYYYY_MM_DD(val);
	}
};

const insertModal = (flag: any) => {
	commuteInsertModal.value = flag;
};

const tableDataSet = ref({
	list: [], // 테이블에 들어갈 데이터 --> 더미 데이터는 여기에
	total: 0,
	pageSize: '',
	isAttendance: true,
	isLoading: true,
	startDate: '',
	endDate: '',
	employeeId: '',
	columnList: [
		// 테이블 컬럼정보 정의 및 커스텀
		{
			name: 'registerDate',
			align: 'center',
			label: '날짜',
			field: 'registerDate',
			headerStyle: 'width:260px',
			style: '',
			classes: 'app-fw-6',
		},
		{ name: 'nameKr', align: 'center', label: '이름', field: 'nameKr', style: 'width:215px' },
		{ name: 'startDate', align: 'center', label: '출근시간', field: 'startDate', headerStyle: '', style: 'width:387px', classes: '' },
		{ name: 'endDate', align: 'center', label: '퇴근시간', field: 'endDate', headerStyle: '', style: 'width:387px', classes: '' },
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
	attendanceVO.value.employeeId = emitData.employeeId;
	attendanceVO.value.pageNumber = '1';

	tableDataSet.value.startDate = emitData.startDate;
	tableDataSet.value.endDate = emitData.endDate;
	tableDataSet.value.employeeId = emitData.employeeId;

	uiStore.emitter.emit('filter', true);

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
	let filterList: any = [];

	employeeList.value = list;
	nameList.value = list.map((v: any) => {
		return v.name;
	});

	filterList = list.map((v: any) => {
		return v.name;
	});
	filterList.unshift('전체');

	filterNameList.value = filterList;
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

		const nameVo: any = employeeList.value.filter((v: any) => v.name === commuteRegisterDTO.value.name);

		data.employeeId = nameVo[0].employeeId;
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
		commuteInsertModal.value = false;
	} catch (error: any) {
	} finally {
		uiStore.hideLoading();
	}
};

const createChart = async () => {
	await uiStore.showLoading();
	let cloneList: any = [];
	try {
		const response = await attendanceService.exportExcelCommute(
			attendanceVO.value?.startDate,
			attendanceVO.value?.endDate,
			attendanceVO.value?.employeeId
		);
		const list = response.data.data.map((v: any) => {
			return {
				employeeNo: v.employeeNo,
				nameKr: v.nameKr,
				totalCommuteTime: v.totalCommuteTime,
			};
		});

		const set = new Set(list.map((employee: any) => employee.employeeNo));

		const employeeNoList = [...set];

		employeeNoList.forEach((employeeNo: any) => {
			const employeeList = list.filter((obj: any) => obj.employeeNo === employeeNo);
			let totalTime = 0;
			let name = '';

			employeeList.forEach((employee: any) => {
				totalTime = totalTime + employee.totalCommuteTime;
				name = employee.nameKr;
			});

			cloneList.push({
				employeeNo,
				name,
				time: totalTime,
			});
		});

		const labels = cloneList.map((v: any) => {
			return `${v.name} (${v.employeeNo})`;
		});

		const datas = cloneList.map((v: any) => {
			return v.time;
		});

		const labelList = [...labels];
		const dataList = [...datas];

		addChart(labelList, dataList);

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
	}
};

const addChart = (labels: string[], datas: any[]) => {
	const date = `${attendanceVO.value?.startDate} ~ ${attendanceVO.value?.endDate} 총 근무시간`;
	const ctx: any = document.getElementById('myChart');
	const config: any = {
		type: 'bar',
		data: {
			labels: labels,
			datasets: [
				{
					label: date,
					data: datas,
					borderWidth: 1,
				},
			],
		},
		options: {
			scales: {
				y: {
					beginAtZero: true,
				},
			},
		},
	};

	myChart = new Chart(ctx, config);
};

onMounted(() => {
	setNameList();
});
</script>

<style scoped lang="scss">
#myChart {
	position: relative;
	z-index: 20000;
	width: 50%;
	padding: 20px;
	border: 1px solid #333;
	background-color: white;
	border-radius: 20px;
}
.dialog-wrapper {
	.app-input {
		margin-top: 10px;
	}

	.app-input-picker {
		margin-top: 10px;
	}
}
</style>
