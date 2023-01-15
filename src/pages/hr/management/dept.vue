<template>
	<div class="app-pageheader">
		<span class="main-title">소속/부서</span>
	</div>
	<div class="app-page flex no-wrap">
		<div class="page-left-wrapper">
			<div class="app-tree-wrapper">
				<div class="tree-title-section">
					<div class="tree-title">소속/부서</div>
				</div>
				<div class="tree-menu-section">
					<q-tree :nodes="deptList.list" node-key="label" no-connectors default-expand-all icon="icon-arrow-right">
						<template v-slot:default-header="prop">
							<div class="title-wrapper">
								{{ prop.node.label }}
								<span class="num-child" v-if="prop.node.childNum >= 0">({{ prop.node.childNum }})</span>
							</div>
						</template>
					</q-tree>
				</div>
			</div>
		</div>
		<div class="page-right-wrapper">
			<div class="page-content-header flex justify-between items-center no-wrap">
				<div class="page-content-title">구성원<span>(사람 수)</span></div>
				<q-input class="app-input input-medium input-append-search-icon" outlined no-error-icon placeholder="이름을 검색하세요" />
				<q-btn class="app-btn btn-basic btn-primary" flat @click="employeeUpdate()">입력</q-btn>
			</div>
			<Table :tableData="tableDataSet" />
		</div>
	</div>
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
	isAttendance: false,

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

const deptList = ref({
	list: [
		{
			label: '구성원',
			children: [
				{
					label: '개발 ',
					children: [{ label: '개발' }, { label: '퍼블리셔' }],
				},
				{
					label: 'QA ',
					children: [{ label: 'QA' }],
				},
				{
					label: '경영지원',
					children: [{ label: '재무' }, { label: '인사총무' }],
				},
				{
					label: '디자인',
					children: [{ label: 'UI/UX' }],
				},
				{
					label: '마케팅',
					children: [{ label: 'BX' }],
				},
			],
		},
	],
});
</script>

<style scoped lang="scss">
.app-page {
	min-height: calc(100% - 72px);
}

.page-right-wrapper {
	width: calc(100% - 240px);
}

.page-content-header {
	margin-bottom: 13px;
}

.app-input {
	width: 220px;
}

.app-table {
	margin-bottom: 28px;
}
.page-content-title {
	margin-right: 65%;
}
</style>
