<template>
	<div class="app-pageheader">
		<span class="main-title">인력</span>
	</div>
	<div class="filter-table-wrapper">
		<Filter :filterData="filterDataSet" />
		<Table :tableData="tableDataSet" />
	</div>
</template>

<script setup>
import router from '@/router';
import { computed, onMounted, ref } from 'vue';
import Table from '@/components/Table.vue';
import Filter from '@/components/Filter.vue';

const tableDataSet = ref({
	list: [
		{
			nameKr: '박민호',
			rank: '선임',
			affi: '개발',
			dept: '개발',
			email: 'minho.park@twolinecode.com',
			phone: '010-5188-2240',
		},
		{
			nameKr: '정연호',
			rank: '선임',
			affi: '개발',
			dept: '개발',
			email: '',
			phone: '',
		},
	], // 테이블에 들어갈 데이터 --> 더미 데이터는 여기에
	total: 0,
	isAttendance: false,
	isLoading: true,
	columnList: [
		// 테이블 컬럼정보 정의 및 커스텀
		{ name: 'nameKr', align: 'center', label: '이름', field: 'nameKr', sortable: true },
		{ name: 'rank', align: 'center', label: '직급', field: 'rank', sortable: true },
		{ name: 'affi', align: 'center', label: '소속', field: 'affi' },
		{ name: 'dept', align: 'center', label: '부서', field: 'dept' },
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
		{
			name: 'stat',
			label: '상태',
		},
	],
});
</script>

<style scoped lang="scss"></style>
