<template>
	<div class="dashboard-calendar-section">
		<!-- <div class="app-pageheader">
			<span class="main-title">대쉬보드</span>
		</div> -->
		<Calendar @emitCalendar="getDataByCalendar" />
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
const commuteList = ref<CommuteVO[]>([]);

const emitData = ref({
	selctFilter: '',
	year: '',
	month: '',
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
const getDataByCalendar = (emit: any) => {
	emitData.value.selctFilter = emit.selctFilter;
	emitData.value.year = emit.year;
	emitData.value.month = emit.month;

	onRequest();

	console.log(emitData.value);
};

const onRequest = async () => {
	const list = await getCommuteList(emitData.value.selctFilter, emitData.value.year, emitData.value.month);

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

const getCommuteList = async (filter: any, year: any, month: any) => {
	await uiStore.showLoading();
	try {
		if (filter === '전체') {
			const response = await dashBoardService.getAllCommuteList(year, month);
			const result = response.data.items.content;

			return result;
		} else {
			// filter가 본인일 경우 year, month, token 전달
			const response = await dashBoardService.getMyCommuteList();
			const result = response.data.items.content;

			return result;
		}
	} catch (error: any) {
		uiStore.hideLoading();
	}
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
