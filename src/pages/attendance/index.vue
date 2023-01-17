<template>
	<div class="app-pageheader">
		<span class="main-title">출퇴근 현황</span>
		<q-btn class="app-btn btn-basic btn-primary" flat v-if="1 == 1" @click="insertModal(true)">등록</q-btn>
	</div>

	<div class="filter-table-wrapper">
		<Filter :filterData="filterDataSet" @emitFiltered="getDataByFilter" />
		<Table :tableData="tableDataSet" />
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
				날짜
				<q-btn class="app-input-picker input-picker-medium" flat>
					<em class="icon-calendar-today"></em>
					<span class="picker-text">
						{{
							input.duration.from && input.duration.to
								? getDateView(input.duration.from, input.duration.to)
								: '기간을 선택하세요'
						}}
					</span>
					<q-popup-proxy transition-show="scale" transition-hide="scale">
						<q-date
							minimal
							v-model="commuteRegisterDTO.registerDate"
							mask="YYYY-MM-DD"
							@update:model-value="updateDurationPicker"
						>
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
import attendanceService from '@/service/attendanceService';
import { Moment } from '@/composables/util';

const uiStore = useUiStore();

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

const getDateView = (startDt: string, endDt: string) => {
	let result;
	if (Moment.diffDay(startDt, endDt) === 0) {
		result = Moment.getYYYYMMDD(startDt);
	} else {
		result = `${Moment.getYYYYMMDD(startDt)} ~ ${Moment.getYYYYMMDD(endDt)}`;
	}
	console.log(input.value.inputDuration);

	return result;
};

const updateDurationPicker = (val: any) => {
	if (val) {
		if (val.from) {
			input.value.duration.from = Moment.getYYYY_MM_DD(val.from);
			input.value.duration.to = Moment.getYYYY_MM_DD(val.to);
		} else {
			input.value.duration.from = Moment.getYYYY_MM_DD(val);
			input.value.duration.to = Moment.getYYYY_MM_DD(val);
		}
	}
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

const filterParams = ref({
	startDate: '',
	endDate: '',
	name: '',
});

const getDataByFilter = (emitData: any) => {
	filterParams.value.startDate = emitData.startDate;
	filterParams.value.endDate = emitData.endDate;
	filterParams.value.name = emitData.name;
	onRequest();
	console.log(tableDataSet.value.list);
};

const onRequest = async () => {
	const list = await getCommuteList(filterParams.value.startDate, filterParams.value.endDate, filterParams.value.name);
	tableDataSet.value.list = list;
	tableDataSet.value.total = list.size;
	console.log(tableDataSet.value.list);
};

const getCommuteList = async (startDate: string, endDate: string, name: string) => {
	await uiStore.showLoading();
	try {
		const response = await attendanceService.getCommuteList(startDate, endDate, name);
		const result = response.data.items.content;

		return result;
	} catch (error: any) {
		uiStore.hideLoading();
	}
};

const insertAdminCommute = async () => {
	await uiStore.showLoading();
	try {
		const response = await attendanceService.insertAdminCommute(commuteRegisterDTO);
		router.push('/attendance');
	} catch (error: any) {
		uiStore.hideLoading();
		commuteInsertModal.value = false;
		router.push('/attendance');
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
