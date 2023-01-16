<template>
	<div class="dashboard-calendar-section">
		<div class="app-pageheader">
			<span class="main-title">대시보드</span>
			<div class="filter-container">
				<q-select :options="filter" v-model="selctFilter.param" />
			</div>
			<div class="btn-wrapper">
				<q-btn class="app-btn btn-basic btn-primary" flat @click="onRequest(selctFilter.value)">입력</q-btn>
			</div>
		</div>
		<!-- <div class="app-pageheader">
			<span class="main-title">대쉬보드</span>
		</div> -->
		<Calendar />
	</div>
</template>

<script lang="ts" setup>
import Calendar from '@/components/Calendar.vue';
import { ref } from '@vue/reactivity';
import { useUiStore } from '@/store/ui';
import dashBoardService from '@/service/dashBoardService';

interface CommuteVO {
	title: string;
	color: string;
	start: string;
	end: string;
	display: string;
	name: string;
}

const uiStore = useUiStore();
// const commuteList:any[] = [];
const commuteList = ref<CommuteVO[]>([]);
const filter = ref(['전체', '본인']);
const selctFilter = ref({
	param: '',
});

const commuteVO = ref({
	title: '',
	color: 'blue',
	start: '',
	end: '',
	display: 'list-item',
	name: '',
});

// {
// 	title: '박민호',
// 	color: 'blue',
// 	start: '2023-01-05',
// 	end: '2023-01-07',
// 	display: 'list-item',
// 	name: '09:23',
// 	eventContent: '',
// },

const onRequest = async (selctFilter: any) => {
	const list = await getCommuteList(selctFilter);

	commuteList.value = list.map((v: any) => {
		return {
			title: v.nameKr,
			color: 'blue',
			start: v.register_date,
			end: v.end_date,
			display: 'list-item',
			name: v.start_date,
		};
	});
};

const getCommuteList = async (selctFilter: any) => {
	await uiStore.showLoading();
	try {
		if (selctFilter === '전체') {
			const response = await dashBoardService.getAllCommuteList();
			const result = response.data.items.content;

			return result;
		} else {
			const response = await dashBoardService.getMyCommuteList();
			const result = response.data.items.content;

			return result;
		}
	} catch (error: any) {}
};
</script>

<style>
.btn-wrapper {
	margin-left: 2%;
}
.filter-container {
	border: 1px solid rgba(231, 235, 243, 0.8);
	display: inline-block;
	vertical-align: top;
	margin-left: 20px;
}
.dashboard-calendar-section {
	padding: 1px 0;
	height: 100vh;
}
</style>
