<template>
	<div class="app-pageheader">
		<span class="main-title">인력</span>
	</div>
	<div class="filter-table-wrapper">
		<Filter :filterData="filterDataSet" @emitFiltered="getDataByFilter" />
		<Table :tableData="tableDataSet" />
	</div>
</template>

<script setup lang="ts">
import router from '@/router';
import { computed, onMounted, ref } from 'vue';
import Table from '@/components/Table.vue';
import Filter from '@/components/Filter.vue';
import { useUiStore } from '@/store/ui';
import hrService from '@/service/hrService';

const uiStore = useUiStore();

const tableDataSet = ref({
	list: [
		{
			nameKr: '박민호',
			rank: '선임',
			affiliation: '개발',
			department: '개발',
			email: 'minho.park@twolinecode.com',
			phone: '010-5188-2240',
		},
		{
			nameKr: '정연호',
			rank: '선임',
			affiliation: '개발',
			department: '개발',
			email: '',
			phone: '',
		},
	], // 테이블에 들어갈 데이터 --> 더미 데이터는 여기에
	total: 2,
	isAttendance: false,
	isLoading: true,
	columnList: [
		// 테이블 컬럼정보 정의 및 커스텀
		{ name: 'nameKr', align: 'center', label: '이름', field: 'nameKr', sortable: true },
		{ name: 'rank', align: 'center', label: '직급', field: 'rank', sortable: true },
		{ name: 'affiliation', align: 'center', label: '소속', field: 'affiliation' },
		{ name: 'department', align: 'center', label: '부서', field: 'department' },
		{ name: 'email', align: 'left', label: '이메일', field: 'email' },
		{ name: 'phone', align: 'left', label: '연락처', field: 'phone' },
	],
	sortKey: {
		nameKr: 'nameKr',
		rank: 'rank',
		joinDt: 'joinDt',
		stat: 'stat',
	},
});

const filterDataSet = ref({
	isManagement: true,
	isAttendance: false,

	titleList: [
		{
			name: 'nameKr',
			label: '이름',
		},
		{
			name: 'rank',
			label: '직급',
		},
		{
			name: 'dept',
			label: '소속',
		},
		{
			name: 'email',
			label: '이메일',
		},
	],
});

const filterParams = ref({
	selectValue: '',
	searchText: '',
});

const getDataByFilter = (emitData: any) => {
	filterParams.value.selectValue = emitData.selectValue;
	filterParams.value.searchText = emitData.searchText;
	onRequest();
	console.log(tableDataSet.value.list);
};

const onRequest = async () => {
	const list = await getManageMentList(filterParams.value.selectValue, filterParams.value.searchText);
	tableDataSet.value.list = list;
};

const getManageMentList = async (selectValue: string, searchText: string) => {
	await uiStore.showLoading();
	try {
		const response = await hrService.getManageMentList(selectValue, searchText);
		const result = response.data.items.content;

		return result;
	} catch (error: any) {
		uiStore.hideLoading();
	}
};
</script>

<style scoped lang="scss"></style>
