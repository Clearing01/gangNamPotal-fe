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
					<q-tree
						:nodes="deptList.list"
						node-key="label"
						no-connectors
						default-expand-all
						icon="icon-arrow-right"
						v-model:selected="selectedMenu"
						@click="clickFilter()"
					>
						<template v-slot:default-header="prop">
							<div class="title-wrapper">
								{{ prop.node.label }}
								<!-- <span class="num-child" v-if="prop.node.childNum >= 0">({{ prop.node.childNum }})</span> -->
							</div>
						</template>
					</q-tree>
				</div>
			</div>
		</div>
		<div class="page-right-wrapper">
			<div class="page-content-header flex justify-between items-center no-wrap">
				<div class="page-content-title">
					구성원<span>({{ tableDataSet.total }})</span>
				</div>
				<q-input
					class="app-input input-medium input-append-search-icon"
					outlined
					no-error-icon
					placeholder="이름을 검색하세요"
					v-model="filterParams.name"
				/>
				<q-btn class="app-btn btn-basic btn-primary" flat @click="clickFilter()">입력</q-btn>
			</div>
			<Table :tableData="tableDataSet" />
		</div>
	</div>
</template>

<script setup lang="ts">
import router from '@/router';
import { computed, onMounted, ref } from 'vue';
import Table from '@/components/Table.vue';
import { useUiStore } from '@/store/ui';
import hrService from '@/service/hrService';

const uiStore = useUiStore();

const selectedMenu = ref('');

const handleSelected = () => {};

const filterParams = ref({
	affiliation: '',
	department: '',
	name: '',
});

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
			affi: '개발',
			dept: '개발',
			email: '',
			phone: '',
		},
	], // 테이블에 들어갈 데이터 --> 더미 데이터는 여기에
	total: 2,
	isLoading: true,
	isAttendance: false,

	columnList: [
		// 테이블 컬럼정보 정의 및 커스텀
		{ name: 'nameKr', align: 'center', label: '이름', field: 'nameKr', sortable: true },
		{ name: 'rank', align: 'center', label: '직급', field: 'rank', sortable: true },
		{ name: 'affiliation', align: 'center', label: '소속', field: 'affiliation' },
		{ name: 'department', align: 'center', label: '부서', field: 'department' },
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
			childNum: 0,
			children: [
				{
					label: '개발 ',
					childNum: 0,
					children: [{ label: '개발' }, { label: '퍼블리셔' }],
				},
				{
					label: 'QA ',
					childNum: 0,
					children: [{ label: 'QA' }],
				},
				{
					label: '경영지원',
					childNum: 0,
					children: [{ label: '재무' }, { label: '인사총무' }],
				},
				{
					label: '디자인',
					childNum: 0,
					children: [{ label: 'UI/UX' }],
				},
				{
					label: '마케팅',
					childNum: 0,
					children: [{ label: 'BX' }],
				},
			],
		},
	],
});

const clickFilter = () => {
	let list = deptList.value.list[0].children.map((v: any) => {
		return v.label;

		// v.children.forEach((c: any) => {
		// 	console.log(c.label);
		// });
	});
	const selectValue = list.filter((v: any) => v === selectedMenu.value);

	if (selectedMenu.value !== null) {
		if (selectValue.length !== 0) {
			filterParams.value.department = selectedMenu.value;
			filterParams.value.affiliation = 'affiliation';
			if (selectedMenu.value === '개발 ') {
				filterParams.value.department = '개발';
			} else if (selectedMenu.value === 'QA ') {
				filterParams.value.department = 'QA';
			}
		} else {
			filterParams.value.affiliation = 'department';
			filterParams.value.department = selectedMenu.value;
			if (selectedMenu.value === '구성원') {
				filterParams.value.department = '';
			} else {
			}
		}
	}
	console.log(filterParams.value);
	onRequest();
};

const onRequest = async () => {
	const list = await getDeptList(filterParams.value.affiliation, filterParams.value.department, filterParams.value.name);

	tableDataSet.value.list = list;
	tableDataSet.value.total = list.size;
};

const getDeptList = async (affiliation: string, department: string, name: string) => {
	await uiStore.showLoading();
	try {
		const response = await hrService.getDeptList(affiliation, department, name);
		const result = response.data.data.hrDepartmentInfoDataList;

		return result;
	} catch (error: any) {
	} finally {
		uiStore.hideLoading();
	}
};

const setDeptList = async () => {
	const data = await getTeamList();
	let dataChildren = [];
	deptList.value.list[0].children = data.map((v: any) => {
		if (v.affiliationName === '개발') {
			v.affiliationName = '개발 ';
		}
		if (v.affiliationName === 'QA') {
			v.affiliationName = 'QA ';
		}
		dataChildren = v.departmentNameDTOList.map((c: any) => {
			return {
				label: c.departmentName,
			};
		});
		return {
			label: v.affiliationName,
			childNum: 0,
			children: dataChildren,
		};
	});
};

const getTeamList = async () => {
	await uiStore.showLoading();
	try {
		const response = await hrService.getTeamList();
		const result = response.data.data;

		return result;
	} catch (error: any) {
	} finally {
		uiStore.hideLoading();
	}
};

onMounted(() => {
	onRequest();
	setDeptList();
});
</script>

<style scoped lang="scss">
.btn-basic {
	background: gray;
}

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
