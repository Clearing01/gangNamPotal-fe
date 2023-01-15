<template>
	<div class="app-pageheader">
		<span class="main-title">출퇴근 현황</span>
		<q-btn class="app-btn btn-basic btn-primary" flat v-if="1 == 1" @click="insertModal(true)">등록</q-btn>
	</div>

	<div class="filter-table-wrapper">
		<Filter :filterData="filterDataSet" />
		<Table :tableData="tableDataSet" />
	</div>

	<q-dialog v-model="commuteInsertModal" persistent>
		<q-card>
			<q-card-section class="row items-center">
				<p class="q-ml-sm">출퇴근시간 등록</p>
			</q-card-section>
			<q-card-section> 이름 <q-input class="app-input input-medium" outlined placeholder="입력하세요" /> </q-card-section>
			<q-card-section> 날짜 <q-input class="app-input input-medium" outlined placeholder="입력하세요" /> </q-card-section>
			<q-card-section> 출근시간 <q-input class="app-input input-medium" outlined placeholder="입력하세요" /> </q-card-section>
			<q-card-section> 퇴근시간 <q-input class="app-input input-medium" outlined placeholder="입력하세요" /> </q-card-section>

			<q-card-actions align="right">
				<q-btn flat label="등록" color="primary" />
				<q-btn flat label="취소" color="primary" v-close-popup />
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>

<script setup>
import router from '@/router';
import { computed, onMounted, ref } from 'vue';
import Table from '@/components/Table.vue';
import Filter from '@/components/Filter.vue';

const commuteInsertModal = ref(false);

const insertModal = (flag) => {
	commuteInsertModal.value = flag;
};

const tableDataSet = ref({
	list: [
		{
			date: '2023.01.04 (수)',
			nameKr: '박민호',
			startDt: '09:58',
			endDt: '19:36',
		},
		{
			date: '2023.01.04 (수)',
			nameKr: '정연호',
			startDt: '08:33',
			endDt: '18:48',
		},
	], // 테이블에 들어갈 데이터 --> 더미 데이터는 여기에
	total: 0,
	isAttendance: true,
	isLoading: true,
	columnList: [
		// 테이블 컬럼정보 정의 및 커스텀
		{ name: 'date', align: 'center', label: '날짜', field: 'date', headerStyle: '', style: '', classes: 'app-fw-6', sortable: true },
		{ name: 'nameKr', align: 'center', label: '이름', field: 'nameKr', sortable: true },
		{ name: 'startDt', align: 'center', label: '출근시간', field: 'startDt', headerStyle: '', style: '', classes: '' },
		{ name: 'endDt', align: 'center', label: '퇴근시간', field: 'endDt', headerStyle: '', style: '', classes: '' },
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
</script>

<style scoped lang="scss">
.app-pageheader {
	.q-btn {
		margin-left: 87%;
	}
}
</style>
