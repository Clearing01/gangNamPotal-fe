<template>
	<Table :tableData="tableDataSet" />
	<!-- <div class="filter-table-wrapper">
		<q-table
		flat
		bordered
		:rows="tableDataSet.list"
		:columns="tableDataSet.columnList"
		row-key="rowNum"
	    :table-class="'common-table'"
		:no-data-label="'데이터를 찾을 수 없습니다'"
		> 	
		</q-table>
	</div> -->
</template>

<script setup>
import router from '@/router';
import { computed, onMounted, ref } from 'vue';
import Table from '@/components/Table.vue';

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
	isLoading: true,
	columnList: [
		// 테이블 컬럼정보 정의 및 커스텀
		{ name: 'nameKr', align: 'center', label: '이름', field: 'nameKr', sortable: true },
		{ name: 'rank', align: 'center', label: '직급', field: 'rank', sortable: true },
		{ name: 'affi', align: 'center', label: '소속', field: 'affi' },
		{ name: 'dept', align: 'center', label: '부서', field: 'dept' },
	],
	sortKey: {
		nameKr: 'nameKr',
		rank: 'rank',
		joinDt: 'joinDt',
		stat: 'stat',
	},
});
</script>

<style scoped lang="scss"></style>
